import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Clock, MapPin, CheckCircle2, AlertTriangle, ShieldCheck, HeartHandshake, Zap, Filter, Navigation } from 'lucide-react';

// Custom Leaflet DivIcons using Tailwind CSS
const createCustomMarker = (urgencyLevel, category, status) => {
  let colorClass = 'bg-[#3F6B4A] ring-[#3F6B4A]/30'; // Moss Green
  let badgeText = 'FRESH';

  if (urgencyLevel === 'warning') {
    colorClass = 'bg-[#B98A2E] ring-[#B98A2E]/30'; // Spice Gold
    badgeText = 'SOON';
  } else if (urgencyLevel === 'urgent') {
    colorClass = 'bg-[#8C3B2E] ring-[#8C3B2E]/30 animate-bounce'; // Brick Red
    badgeText = 'URGENT';
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center cursor-pointer group">
        <div class="h-9 w-9 rounded-full ${colorClass} text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-lg ring-4 transition-transform transform group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <span class="absolute -top-3 bg-[#14261E] text-[#EDE8DE] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-[#B98A2E]/40 whitespace-nowrap">
          ${badgeText}
        </span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

// Component to dynamically re-center map when center prop changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export const MapView = ({ listings = [], onClaimListing, isNgoVerified = true }) => {
  const [selectedRadiusKm, setSelectedRadiusKm] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mapCenter, setMapCenter] = useState([28.6315, 77.2167]); // Delhi Center

  // Filter listings based on radius and category
  const filteredListings = listings.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    // Simple Euclidean approximate distance filter for demo
    const dist = Math.sqrt(
      Math.pow((item.lat - mapCenter[0]) * 111, 2) + Math.pow((item.lng - mapCenter[1]) * 111, 2)
    );
    return dist <= selectedRadiusKm;
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
      
      {/* Map Header & Filter Toolbar */}
      <div className="p-4 bg-primary text-primary-foreground flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border">
        
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary font-bold">
            <Navigation className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-base text-foreground dark:text-primary-foreground">
              Live Geographic Surplus Food Map
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              Real-time available listings within radius • Color-coded by urgency
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          
          {/* Radius Slider */}
          <div className="flex items-center gap-2 bg-background/20 px-3 py-1.5 rounded-xl border border-border/40">
            <span className="text-muted-foreground">Radius:</span>
            <input
              type="range"
              min="2"
              max="25"
              value={selectedRadiusKm}
              onChange={(e) => setSelectedRadiusKm(Number(e.target.value))}
              className="w-20 accent-accent cursor-pointer"
            />
            <strong className="text-accent font-bold">{selectedRadiusKm} km</strong>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-background text-foreground px-3 py-1.5 rounded-xl border border-border text-xs focus:ring-1 focus:ring-accent focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Cooked Meals (Vegetarian)">Cooked Meals (Veg)</option>
              <option value="Raw Produce">Raw Produce</option>
              <option value="Bakery & Snacks">Bakery & Snacks</option>
            </select>
          </div>

          <span className="tech-badge">{filteredListings.length} Active Pins</span>
        </div>

      </div>

      {/* Leaflet Map Layer */}
      <div className="h-[480px] w-full relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <ChangeView center={mapCenter} zoom={12} />
          
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Search Radius Circle Overlay */}
          <Circle
            center={mapCenter}
            radius={selectedRadiusKm * 1000}
            pathOptions={{
              color: '#B98A2E',
              fillColor: '#B98A2E',
              fillOpacity: 0.08,
              weight: 2,
              dashArray: '6, 6'
            }}
          />

          {/* Listing Markers */}
          {filteredListings.map((item) => (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={createCustomMarker(item.urgencyLevel, item.category, item.status)}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-3 max-w-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                      {item.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.urgencyLevel === 'fresh' ? 'bg-emerald-100 text-emerald-800' :
                      item.urgencyLevel === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.freshnessWindowHours}h Window
                    </span>
                  </div>

                  <h4 className="font-semibold text-sm text-foreground leading-tight">{item.foodName}</h4>
                  <p className="text-xs text-muted-foreground">{item.providerName}</p>

                  <div className="p-2 rounded-lg bg-muted/60 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between"><span>Quantity:</span><strong>{item.quantityKg} kg ({item.portions} meals)</strong></div>
                    <div className="flex justify-between"><span>Location:</span><span>{item.location}</span></div>
                    <div className="flex justify-between"><span>AI Score:</span><strong className="text-emerald-700">{item.aiResult?.confidence}% Conf.</strong></div>
                  </div>

                  {onClaimListing && (
                    <button
                      onClick={() => onClaimListing(item.id)}
                      disabled={!isNgoVerified || item.status === 'Accepted'}
                      className={`w-full py-2 rounded-lg font-bold text-xs transition-all ${
                        item.status === 'Accepted'
                          ? 'bg-emerald-600 text-white'
                          : isNgoVerified
                          ? 'btn-primary-gold'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {!isNgoVerified
                        ? '🔒 Verification Gate Locked'
                        : item.status === 'Accepted'
                        ? 'Claimed — Pickup Scheduled'
                        : 'Claim Food Listing Now'}
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] bg-card/90 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg text-[11px] font-mono space-y-1.5">
          <span className="font-bold text-foreground block mb-1">Freshness Legend</span>
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3F6B4A]" />
            <span>Green: Fresh (&gt; 3.5h left)</span>
          </div>
          <div className="flex items-center gap-2 text-amber-700 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-[#B98A2E]" />
            <span>Gold: Consume Soon (2-3.5h)</span>
          </div>
          <div className="flex items-center gap-2 text-red-700 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-[#8C3B2E]" />
            <span>Red: Urgent Pickup (&lt; 2h left)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
