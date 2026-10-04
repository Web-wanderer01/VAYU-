'use client';
import { useState } from 'react';
import { CloudRain, Wind, AlertTriangle, Thermometer, Navigation, Activity, Target, ShieldAlert, CheckCircle, Droplets, Map, ChevronRight, Mic, Smartphone, Zap, Globe, Users } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the map to avoid SSR issues
const MapLoader = dynamic(() => import('@/components/MapLoader'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState('Agriculture');
  const tabs = ["Agriculture", "Aviation", "Marine", "Smart City"];

  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* 1. Hero Section (Clean Navy) */}
      <section className="relative w-full bg-gradient-to-b from-[#0f1c3d] to-[#1e3a8a] overflow-hidden text-white pt-20 pb-28 px-4">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-block bg-white/10 border border-white/20 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 flex items-center shadow-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2"></span>
            WeatherGPT Core v2.4 Active
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl tracking-tight drop-shadow-md">
            Next-Generation <span className="text-cyan-400">Meteorological Intelligence</span> for India
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mb-10 font-medium leading-relaxed drop-shadow-sm">
            Integrating numerical weather prediction models (GFS/WRF) with advanced Large Language Models. Delivering hyper-local, multilingual, conversational disaster intelligence to farmers, aviation, and emergency responders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
             <Link href="/analytics" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center text-white">
               <Activity className="mr-2" size={20}/> View Analytics Model
             </Link>
             <Link href="/gis-mapping" className="bg-white/15 hover:bg-white/25 border border-white/30 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-md transition-all flex items-center justify-center text-white shadow-lg">
               <Globe className="mr-2" size={20}/> Open GIS Command
             </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
             <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
               <Zap size={28}/>
             </div>
             <h3 className="font-bold text-gray-900 mb-2">Real-Time Ingestion</h3>
             <p className="text-sm text-gray-500">Processing live telemetry via WIS2.0 and MQTT WebSockets directly from IMD sensors.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
             <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
               <Mic size={28}/>
             </div>
             <h3 className="font-bold text-gray-900 mb-2">Voice & LLM Queries</h3>
             <p className="text-sm text-gray-500">Ask WeatherGPT natural language questions about local forecasts and receive expert-level answers.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
             <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
               <Smartphone size={28}/>
             </div>
             <h3 className="font-bold text-gray-900 mb-2">Multilingual SMS</h3>
             <p className="text-sm text-gray-500">Instant translations of severe alerts sent via SMS/WhatsApp to rural areas using Bhashini AI.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300 border-b-4 border-b-red-500">
             <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4">
               <ShieldAlert size={28}/>
             </div>
             <h3 className="font-bold text-gray-900 mb-2">Disaster Early Warning</h3>
             <p className="text-sm text-gray-500">Proactive hazard detection integrating Sachet and NDMA data for rapid evacuation routing.</p>
          </div>

        </div>
      </section>

      {/* 3. Live Impact Metrics */}
      <section className="max-w-7xl mx-auto w-full px-4 mt-16">
        <div className="bg-gradient-to-r from-[#0f1c3d] to-[#1e3a8a] rounded-2xl p-8 shadow-xl text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/20">
          <div>
            <Target className="mx-auto mb-3 text-cyan-400" size={36} />
            <div className="text-4xl font-black">763</div>
            <div className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Districts Monitored</div>
          </div>
          <div>
            <Activity className="mx-auto mb-3 text-cyan-400" size={36} />
            <div className="text-4xl font-black">12.4M</div>
            <div className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Queries Processed</div>
          </div>
          <div>
            <Globe className="mx-auto mb-3 text-cyan-400" size={36} />
            <div className="text-4xl font-black">14</div>
            <div className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Languages Supported</div>
          </div>
          <div>
            <CheckCircle className="mx-auto mb-3 text-green-400" size={36} />
            <div className="text-4xl font-black text-green-400">87.4%</div>
            <div className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Forecast Accuracy</div>
          </div>
        </div>
      </section>

      {/* 4. Main Content Area: Map & Interactive Dashboard */}
      <section className="w-full max-w-7xl mx-auto mt-16 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: India Map & Weather Conditions */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-4 pb-0">
               <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Decision Support System View</h3>
               <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-[-1px]">
                 {tabs.map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-5 py-3 font-bold text-sm rounded-t-lg transition ${activeTab === tab ? 'bg-white text-blue-700 border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200 border border-transparent'}`}
                   >
                     {tab}
                   </button>
                 ))}
               </div>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Current Weather Side */}
                <div className="flex flex-col relative">
                  <h3 className="text-center font-bold text-blue-600 tracking-widest uppercase mb-2">Current Weather</h3>
                  <div className="w-full h-[400px] rounded-xl border border-gray-200 relative overflow-hidden z-0 shadow-inner bg-blue-50">
                    <MapLoader height="100%" />
                    
                    {/* Floating Weather Widget */}
                    <div className="absolute bottom-2 left-2 right-2 bg-[#1e2a4a] text-white p-3 rounded-lg shadow-lg z-[1000] text-xs">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-sm">NEW DELHI-SAFDARJUNG</h4>
                         <div className="flex flex-col items-end space-y-1">
                            <span className="text-gray-300">Haze â˜ï¸</span>
                            <span className="bg-purple-500/30 text-purple-200 border border-purple-500/50 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">Regime: Active</span>
                            <span className="bg-red-500/30 text-red-200 border border-red-500/50 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">Heavy Rain Prob: 78% (DEMO)</span>
                         </div>
                      </div>
                      <div className="flex space-x-4 mb-2">
                         <span>ðŸŒ¡ï¸ 28.6Â°C</span>
                         <span>Feel Like 31.7Â°C</span>
                         <span>ðŸ’§ 69%</span>
                      </div>
                      <div className="text-gray-300 mb-2 font-bold text-green-400">ðŸ’¨ Bias-Corrected NWP Output</div>
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-gray-400 mt-2 border-t border-white/20 pt-2">
                         <div><div className="font-bold text-white mb-1">Sunrise</div>06:15 (IST)</div>
                         <div><div className="font-bold text-white mb-1">Sunset</div>18:06 (IST)</div>
                         <div><div className="font-bold text-white mb-1">Moonrise</div>23:27 (IST)</div>
                         <div><div className="font-bold text-white mb-1">Moonset</div>13:09 (IST)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Satellite Side */}
                <div className="flex flex-col">
                  <div className="flex w-full mb-2 border-b border-gray-200">
                     <button className="flex-1 py-2 text-center font-bold text-blue-600 border-b-2 border-blue-600 bg-white">SATELLITE</button>
                     <button className="flex-1 py-2 text-center font-bold text-blue-400 hover:text-blue-600 bg-gray-50">RADAR</button>
                     <button className="flex-1 py-2 text-center font-bold text-blue-400 hover:text-blue-600 bg-gray-50">LIGHTNING</button>
                  </div>
                  <h3 className="text-center font-bold text-blue-600 tracking-widest uppercase mb-2 text-[10px]">SATELLITE</h3>
                  <div className="w-full h-[368px] rounded-xl border border-gray-200 overflow-hidden relative bg-black">
                     <div className="absolute top-2 left-2 right-2 bg-black/80 text-green-400 p-2 text-[8px] font-mono leading-tight z-10 rounded border border-gray-700">
                        <div>INSAT-3DS IMG, Thermal Infrared1 Count @ 10.83 Î¼m</div>
                        <div>GMT: 03-10-2026/(1600-1627) IST: 03-10-2026/(2130-2157)</div>
                     </div>
                     {/* Simulating the satellite map */}
                     <div className="w-full h-full opacity-70 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Clouds_over_the_Atlantic_Ocean.jpg')] bg-cover bg-center grayscale mix-blend-screen"></div>
                  </div>
                </div>
                
              </div>
          </div>

        </div>

        {/* Right Col: Alerts & Integrations */}
        <div className="flex flex-col space-y-6">
          
          {/* Alert Section */}
          <div className="bg-gradient-to-b from-red-50 to-white rounded-2xl p-6 border border-red-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-black text-red-700 mb-6 flex items-center">
              <AlertTriangle className="mr-2" /> Extreme Weather Alerts
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-md">
                <div className="flex justify-between items-start">
                   <p className="text-sm font-black text-gray-900">Cyclone Warning</p>
                   <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-1 rounded">RED ALERT</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Expected landfall near Odisha coast by evening. Wind speeds exceeding 120kmph. (Simulated Demo Event)</p>
                <Link href="/alerts" className="text-xs font-bold text-blue-600 mt-3 inline-flex items-center hover:underline">View details <ChevronRight size={12}/></Link>
              </div>

              <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-md">
                <div className="flex justify-between items-start">
                   <p className="text-sm font-black text-gray-900">Flash Flood</p>
                   <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded">ORANGE ALERT</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Severe waterlogging predicted in Mumbai low-lying areas. Avoid travel.</p>
              </div>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">System Integration Health</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div><span className="text-sm font-bold text-gray-700">IMD AWS Network</span></div>
                   <span className="text-xs text-green-600 font-bold">100% UP</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div><span className="text-sm font-bold text-gray-700">Bhashini NLP</span></div>
                   <span className="text-xs text-green-600 font-bold">100% UP</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div><span className="text-sm font-bold text-gray-700">NDMA / Sachet</span></div>
                   <span className="text-xs text-green-600 font-bold">100% UP</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div><span className="text-sm font-bold text-gray-700">WeatherGPT LLM Core</span></div>
                   <span className="text-xs text-green-600 font-bold">100% UP</span>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. "Data Partners & Integrations" Logo Band */}
      <section className="w-full bg-white border-y border-gray-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Developed with cutting-edge technology & APIs</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition duration-500">
             <div className="text-2xl font-black text-gray-800 flex items-center"><Globe className="mr-2"/> ISRO</div>
             <div className="text-2xl font-black text-gray-800">NDMA</div>
             <div className="text-2xl font-black text-gray-800">SACHET</div>
             <div className="text-2xl font-black text-gray-800">API SETU</div>
             <div className="text-2xl font-black text-gray-800">BHASHINI</div>
             <div className="text-2xl font-black text-gray-800">IMD</div>
          </div>
        </div>
      </section>

    </div>
  );
}




