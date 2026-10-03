'use client';
import { useState } from 'react';
import { Truck, ShieldCheck, Activity, Users, Map, Video, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function Operations() {
  const [activeTab, setActiveTab] = useState('deployments');

  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* Header */}
      <div className="bg-[#0f1c3d] text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start">
              <Truck className="mr-3 text-blue-400" size={36}/> Logistics & Operations
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg">
              NDRF resource allocation and active deployment tracking, optimized by VAYU AI severity predictions.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-700 text-center">
              <div className="text-3xl font-black text-green-400">24</div>
              <div className="text-xs text-gray-300 uppercase tracking-widest mt-1">Active Teams</div>
            </div>
            <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-700 text-center">
              <div className="text-3xl font-black text-yellow-400">12k</div>
              <div className="text-xs text-gray-300 uppercase tracking-widest mt-1">Rations</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Deployments Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#0f1c3d] flex items-center"><ShieldCheck className="mr-2 text-green-600"/> Tactical Deployments</h2>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <Activity size={12} className="mr-1 animate-pulse"/> LIVE SYNC
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="p-4 font-bold">Unit / Battalion</th>
                    <th className="p-4 font-bold">Location</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Personnel</th>
                    <th className="p-4 font-bold">AI Suggestion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-900">NDRF Battalion 4</td>
                    <td className="p-4 flex items-center"><Map size={14} className="mr-2 text-gray-400"/> Odisha Coast</td>
                    <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">On Standby</span></td>
                    <td className="p-4 flex items-center"><Users size={14} className="mr-2"/> 120</td>
                    <td className="p-4 text-xs font-medium text-red-600">Move 5km inland (Tidal surge risk)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-900">Medical Team Alpha</td>
                    <td className="p-4 flex items-center"><Map size={14} className="mr-2 text-gray-400"/> Mumbai Suburbs</td>
                    <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Deployed</span></td>
                    <td className="p-4 flex items-center"><Users size={14} className="mr-2"/> 45</td>
                    <td className="p-4 text-xs font-medium text-gray-500">Optimal position. Hold.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-900">SDRF Unit 9</td>
                    <td className="p-4 flex items-center"><Map size={14} className="mr-2 text-gray-400"/> Pune District</td>
                    <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">En Route</span></td>
                    <td className="p-4 flex items-center"><Users size={14} className="mr-2"/> 80</td>
                    <td className="p-4 text-xs font-medium text-orange-600">Reroute via NH-4 (Flash flood on primary)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Resource Allocation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-[#0f1c3d] mb-6 flex items-center">
               <AlertOctagon className="mr-2 text-orange-500"/> Resource Allocation vs AI Predicted Need
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                  <span>Inflatable Boats (Coastal Odisha)</span>
                  <span className="text-red-500">Deficit: 15 units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                  <div className="bg-blue-500 h-3" style={{ width: '60%' }}></div>
                  <div className="bg-red-200 h-3" style={{ width: '40%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">VAYU AI predicts 400 boats needed based on expected waterlogging depth. Currently 240 deployed.</p>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                  <span>Medical Kits (Mumbai)</span>
                  <span className="text-green-600">Sufficient</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                  <div className="bg-green-500 h-3" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Feeds */}
        <div className="space-y-6">
          
          {/* Drone/Satellite Feed Mock */}
          <div className="bg-[#0a1128] rounded-xl shadow-lg border border-gray-800 overflow-hidden text-white">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#121b36]">
              <h2 className="font-bold flex items-center text-sm text-cyan-400"><Video size={16} className="mr-2 animate-pulse"/> Live UAV Feed</h2>
              <span className="text-[10px] bg-red-600 px-2 py-1 rounded font-bold uppercase tracking-wider animate-pulse">Rec</span>
            </div>
            <div className="h-48 bg-gray-900 relative overflow-hidden flex items-center justify-center">
               {/* Simulated drone crosshairs/UI */}
               <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none"></div>
               <div className="w-16 h-16 border-2 border-green-500/50 rounded-full flex items-center justify-center absolute">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               </div>
               <div className="absolute top-2 right-2 text-[10px] text-green-500 font-mono text-right">
                 ALT: 124m<br/>
                 SPD: 12km/h
               </div>
               <div className="absolute bottom-2 left-2 text-[10px] text-green-500 font-mono">
                 TARGET: ODISHA_COAST_S1<br/>
                 LAT: 19.8135 LON: 85.8312
               </div>
               {/* Background map static image for drone simulation */}
               <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: 'url(https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/13/3663/5895)' }}></div>
            </div>
            <div className="p-4 bg-[#0a1128] text-xs text-gray-400">
               Direct feed from NDRF Recon Drone Alpha. Monitoring tidal surge levels for VAYU model validation.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
