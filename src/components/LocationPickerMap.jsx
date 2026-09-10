import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

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

export const LocationPickerMap = ({ locationText, setLocationText, coordinates, setCoordinates }) => {
  const [position, setPosition] = useState(coordinates || { lat: 28.6315, lng: 77.2167 });

  useEffect(() => {
    if (coordinates) {
      setPosition(coordinates);
    }
  }, [coordinates]);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-muted-foreground mb-1 text-xs">Exact Location (Tap on map to set)</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-spiceGold" />
          <input
            type="text"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="Search or select on map..."
            className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-spiceGold focus:outline-none"
          />
        </div>
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
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPickerMap;
