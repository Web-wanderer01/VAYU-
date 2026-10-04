'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, Polygon, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Layers, Crosshair, Map as MapIcon, Navigation, Maximize, Play, Pause, FastForward, Download, Ruler, Hexagon, Activity, ChevronRight, ChevronLeft, Terminal, Plane, ShieldAlert, Wifi, BatteryCharging, CloudRain, Zap, Wind, Navigation2 } from 'lucide-react';

const redIcon = new L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
const orangeIcon = new L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
const yellowIcon = new L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });

const droneIcon = new L.DivIcon({
  html: `<div style="background-color: black; border: 2px solid cyan; border-radius: 50%; padding: 4px; box-shadow: 0 0 10px cyan; display: flex; justify-content: center; items-center;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="cyan" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg></div>`,
  className: 'custom-drone-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

function MapController({ targetCenter, targetZoom }: { targetCenter: [number, number], targetZoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(targetCenter, targetZoom, { duration: 1.5 });
  }, [targetCenter, targetZoom, map]);
  return null;
}

function MapEvents({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) {
  useMapEvents({ click(e) { onMapClick(e.latlng); } });
  return null;
}

export default function GisMapComponent() {
  const [radarTime, setRadarTime] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.296, 85.824]); 
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLayers, setActiveLayers] = useState({ radar: true, floodRisk: false, infrastructure: true, polygons: true });
  const [dronePos, setDronePos] = useState<[number, number]>([20.100, 85.900]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<[number, number][]>([]);
  const [measureDistance, setMeasureDistance] = useState<number | null>(null);
  const [timeline, setTimeline] = useState('NOW');

  const odishaPolygon: [number, number][] = [ [19.0, 84.5], [21.5, 87.0], [21.0, 87.5], [18.5, 85.0] ];
  const mumbaiPolygon: [number, number][] = [ [19.2, 72.8], [19.2, 73.0], [18.9, 73.0], [18.9, 72.8] ];
  const logs = [ "> Establishing connection to VAYU-SAT-1...", "> Weather model synchronized.", "> Processing radar telemetry.", "> AI Risk Engine analyzing." ];

  useEffect(() => {
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then(res => res.json())
      .then(data => { if (data.radar && data.radar.past && data.radar.past.length > 0) setRadarTime(data.radar.past[data.radar.past.length - 1].time); });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setDronePos(prev => [prev[0] + 0.001, prev[1] - 0.002]); }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickJump = (lat: number, lng: number, zoom: number, zoneName: string) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
    setSelectedZone(zoneName);
    setSidebarOpen(true);
  };

  const handleMapClick = (latlng: L.LatLng) => {
    if (measureMode) {
      const newPoints = [...measurePoints, [latlng.lat, latlng.lng] as [number, number]];
      setMeasurePoints(newPoints);
      if (newPoints.length > 1) {
        let dist = 0;
        for (let i = 0; i < newPoints.length - 1; i++) {
          const p1 = L.latLng(newPoints[i][0], newPoints[i][1]);
          const p2 = L.latLng(newPoints[i+1][0], newPoints[i+1][1]);
          dist += p1.distanceTo(p2) / 1000;
        }
        setMeasureDistance(dist);
      }
    }
  };

  const timeOptions = ['NOW', '+3H', '+6H', '+12H', '+24H', '+48H'];

  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex overflow-hidden bg-black font-sans">
      
      {/* VAYU IMPACT ENGINE SIDEBAR */}
      <div className={`absolute left-0 top-0 h-full bg-[#0a1128]/95 backdrop-blur-md border-r border-blue-900/50 text-white transition-all duration-300 z-[1000] flex flex-col ${sidebarOpen ? 'w-[400px]' : 'w-0 -translate-x-full'}`}>
        
        <div className="p-5 border-b border-blue-900/50 flex justify-between items-center bg-[#060b19]">
          <h2 className="font-black text-lg flex items-center tracking-wider text-cyan-400">
            <Zap className="mr-2 text-yellow-400" size={20}/> VAYU IMPACT ENGINE
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          {/* Timeline */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Prediction Timeline</h3>
            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
              {timeOptions.map(t => (
                <button 
                  key={t} onClick={() => setTimeline(t)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-colors ${timeline === t ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Location Selection */}
          {!selectedZone ? (
            <div className="space-y-4">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Hazard Zones</h3>
               <button onClick={() => handleQuickJump(20.296, 85.824, 8, 'Odisha Coast')} className="w-full text-left p-4 bg-gradient-to-br from-red-900/30 to-black border border-red-800/50 rounded-xl hover:bg-red-900/50 transition group">
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-red-400 flex items-center"><Wind size={16} className="mr-2"/> Odisha Coast (Cyclone)</h4>
                   <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded font-bold animate-pulse">RED ALERT</span>
                 </div>
                 <p className="text-xs text-gray-400">Predicted landfall near Puri. High risk of storm surge.</p>
               </button>
               <button onClick={() => handleQuickJump(19.076, 72.877, 9, 'Mumbai Suburbs')} className="w-full text-left p-4 bg-gradient-to-br from-orange-900/30 to-black border border-orange-800/50 rounded-xl hover:bg-orange-900/50 transition group">
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-orange-400 flex items-center"><CloudRain size={16} className="mr-2"/> Mumbai (Urban Flood)</h4>
                   <span className="bg-orange-600 text-white text-[9px] px-2 py-0.5 rounded font-bold">ORANGE</span>
                 </div>
                 <p className="text-xs text-gray-400">Extreme localized precipitation. Drainage systems overwhelmed.</p>
               </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center"><Navigation2 size={18} className="mr-2 text-cyan-400"/> {selectedZone}</h3>
                <button onClick={() => setSelectedZone(null)} className="text-xs text-gray-400 hover:text-white underline">Back to overview</button>
              </div>

              {/* Explainable AI Block */}
              <div className="bg-gray-900/80 rounded-xl border border-gray-700 overflow-hidden">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-gray-300">Explainable AI (XAI)</span>
                  <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">87% CONFIDENCE</span>
                </div>
                <div className="p-4 space-y-3 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">Rainfall Forecast:</span><span className="text-red-400 font-bold">+42% vs Normal</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Soil Saturation:</span><span className="text-orange-400 font-bold">91% (Critical)</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">River Level:</span><span className="text-red-400 font-bold">+1.8m</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Drainage Capacity:</span><span className="text-yellow-400 font-bold">Low</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Historical Flood Correl:</span><span className="text-white font-bold">High</span></div>
                </div>
              </div>

              {/* Impact Engine Block */}
              <div className="bg-gradient-to-br from-red-900/20 to-black rounded-xl border border-red-900/50 overflow-hidden">
                <div className="bg-red-900/30 px-4 py-2 border-b border-red-900/50 flex justify-between items-center">
                   <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Projected Impact ({timeline})</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 text-xs">
                   <div><div className="text-gray-500 text-[10px] uppercase">Flood Probability</div><div className="text-xl font-black text-red-500">82%</div></div>
                   <div><div className="text-gray-500 text-[10px] uppercase">People at Risk</div><div className="text-xl font-black text-white">3,420</div></div>
                   <div><div className="text-gray-500 text-[10px] uppercase">Villages Affected</div><div className="text-lg font-bold text-orange-400">12</div></div>
                   <div><div className="text-gray-500 text-[10px] uppercase">Roads Blocked</div><div className="text-lg font-bold text-orange-400">2</div></div>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="border border-red-500/50 bg-red-500/10 rounded-xl p-4">
                <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center"><ShieldAlert size={14} className="mr-2"/> AI Recommended Action</h4>
                <p className="text-xs text-white font-bold mb-1">EVACUATION RECOMMENDED</p>
                <p className="text-xs text-gray-400 mb-4">Low-lying coastal settlements within 2.5 km should be alerted and evacuated immediately.</p>
                <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 rounded shadow-lg shadow-red-900/50 transition">
                   BROADCAST RED ALERT TO {selectedZone.toUpperCase()}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-[1001] bg-[#0a1128] border border-blue-900/50 text-white p-1 py-4 rounded-r-lg shadow-2xl transition-all duration-300 ${sidebarOpen ? 'left-[400px]' : 'left-0'}`}
      >
        {sidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
      </button>

      {/* LIVE DRONE TELEMETRY OVERLAY */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/80 backdrop-blur border border-cyan-500/50 rounded-lg p-3 flex space-x-6 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] pointer-events-none">
        <div className="flex items-center text-cyan-400 animate-pulse mr-2"><Plane size={16} className="mr-2"/> NDRF-UAV-1</div>
        <div className="text-xs"><div className="text-gray-400">ALT</div><div className="font-mono">142m</div></div>
        <div className="text-xs"><div className="text-gray-400">SPD</div><div className="font-mono">24km/h</div></div>
        <div className="text-xs"><div className="text-gray-400">BAT</div><div className="font-mono flex items-center"><BatteryCharging size={12} className="mr-1 text-green-400"/> 78%</div></div>
      </div>

      {/* ANALYSIS TOOLKIT (Floating Right) */}
      <div className="absolute right-4 top-4 z-[1000] flex flex-col space-y-2">
        <div className="bg-[#0a1128]/90 backdrop-blur rounded-lg border border-gray-800 shadow-2xl p-1 flex flex-col space-y-1">
          <button onClick={() => { setMeasureMode(!measureMode); setMeasurePoints([]); setMeasureDistance(null); }} className={`p-3 rounded transition group relative ${measureMode ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
            <Ruler size={18} />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-white">Measure Distance</span>
          </button>
          <div className="h-px bg-gray-700 mx-2 my-1"></div>
          <button className="p-3 hover:bg-gray-800 rounded text-gray-300 hover:text-white transition group relative">
            <Download size={18} />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-white">Export GeoJSON</span>
          </button>
        </div>
        {measureDistance !== null && (
          <div className="bg-blue-900/90 backdrop-blur border border-blue-500 rounded p-3 shadow-lg text-white text-center mt-2 animate-in fade-in zoom-in">
            <div className="text-[10px] text-blue-300 uppercase tracking-wider mb-1">Distance</div>
            <div className="text-xl font-black">{measureDistance.toFixed(2)} km</div>
          </div>
        )}
      </div>

      {/* THE ACTUAL MAP */}
      <div className={`flex-1 h-full w-full relative ${measureMode ? 'cursor-crosshair' : ''}`}>
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <MapController targetCenter={mapCenter} targetZoom={mapZoom} />
          <MapEvents onMapClick={handleMapClick} />
          
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Dark Satellite (Command)">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; Stadia Maps' />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Terrain / Topo">
              <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution='&copy; OpenTopoMap' />
            </LayersControl.BaseLayer>
            {activeLayers.radar && radarTime && (
              <TileLayer url={`https://tilecache.rainviewer.com/v2/radar/${radarTime}/256/{z}/{x}/{y}/2/1_1.png`} opacity={0.8} zIndex={10} />
            )}
          </LayersControl>

          {measurePoints.length > 0 && <Polyline positions={measurePoints} color="cyan" weight={3} dashArray="5, 10" />}
          <Marker position={dronePos} icon={droneIcon} zIndexOffset={1000} />
          <Marker position={[20.296, 85.824]} icon={redIcon}><Popup><strong>Cyclone Alert (Red)</strong><br/>Odisha Coast</Popup></Marker>
          <Marker position={[19.076, 72.877]} icon={orangeIcon}><Popup><strong>Urban Flood (Orange)</strong><br/>Mumbai</Popup></Marker>
          <Marker position={[31.104, 77.173]} icon={yellowIcon}><Popup><strong>Landslide Risk (Yellow)</strong><br/>Himachal Pradesh</Popup></Marker>

          {activeLayers.polygons && (
            <>
              <Polygon positions={odishaPolygon} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.3, weight: 2 }} eventHandlers={{ click: () => setSelectedZone('Odisha Coast') }} />
              <Polygon positions={mumbaiPolygon} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.3, weight: 2 }} eventHandlers={{ click: () => setSelectedZone('Mumbai Suburbs') }} />
            </>
          )}
        </MapContainer>
      </div>

      {/* API Live Status Overlay */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-[#0a1128]/95 backdrop-blur-md border border-gray-700/50 rounded-lg p-4 shadow-2xl w-64 pointer-events-none">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-700 pb-2 flex items-center">
          <Activity size={14} className="mr-2 text-cyan-500" /> API Systems Status
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white flex items-center"><MapIcon size={12} className="mr-1 text-blue-400"/> OpenStreetMap</span>
            <span className="flex items-center text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></span>LIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white flex items-center"><CloudRain size={12} className="mr-1 text-indigo-400"/> OpenMeteo Radar</span>
            <span className="flex items-center text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></span>LIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white flex items-center"><Terminal size={12} className="mr-1 text-purple-400"/> VAYU Vision-AI</span>
            <span className="flex items-center text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></span>ACTIVE</span>
          </div>
        </div>
      </div>

    </div>
  );
}

