/**
 * LiveDeliveryMap.jsx
 * Real-time delivery tracking map using React Leaflet + Socket.IO.
 *
 * Shows:
 *   📍 Provider location (gold pin) — from browser GPS or pickup record
 *   🚚 NGO/driver location (green pin) — updates via Socket.IO
 *   🛣️  OSRM road route polyline
 *   📊 Live stats: Distance, ETA, Route name
 *
 * Preserves the existing Annapurna AI dark-green card design.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, MapPin, Truck, Clock, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { connectSocket, joinPickupRoom, leavePickupRoom } from '../lib/socket';
import { api } from '../lib/api';

// Fix Leaflet default marker icon broken in Vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl: iconShadowUrl, iconRetinaUrl: iconUrl });

// ─── Custom Marker Icons ──────────────────────────────────────────────────────

const createProviderIcon = () =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:42px;height:42px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      background:linear-gradient(135deg,#B98A2E,#d4a843);
      border:3px solid #14261E;box-shadow:0 4px 12px rgba(185,138,46,0.5);
      display:flex;align-items:center;justify-content:center;
    ">
      <svg style="transform:rotate(45deg);width:18px;height:18px;fill:none;stroke:#14261E;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -44],
  });

const createNgoIcon = () =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:44px;height:44px;border-radius:12px;
      background:linear-gradient(135deg,#3F6B4A,#52895f);
      border:3px solid #B98A2E;box-shadow:0 4px 14px rgba(63,107,74,0.5);
      display:flex;align-items:center;justify-content:center;
    ">
      <svg style="width:22px;height:22px;fill:none;stroke:#EDE8DE;stroke-width:2;stroke-linecap:round;stroke-linejoin:round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -46],
  });

// Re-center map when markers change
function RecenterMap({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length >= 2) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    } else if (positions.length === 1) {
      map.setView(positions[0], 13);
    }
  }, [map, JSON.stringify(positions)]); // eslint-disable-line
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

const LiveDeliveryMap = ({
  pickupId,
  providerLocation,   // { latitude, longitude, address }
  ngoLocation,        // { latitude, longitude, address } (initial)
  ngoName,
  providerName,
  etaMinutes: initialEta,
  distanceKm: initialDistance,
  routeLabel,
}) => {
  // Provider position (from GPS or pickup record)
  const providerPos = providerLocation?.latitude
    ? [providerLocation.latitude, providerLocation.longitude]
    : null;

  // NGO driver live position (updates via Socket.IO)
  const [ngoPos, setNgoPos] = useState(
    ngoLocation?.latitude ? [ngoLocation.latitude, ngoLocation.longitude] : null
  );
  const [routeCoords, setRouteCoords] = useState([]); // [{lat, lng}] → [[lat, lng]]
  const [routeInfo, setRouteInfo] = useState({
    distanceKm: initialDistance || null,
    durationMinutes: initialEta || null,
    label: routeLabel || 'Calculating route...',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [mapError, setMapError] = useState(null);

  const socketRef = useRef(null);

  // Fetch route from backend (OSRM via backend proxy)
  const fetchRoute = useCallback(async (origin, dest) => {
    if (!origin || !dest) return;
    try {
      const res = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error('OSRM error');
      const data = await res.json();
      if (data.routes?.[0]) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteCoords(coords);
        setRouteInfo({
          distanceKm: Math.round((route.distance / 1000) * 10) / 10,
          durationMinutes: Math.round(route.duration / 60),
          label: 'Via Road — OSRM Route',
        });
      }
    } catch {
      // OSRM unavailable — draw straight line between provider and NGO
      if (origin && dest) {
        setRouteCoords([origin, dest]);
        setRouteInfo((prev) => ({ ...prev, label: 'Direct Route (offline)' }));
      }
    }
  }, []);

  // Recalculate route when NGO position updates significantly (>100m threshold)
  const prevNgoPosRef = useRef(null);
  useEffect(() => {
    if (!providerPos || !ngoPos) return;
    const prev = prevNgoPosRef.current;
    if (prev) {
      const dLat = Math.abs(ngoPos[0] - prev[0]);
      const dLng = Math.abs(ngoPos[1] - prev[1]);
      // ~0.001 degree ≈ 100m — throttle route recalculation
      if (dLat < 0.001 && dLng < 0.001) return;
    }
    prevNgoPosRef.current = ngoPos;
    fetchRoute(ngoPos, providerPos);
  }, [ngoPos, providerPos, fetchRoute]);

  // Initial route fetch
  useEffect(() => {
    if (providerPos && ngoPos) {
      fetchRoute(ngoPos, providerPos);
    }
  }, []); // eslint-disable-line

  // Socket.IO — subscribe to live NGO driver position
  useEffect(() => {
    if (!pickupId) return;

    const socket = connectSocket();
    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // Join this pickup's room
    joinPickupRoom(pickupId);
    setIsConnected(socket.connected);

    // Handle live NGO location updates
    const handleLocationUpdate = (data) => {
      if (data.pickupId !== pickupId) return;
      setNgoPos([data.latitude, data.longitude]);
      setLastUpdate(new Date(data.timestamp));
    };

    socket.on('delivery:location-updated', handleLocationUpdate);

    return () => {
      socket.off('delivery:location-updated', handleLocationUpdate);
      leavePickupRoom(pickupId);
    };
  }, [pickupId]);

  const mapCenter = providerPos || ngoPos || [28.6315, 77.2167]; // Delhi fallback
  const allPositions = [providerPos, ngoPos].filter(Boolean);

  const providerIcon = createProviderIcon();
  const ngoIcon = createNgoIcon();

  return (
    <div className="rounded-2xl bg-pineCanopy overflow-hidden relative shadow-xl flex flex-col">

      {/* Map Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-xs px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 border border-spiceGold/40">
          <Navigation className="h-3.5 w-3.5 text-spiceGold" />
          <span className="text-slate-200">{routeInfo.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {routeInfo.distanceKm && (
            <span className="text-spiceGold font-bold">{routeInfo.distanceKm} km</span>
          )}
          <div className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${
            isConnected
              ? 'bg-mossVerified/20 border-mossVerified/50 text-emerald-300'
              : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}>
            {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            <span>{isConnected ? 'LIVE' : 'OFFLINE'}</span>
          </div>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="h-[340px] w-full relative">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ background: '#1a2e22' }}
        >
          {/* Dark-tinted OpenStreetMap tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.75}
          />

          <RecenterMap positions={allPositions} />

          {/* OSRM Route Polyline */}
          {routeCoords.length >= 2 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: '#B98A2E',
                weight: 4,
                opacity: 0.85,
                dashArray: '10, 6',
              }}
            />
          )}

          {/* Provider Marker */}
          {providerPos && (
            <Marker position={providerPos} icon={providerIcon}>
              <Popup>
                <div className="text-xs font-mono">
                  <strong className="text-amber-800">📍 {providerName || 'Provider Location'}</strong>
                  <br />
                  <span className="text-slate-600">Pickup Point</span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* NGO / Driver Marker (live) */}
          {ngoPos && (
            <Marker position={ngoPos} icon={ngoIcon}>
              <Popup>
                <div className="text-xs font-mono">
                  <strong className="text-emerald-800">🚚 {ngoName || 'NGO Driver'}</strong>
                  <br />
                  <span className="text-slate-600">
                    {lastUpdate
                      ? `Updated: ${lastUpdate.toLocaleTimeString()}`
                      : 'Initial position'}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* No Location Overlay */}
        {!providerPos && !ngoPos && (
          <div className="absolute inset-0 flex items-center justify-center bg-pineCanopy/80 z-[500]">
            <div className="text-center text-slate-300 font-mono text-xs space-y-2">
              <MapPin className="h-8 w-8 text-spiceGold/60 mx-auto" />
              <p>Location data not available yet.</p>
              <p className="text-[11px] text-slate-400">Waiting for GPS coordinates from pickup record...</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-4 px-5 py-4 border-t border-white/10 text-xs font-mono">
        <div>
          <span className="text-slate-400 block text-[11px]">Distance</span>
          <strong className="text-white text-sm">
            {routeInfo.distanceKm ? `${routeInfo.distanceKm} km` : '—'}
          </strong>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Travel ETA</span>
          <strong className="text-spiceGold text-sm">
            {routeInfo.durationMinutes ? `${routeInfo.durationMinutes} min` : '—'}
          </strong>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Live Tracking</span>
          <strong className={`text-sm ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
            {isConnected ? '● Active' : '○ Offline'}
          </strong>
        </div>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-[72px] right-3 z-[400] bg-pineCanopy/90 backdrop-blur-sm p-2.5 rounded-xl border border-spiceGold/30 text-[10px] font-mono space-y-1.5">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="h-3 w-3 rounded-full bg-spiceGold" />
          <span>{providerName || 'Provider'}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <span className="h-3 w-3 rounded-xl bg-mossVerified" />
          <span>{ngoName || 'NGO Driver'}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveDeliveryMap;
