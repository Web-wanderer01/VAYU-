'use client';
import { useState } from 'react';
import { ShieldAlert, MapPin, PhoneCall, Building2, Crosshair, Users, Activity } from 'lucide-react';

export default function Emergency() {
  const [sosSent, setSosSent] = useState(false);

  const handleSOS = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  return (
    <div className="bg-[#060b19] min-h-[calc(100vh-100px)] w-full flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#0a1128] rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.2)] border border-red-900/50 p-6 md:p-10 relative overflow-hidden">
        
        {/* Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

        <div className="text-center relative z-10 mb-10">
          <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-5xl font-black text-white tracking-widest mb-2">EMERGENCY</h1>
          <p className="text-gray-400 text-lg">One-Tap Disaster Assistance</p>
        </div>

        {/* Huge Action Button */}
        <div className="relative z-10 mb-10">
          <button 
            onClick={handleSOS}
            className={`w-full py-6 rounded-2xl text-2xl font-black tracking-widest uppercase transition-all duration-300 shadow-2xl ${
              sosSent 
                ? 'bg-green-600 shadow-green-900/50 text-white scale-95' 
                : 'bg-red-600 hover:bg-red-500 shadow-red-900/50 text-white hover:scale-[1.02]'
            }`}
          >
            {sosSent ? '✓ LOCATION BROADCASTED' : 'I NEED HELP'}
          </button>
          {!sosSent && <p className="text-center text-xs text-gray-500 mt-3 font-bold uppercase tracking-widest">Broadcasts exact GPS coordinates to nearest NDRF unit</p>}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center transition group">
            <MapPin className="text-blue-400 mb-2 group-hover:scale-110 transition" size={28} />
            <span className="text-sm font-bold text-gray-300">Share Location</span>
          </button>
          
          <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center transition group">
            <Building2 className="text-green-400 mb-2 group-hover:scale-110 transition" size={28} />
            <span className="text-sm font-bold text-gray-300">Nearest Shelter</span>
          </button>

          <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center transition group">
            <Activity className="text-pink-400 mb-2 group-hover:scale-110 transition" size={28} />
            <span className="text-sm font-bold text-gray-300">Nearest Hospital</span>
          </button>

          <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center transition group">
            <ShieldAlert className="text-orange-400 mb-2 group-hover:scale-110 transition" size={28} />
            <span className="text-sm font-bold text-gray-300">Nearest Police</span>
          </button>
        </div>

        {/* Call Authorities */}
        <div className="mt-6 relative z-10">
          <button className="w-full bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/30 py-4 rounded-xl flex items-center justify-center transition">
            <Users className="text-blue-400 mr-3" size={24} />
            <span className="text-lg font-bold text-white tracking-widest">CONNECT TO SDRF / NDRF</span>
          </button>
        </div>
        
        {/* Standard Calls */}
        <div className="mt-4 flex space-x-4 relative z-10">
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 py-3 rounded-lg flex justify-center items-center font-bold text-gray-300 transition">
            <PhoneCall size={16} className="mr-2 text-red-500"/> 112
          </button>
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 py-3 rounded-lg flex justify-center items-center font-bold text-gray-300 transition">
            <PhoneCall size={16} className="mr-2 text-red-500"/> 1078
          </button>
        </div>
      </div>
    </div>
  );
}
