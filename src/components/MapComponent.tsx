'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue with Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapComponent({ zoom = 5, height = "500px" }: { zoom?: number, height?: string }) {
  // Coordinates for India
  const center: [number, number] = [20.5937, 78.9629];
  const [radarTime, setRadarTime] = useState<number | null>(null);

  useEffect(() => {
    // Fetch latest RainViewer timestamp for real-time precipitation radar
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.radar && data.radar.past && data.radar.past.length > 0) {
          // Get the most recent past radar timestamp
          const latest = data.radar.past[data.radar.past.length - 1].time;
          setRadarTime(latest);
        }
      })
      .catch(err => console.error("Error fetching RainViewer data:", err));
  }, []);

  return (
    <div style={{ height, width: '100%', zIndex: 0 }} className="relative z-0">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Terrain Map (OSM)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Dark Mode Satellite">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          {/* Real-time Precipitation Radar Overlay */}
          {radarTime && (
            <LayersControl.Overlay checked name="Live Rain/Cloud Radar">
              <TileLayer
                url={`https://tilecache.rainviewer.com/v2/radar/${radarTime}/256/{z}/{x}/{y}/2/1_1.png`}
                attribution='&copy; <a href="https://www.rainviewer.com/">RainViewer</a>'
                opacity={0.6}
              />
            </LayersControl.Overlay>
          )}

          {/* Active VAYU Alerts Overlay */}
          <LayersControl.Overlay checked name="IMD / VAYU Alerts">
            <>
              <Marker position={[19.0760, 72.8777]} icon={customIcon}>
                <Popup>
                  <strong>Mumbai Suburbs</strong><br/>Heavy Rainfall - Orange Alert
                </Popup>
              </Marker>
              <Marker position={[19.8135, 85.8312]} icon={customIcon}>
                <Popup>
                  <strong>Odisha Coast</strong><br/>Cyclone Warning
                </Popup>
              </Marker>
              <CircleMarker center={[19.0760, 72.8777]} radius={40} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.3, weight: 2 }} />
              <CircleMarker center={[19.8135, 85.8312]} radius={60} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3, weight: 2 }} />
            </>
          </LayersControl.Overlay>
        </LayersControl>

      </MapContainer>
      
      {/* Live Radar Timestamp Badge */}
      {radarTime && (
        <div className="absolute bottom-6 left-6 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-blue-200 flex items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse mr-3 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Live Rainfall Radar</div>
            <div className="text-sm font-black text-blue-900">{new Date(radarTime * 1000).toLocaleTimeString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
