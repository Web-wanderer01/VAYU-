'use client';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, LayersControl, useMap, useMapEvents, Circle, Popup, Marker, Polygon, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Layers, CloudRain, Crosshair, Map as MapIcon, Navigation, Maximize, Play, Pause, FastForward, Download, Ruler, Hexagon, Activity, ChevronRight, ChevronLeft, Terminal, Plane, ShieldAlert, Wifi, BatteryCharging } from 'lucide-react';

// Icons
const redIcon = new L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
const orangeIcon = new L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
const yellowIcon = new L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });

const droneIcon = new L.DivIcon({
  html: `<div style="background-color: black; border: 2px solid cyan; border-radius: 50%; padding: 4px; box-shadow: 0 0 10px cyan; display: flex; justify-content: center; items-center;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="cyan" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg></div>`,
  className: 'custom-drone-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

// Map Movement Controller
function MapController({ targetCenter, targetZoom }: { targetCenter: [number, number], targetZoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(targetCenter, targetZoom, { duration: 1.5 });
  }, [targetCenter, targetZoom, map]);
  return null;
}

// Map Click Handler for Measuring
function MapEvents({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function GisMapComponent() {
  const [radarTime, setRadarTime] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [forecastHour, setForecastHour] = useState(0); 
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.296, 85.824]); 
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active Layers
  const [activeLayers, setActiveLayers] = useState({ radar: true, floodRisk: false, infrastructure: true, polygons: true });

  // 1. Drone Tracking State
  const [dronePos, setDronePos] = useState<[number, number]>([20.100, 85.900]);
  useEffect(() => {
    const interval = setInterval(() => {
      setDronePos(prev => [prev[0] + 0.001, prev[1] - 0.002]); // Moves north-west slightly
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 2. Affected Zone Polygons State
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const odishaPolygon: [number, number][] = [ [20.5, 86.5], [19.8, 86.2], [19.5, 85.0], [20.0, 84.8], [21.0, 85.5] ];
  const mumbaiPolygon: [number, number][] = [ [19.5, 72.7], [18.8, 72.7], [18.8, 73.2], [19.5, 73.2] ];

  // 3. Live Terminal Log Overlay State
  const mockLogStream = [
    "Ingesting ISRO satellite telemetry...",
    "VAYU ML: Recalculating flood contours in Sector 4...",
    "Anomaly detected: Water level rise near Cuttack...",
    "Syncing drone visual data to command center...",
    "Analyzing spectral bands for crop damage...",
    "NDRF Battalion 4 reports on-ground validation.",
    "Updating predictive model weights (Epoch 420)...",
    "Processing radar reflection data from Doppler..."
  ];
  const [logs, setLogs] = useState<string[]>(['[SYS] VAYU GIS Initialized...']);
  
  useEffect(() => {
    const logInterval = setInterval(() => {
      const now = new Date();
      const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
      const randomLog = mockLogStream[Math.floor(Math.random() * mockLogStream.length)];
      setLogs(prev => [...prev.slice(-4), `${timeStr} ${randomLog}`]);
    }, 4000);
    return () => clearInterval(logInterval);
  }, []);

  // 4. Distance Measurement Tool State
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<L.LatLng[]>([]);
  const [measureDistance, setMeasureDistance] = useState<number | null>(null);

  const handleMapClick = (latlng: L.LatLng) => {
    if (!measureMode) return;
    if (measurePoints.length === 0) {
      setMeasurePoints([latlng]);
      setMeasureDistance(null);
    } else if (measurePoints.length === 1) {
      const dist = measurePoints[0].distanceTo(latlng) / 1000; // in km
      setMeasurePoints([measurePoints[0], latlng]);
      setMeasureDistance(dist);
      setMeasureMode(false); // turn off after measuring
    } else {
      setMeasurePoints([latlng]);
      setMeasureDistance(null);
    }
  };

  // Fetch RainViewer timestamp
  useEffect(() => {
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then(res => res.json())
      .then(data => {
        if (data.radar && data.radar.past && data.radar.past.length > 0) {
          setRadarTime(data.radar.past[data.radar.past.length - 1].time);
        }
      });
  }, []);

  const handleQuickJump = (lat: number, lng: number, zoom: number) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-black z-0 flex">
      
      {/* SIDEBAR CONTROL PANEL */}
      <div className={`absolute left-0 top-0 h-full bg-[#0a1128]/95 backdrop-blur-md border-r border-blue-900/50 text-white transition-all duration-300 z-[1000] flex flex-col ${sidebarOpen ? 'w-80' : 'w-0 -translate-x-full'}`}>
        
        <div className="p-5 border-b border-blue-900/50 flex justify-between items-center bg-[#060b19]">
          <h2 className="font-black text-lg flex items-center tracking-wider text-cyan-400">
            <Layers className="mr-2" size={20}/> VAYU GIS Layers
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8">
          
          {/* Layer Toggles */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">AI & Weather Overlays</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" checked={activeLayers.radar} onChange={() => setActiveLayers({...activeLayers, radar: !activeLayers.radar})} className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-800" />
                <span className="text-sm font-medium group-hover:text-blue-300 transition">Precipitation Radar (Live)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" checked={activeLayers.floodRisk} onChange={() => setActiveLayers({...activeLayers, floodRisk: !activeLayers.floodRisk})} className="w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500 bg-gray-800" />
                <span className="text-sm font-medium group-hover:text-red-400 transition">AI Flood Risk Heatmap</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" checked={activeLayers.polygons} onChange={() => setActiveLayers({...activeLayers, polygons: !activeLayers.polygons})} className="w-4 h-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-800" />
                <span className="text-sm font-medium group-hover:text-purple-400 transition">Disaster Impact Zones</span>
              </label>
            </div>
          </div>

          {/* Quick Jump */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Active Disaster Zones</h3>
            <div className="space-y-2">
              <button onClick={() => handleQuickJump(20.296, 85.824, 8)} className="w-full text-left px-3 py-2 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-800/50 rounded-lg text-sm transition flex justify-between items-center group">
                <span>Odisha Coast (Cyclone)</span>
                <Crosshair size={14} className="text-blue-400 opacity-0 group-hover:opacity-100 transition"/>
              </button>
              <button onClick={() => handleQuickJump(19.076, 72.877, 9)} className="w-full text-left px-3 py-2 bg-orange-900/30 hover:bg-orange-800/50 border border-orange-800/50 rounded-lg text-sm transition flex justify-between items-center group">
                <span>Mumbai (Urban Flood)</span>
                <Crosshair size={14} className="text-orange-400 opacity-0 group-hover:opacity-100 transition"/>
              </button>
            </div>
          </div>
          
          {/* Status */}
          <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
             <div className="flex items-center text-green-400 text-xs font-bold mb-1">
               <Activity size={14} className="mr-2 animate-pulse"/> VAYU SERVER SYNCED
             </div>
             <p className="text-[10px] text-gray-400">Model weights synchronized 2m ago.</p>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-[1001] bg-[#0a1128] border border-blue-900/50 text-white p-1 py-4 rounded-r-lg shadow-2xl transition-all duration-300 ${sidebarOpen ? 'left-80' : 'left-0'}`}
      >
        {sidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
      </button>

      {/* ZONE IMPACT STATS PANEL (Appears when Polygon is clicked) */}
      {selectedZone && (
        <div className={`absolute top-20 right-20 z-[1000] w-80 bg-[#0a1128]/95 backdrop-blur-md border border-purple-500/50 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] text-white overflow-hidden transition-all duration-300`}>
          <div className="bg-gradient-to-r from-purple-900 to-[#0a1128] p-4 flex justify-between items-center border-b border-purple-800">
            <h3 className="font-bold flex items-center text-sm"><ShieldAlert size={16} className="mr-2 text-purple-400"/> {selectedZone} Zone Data</h3>
            <button onClick={() => setSelectedZone(null)} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wider">Estimated Pop. Affected</div>
              <div className="text-2xl font-black text-red-400">{selectedZone === 'Odisha Coast' ? '2.4 Million' : '1.8 Million'}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wider">Agri. Loss Probability</div>
              <div className="text-lg font-bold text-orange-400">High (85% via VAYU)</div>
            </div>
            <div className="pt-2 border-t border-gray-800">
              <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded text-xs font-bold transition">Deploy Relief Materials</button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE DRONE TELEMETRY OVERLAY */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/80 backdrop-blur border border-cyan-500/50 rounded-lg p-3 flex space-x-6 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] pointer-events-none">
        <div className="flex items-center text-cyan-400 animate-pulse mr-2">
          <Plane size={16} className="mr-2"/> NDRF-UAV-1
        </div>
        <div className="text-xs">
          <div className="text-gray-400">ALT</div>
          <div className="font-mono">142m</div>
        </div>
        <div className="text-xs">
          <div className="text-gray-400">SPD</div>
          <div className="font-mono">24km/h</div>
        </div>
        <div className="text-xs">
          <div className="text-gray-400">BAT</div>
          <div className="font-mono flex items-center"><BatteryCharging size={12} className="mr-1 text-green-400"/> 78%</div>
        </div>
        <div className="text-xs border-l border-gray-700 pl-4">
          <div className="text-gray-400">COORD</div>
          <div className="font-mono text-cyan-300">{dronePos[0].toFixed(4)}, {dronePos[1].toFixed(4)}</div>
        </div>
      </div>

      {/* LIVE TERMINAL LOG OVERLAY */}
      <div className={`absolute bottom-28 left-4 z-[1000] w-96 bg-black/90 border border-gray-800 rounded-lg shadow-xl font-mono text-[10px] overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-80' : ''}`}>
        <div className="bg-gray-900 px-3 py-1 flex items-center border-b border-gray-800 text-gray-500">
          <Terminal size={12} className="mr-2"/> VAYU SYSTEM TERMINAL
        </div>
        <div className="p-3 space-y-1 h-28 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="text-green-500">{log}</div>
          ))}
          <div className="text-green-500 animate-pulse">_</div>
        </div>
      </div>

      {/* ANALYSIS TOOLKIT (Floating Right) */}
      <div className="absolute right-4 top-4 z-[1000] flex flex-col space-y-2">
        <div className="bg-[#0a1128]/90 backdrop-blur rounded-lg border border-gray-800 shadow-2xl p-1 flex flex-col space-y-1">
          <button 
            onClick={() => { setMeasureMode(!measureMode); setMeasurePoints([]); setMeasureDistance(null); }}
            className={`p-3 rounded transition group relative ${measureMode ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          >
            <Ruler size={18} />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-white">Measure Distance</span>
          </button>
          
          <div className="h-px bg-gray-700 mx-2 my-1"></div>
          <button className="p-3 hover:bg-gray-800 rounded text-gray-300 hover:text-white transition group relative">
            <Download size={18} />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-white">Export GeoJSON</span>
          </button>
        </div>

        {/* Measure Result Box */}
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
            {/* Base Maps */}
            <LayersControl.BaseLayer checked name="Dark Satellite (Command)">
              <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" attribution='&copy; Stadia Maps' />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Real Satellite Imagery">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='&copy; Esri' />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Terrain / Topo">
              <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution='&copy; OpenTopoMap' />
            </LayersControl.BaseLayer>

            {/* AI / Radar Overlays */}
            {activeLayers.radar && radarTime && (
              <TileLayer
                url={`https://tilecache.rainviewer.com/v2/radar/${radarTime}/256/{z}/{x}/{y}/2/1_1.png`}
                opacity={0.8}
                zIndex={10}
              />
            )}
          </LayersControl>

          {/* MEASUREMENT POLYLINE */}
          {measurePoints.length > 0 && (
            <Polyline positions={measurePoints} color="cyan" weight={3} dashArray="5, 10" />
          )}

          {/* DRONE TRACKER */}
          <Marker position={dronePos} icon={droneIcon} zIndexOffset={1000} />

          {/* NATIONWIDE ALERTS */}
          <Marker position={[20.296, 85.824]} icon={redIcon}><Popup><strong>Cyclone Alert (Red)</strong><br/>Odisha Coast</Popup></Marker>
          <Marker position={[19.076, 72.877]} icon={orangeIcon}><Popup><strong>Urban Flood (Orange)</strong><br/>Mumbai</Popup></Marker>
          <Marker position={[31.104, 77.173]} icon={yellowIcon}><Popup><strong>Landslide Risk (Yellow)</strong><br/>Himachal Pradesh</Popup></Marker>

          {/* INTERACTIVE POLYGONS */}
          {activeLayers.polygons && (
            <>
              <Polygon 
                positions={odishaPolygon} 
                pathOptions={{ color: 'purple', fillColor: 'purple', fillOpacity: 0.3, weight: 2 }}
                eventHandlers={{ click: () => setSelectedZone('Odisha Coast') }}
              />
              <Polygon 
                positions={mumbaiPolygon} 
                pathOptions={{ color: 'purple', fillColor: 'purple', fillOpacity: 0.3, weight: 2 }}
                eventHandlers={{ click: () => setSelectedZone('Mumbai Suburbs') }}
              />
            </>
          )}

          {/* MOCK: AI Flood Risk Heatmap */}
          {activeLayers.floodRisk && (
            <>
              <Circle center={[20.296, 85.824]} radius={40000} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.3 }} />
              <Circle center={[19.076, 72.877]} radius={25000} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.4 }} />
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

