'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icons
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const shelterIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ndrfIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function EmergencyMap() {
  // Center roughly around Bhubaneswar, Odisha (active alert zone)
  const center: [number, number] = [20.2961, 85.8245];

  return (
    <div style={{ height: '400px', width: '100%', zIndex: 0 }} className="relative z-0 rounded-xl overflow-hidden border border-gray-300">
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Radius */}
        <Circle center={center} radius={3000} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }} />
        
        {/* Shelters (Green) */}
        <Marker position={[20.3100, 85.8300]} icon={shelterIcon}>
          <Popup><strong>Govt Cyclone Shelter (Kalinga Stadium)</strong><br/>Capacity: 2000 | Open</Popup>
        </Marker>
        <Marker position={[20.2800, 85.8100]} icon={shelterIcon}>
          <Popup><strong>Relief Camp (Unit 1 High School)</strong><br/>Capacity: 800 | Open</Popup>
        </Marker>

        {/* Hospitals (Red) */}
        <Marker position={[20.2910, 85.8390]} icon={hospitalIcon}>
          <Popup><strong>Capital Hospital</strong><br/>Emergency Ward Active</Popup>
        </Marker>
        <Marker position={[20.3200, 85.8200]} icon={hospitalIcon}>
          <Popup><strong>Apollo Apollo Hospitals</strong><br/>Emergency Ward Active</Popup>
        </Marker>

        {/* NDRF (Blue) */}
        <Marker position={[20.2950, 85.8600]} icon={ndrfIcon}>
          <Popup><strong>NDRF Base Camp 03</strong><br/>Deploying teams to coastal zones.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
