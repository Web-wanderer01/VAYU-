'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Phone, Navigation, Volume2, ShieldAlert, ChevronDown, Activity, AlertOctagon, CheckCircle2 } from 'lucide-react';

// Dynamically import the Leaflet map so it doesn't break during SSR
const EmergencyMap = dynamic(() => import('@/components/EmergencyMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center font-bold text-gray-500">Loading Relief Map...</div>
});

export default function Emergency() {
  const [sosSent, setSosSent] = useState(false);
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  const handleSOS = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  const protocols = [
    { id: 'flood', title: 'Flash Flood Protocol', content: '1. Move immediately to higher ground. 2. Do not walk through moving water. 3. Turn off utilities at the main switches if instructed. 4. Disconnect electrical appliances.' },
    { id: 'cyclone', title: 'Cyclone / High Wind Protocol', content: '1. Stay indoors and away from windows. 2. Anchor heavy objects outside. 3. Keep your emergency kit, flashlights, and battery-operated radio nearby. 4. Listen to official IMD/NDMA updates.' },
    { id: 'lightning', title: 'Thunderstorm & Lightning Protocol', content: '1. Avoid open fields, elevated areas, or tall trees. 2. Stay away from water and wet items. 3. If indoors, avoid using corded phones and electrical equipment.' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* Critical Header */}
      <div className="bg-red-600 text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start uppercase tracking-wider">
              <AlertOctagon className="mr-3 animate-pulse" size={36}/> Emergency Center
            </h1>
            <p className="text-red-100 max-w-2xl text-lg font-medium">
              Immediate resources, relief center routing, and survival protocols.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <button 
              onClick={handleSOS}
              className={`px-8 py-4 rounded-full font-black text-lg transition shadow-2xl flex items-center ${sosSent ? 'bg-green-500 text-white' : 'bg-white text-red-600 hover:bg-red-100 hover:scale-105'}`}
            >
              {sosSent ? <><CheckCircle2 className="mr-2"/> LOCATION SENT TO NDRF</> : <><Activity className="mr-2 animate-ping"/> BROADCAST SOS TO NDRF</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column: Map & Hotlines */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Nearest Relief Center Map */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center text-gray-900"><Navigation className="mr-2 text-blue-500"/> Nearest Relief Centers & Hospitals</h2>
            <p className="text-sm text-gray-500 mb-4">Map displays active cyclone shelters (Green), hospitals (Red), and NDRF bases (Blue) near your current location.</p>
            <EmergencyMap />
          </div>

          {/* Quick Helplines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center shadow-sm">
              <Phone className="mx-auto text-red-500 mb-2" size={32} />
              <h3 className="font-bold text-gray-700">NDRF Control Room</h3>
              <div className="text-3xl font-black text-red-600 mt-1">9711077372</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center shadow-sm">
              <ShieldAlert className="mx-auto text-blue-500 mb-2" size={32} />
              <h3 className="font-bold text-gray-700">Police Assistance</h3>
              <div className="text-3xl font-black text-blue-600 mt-1">112</div>
            </div>
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center shadow-sm">
              <Activity className="mx-auto text-green-500 mb-2" size={32} />
              <h3 className="font-bold text-gray-700">Ambulance</h3>
              <div className="text-3xl font-black text-green-600 mt-1">108</div>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Audio & Offline Protocols */}
        <div className="space-y-6">
          
          {/* Audio Instructions (Bhashini Mock) */}
          <div className="bg-[#0f1c3d] rounded-xl p-6 shadow-lg border border-[#1e3a68] text-white">
            <h2 className="text-lg font-bold mb-2 flex items-center text-blue-300">
              <Volume2 className="mr-2"/> Audio Survival Guides
            </h2>
            <p className="text-xs text-gray-300 mb-4">Powered by Bhashini Multilingual API</p>
            
            <div className="space-y-3">
              <select className="w-full bg-white/10 border border-white/20 p-2 rounded text-white text-sm focus:outline-none">
                <option value="hi" className="text-black">Hindi (हिन्दी)</option>
                <option value="or" className="text-black">Odia (ଓଡ଼ିଆ)</option>
                <option value="mr" className="text-black">Marathi (मराठी)</option>
                <option value="en" className="text-black">English</option>
              </select>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded flex items-center justify-center transition">
                ▶ Play Flood Instructions
              </button>
            </div>
          </div>

          {/* Offline Survival Protocols Accordion */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 p-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800">Offline Survival Protocols</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {protocols.map((protocol) => (
                <div key={protocol.id} className="bg-white">
                  <button 
                    onClick={() => setExpandedProtocol(expandedProtocol === protocol.id ? null : protocol.id)}
                    className="w-full text-left p-4 font-bold text-sm text-gray-700 hover:bg-gray-50 flex justify-between items-center transition"
                  >
                    {protocol.title}
                    <ChevronDown size={16} className={`transition-transform ${expandedProtocol === protocol.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedProtocol === protocol.id && (
                    <div className="p-4 bg-gray-50 text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                      {protocol.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
