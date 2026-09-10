import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import useGeolocation from '../hooks/useGeolocation';

const customMarkerIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `
    <div class="relative flex items-center justify-center">
      <div class="h-8 w-8 rounded-full bg-spiceGold text-white flex items-center justify-center shadow-lg ring-4 ring-spiceGold/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const gpsMarkerIcon = L.divIcon({
  className: 'gps-marker-icon',
  html: `
    <div class="relative flex items-center justify-center animate-pulse">
      <div class="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-400/50">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
      </div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function LocationMarker({ position, setPosition, setLocationText }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      
      // Basic reverse geocoding via Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
        .then(res => res.json())
        .then(data => {
           if (data && data.display_name) {
             const parts = data.display_name.split(',');
             const shortName = parts.slice(0, 3).join(', ');
             setLocationText(shortName);
           }
        })
        .catch(err => console.error("Reverse geocoding failed", err));
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customMarkerIcon} />
  );
}

function GPSMarker({ gpsLocation }) {
  const map = useMap();

  useEffect(() => {
    if (gpsLocation && gpsLocation.latitude && gpsLocation.longitude) {
      map.flyTo([gpsLocation.latitude, gpsLocation.longitude], 16, {
        animate: true,
        duration: 1,
      });
    }
  }, [gpsLocation, map]);

  if (!gpsLocation || !gpsLocation.latitude || !gpsLocation.longitude) {
    return null;
  }

  return (
    <Marker 
      position={[gpsLocation.latitude, gpsLocation.longitude]} 
      icon={gpsMarkerIcon}
      title="Your Current Location"
    />
  );
}

export const LocationPickerMap = ({ locationText, setLocationText, coordinates, setCoordinates }) => {
  const [position, setPosition] = useState(coordinates || { lat: 28.6315, lng: 77.2167 });
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(null);
  const watchIdRef = useRef(null);

  // Request GPS permission and start watching
  const handleUseCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Your browser does not support live location.');
      return;
    }

    setGpsEnabled(true);

    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 5000,
    };

    const onSuccess = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      
      setGpsLocation({
        latitude,
        longitude,
        accuracy,
        timestamp: position.timestamp,
      });

      // Update manual position and coordinates
      const newPos = { lat: latitude, lng: longitude };
      setPosition(newPos);
      if (setCoordinates) {
        setCoordinates(newPos);
      }

      // Try reverse geocoding
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.display_name) {
            const parts = data.display_name.split(',');
            const shortName = parts.slice(0, 3).join(', ');
            setLocationText(shortName);
          }
        })
        .catch(err => console.error("Reverse geocoding failed", err));
    };

    const onError = (err) => {
      let message = 'Unable to get your location.';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message = 'Location permission denied. Please allow location access in your browser settings.';
          break;
        case err.POSITION_UNAVAILABLE:
          message = 'Unable to determine your current location. Check your GPS signal.';
          break;
        case err.TIMEOUT:
          message = 'Location request timed out. Please try again.';
          break;
        default:
          message = 'Location unavailable.';
      }
      alert(message);
      setGpsEnabled(false);
    };

    // Start watching position for continuous updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      geolocationOptions
    );
  };

  // Clean up watcher on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (coordinates) {
      setPosition(coordinates);
    }
  }, [coordinates]);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-muted-foreground mb-1 text-xs">Exact Location (Tap on map to set)</label>
        <div className="relative flex gap-2">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-spiceGold" />
            <input
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="Search or select on map..."
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className={`px-3 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
              gpsEnabled
                ? 'bg-blue-500/20 border border-blue-400 text-blue-600 hover:bg-blue-500/30'
                : 'bg-spiceGold/10 border border-spiceGold text-spiceGold hover:bg-spiceGold/20'
            }`}
            title="Use your device GPS location"
          >
            <Navigation className="h-4 w-4" />
            <span className="hidden sm:inline">GPS</span>
          </button>
        </div>

        {/* GPS Status */}
        {gpsEnabled && gpsLocation && (
          <div className="mt-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 text-xs font-mono text-blue-700 dark:text-blue-300">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>✓ Live location enabled</span>
            </div>
            <div className="mt-1 text-blue-600 dark:text-blue-400">
              Accuracy: {Math.round(gpsLocation.accuracy)} m
            </div>
          </div>
        )}

        {gpsEnabled && !gpsLocation && (
          <div className="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 text-xs font-mono text-amber-700 dark:text-amber-300">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Getting your location...</span>
            </div>
          </div>
        )}

        {!gpsEnabled && !gpsLocation && (
          <div className="mt-2 p-2.5 rounded-lg bg-muted border border-border text-xs font-mono text-muted-foreground">
            Location not enabled • Tap map or click GPS to set location
          </div>
        )}
      </div>
      <div className="h-64 w-full rounded-xl overflow-hidden border border-border">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={(pos) => {
            setPosition(pos);
            if (setCoordinates) setCoordinates(pos);
          }} setLocationText={setLocationText} />
          {gpsLocation && <GPSMarker gpsLocation={gpsLocation} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPickerMap;
