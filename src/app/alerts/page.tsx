'use client';
import { useState } from 'react';
import { AlertTriangle, Share2, Info, CheckCircle, ShieldAlert, Radio } from 'lucide-react';

const mockAlerts = [
  {
    id: 1,
    severity: 'red',
    title: 'Extreme Rainfall & Flash Flood Warning',
    location: 'Coastal Odisha & Jagatsinghpur',
    time: 'Issued: 15 mins ago',
    source: 'NDMA / Sachet',
    text: 'Extremely heavy rainfall (>200mm) expected in the next 12 hours. Immediate evacuation of low-lying coastal areas recommended.',
    aiInsight: 'VAYU AI Impact Prediction: 92% probability of severe waterlogging on NH-16. 85% risk of major crop damage in Kharif zones. Regime identified: Active Monsoon Surge.',
  },
  {
    id: 2,
    severity: 'orange',
    title: 'Severe Thunderstorm & Lightning',
    location: 'Mumbai Suburbs',
    time: 'Issued: 2 hours ago',
    source: 'IMD / API Setu',
    text: 'Severe thunderstorms with frequent lightning and gusty winds (40-50 kmph) highly likely.',
    aiInsight: 'VAYU AI Impact Prediction: High risk of power grid disruption in suburban sectors. Aviation delays expected. Regime identified: Pre-monsoon localized convective storm.',
  },
  {
    id: 3,
    severity: 'yellow',
    title: 'Heavy Rainfall Watch',
    location: 'Pune District',
    time: 'Issued: 5 hours ago',
    source: 'State DMA',
    text: 'Moderate to heavy rainfall expected over the next 24 hours. Commuters should remain cautious.',
    aiInsight: 'VAYU AI Impact Prediction: 60% probability of minor traffic disruptions. Soil moisture will reach optimal levels for sowing. Regime identified: Western Ghats Orographic.',
  },
];

export default function Alerts() {
  const [filter, setFilter] = useState('all');

  const filteredAlerts = mockAlerts.filter(a => filter === 'all' || a.severity === filter);

  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* Header */}
      <div className="bg-[#0f1c3d] text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start">
              <Radio className="mr-3 text-red-500 animate-pulse" size={36}/> Live Sachet Alerts
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg">
              Real-time disaster warnings powered by NDMA and enhanced with VAYU Regime-Aware AI insights.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        
        {/* Severity Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          <button onClick={() => setFilter('all')} className={`px-6 py-3 rounded-lg font-bold transition ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Alerts</button>
          <button onClick={() => setFilter('red')} className={`px-6 py-3 rounded-lg font-bold transition flex items-center ${filter === 'red' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2 border border-white"></div> Red (Extreme)
          </button>
          <button onClick={() => setFilter('orange')} className={`px-6 py-3 rounded-lg font-bold transition flex items-center ${filter === 'orange' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}>
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2 border border-white"></div> Orange (Severe)
          </button>
          <button onClick={() => setFilter('yellow')} className={`px-6 py-3 rounded-lg font-bold transition flex items-center ${filter === 'yellow' ? 'bg-yellow-400 text-black' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}>
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2 border border-white"></div> Yellow (Watch)
          </button>
        </div>

        {/* Alerts Feed */}
        <div className="space-y-6">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className="text-xl font-bold text-gray-700">No active alerts for this severity level.</h2>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={`bg-white rounded-xl shadow-md border-l-8 overflow-hidden ${alert.severity === 'red' ? 'border-red-600' : alert.severity === 'orange' ? 'border-orange-500' : 'border-yellow-400'}`}>
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      <div className={`p-2 rounded-full ${alert.severity === 'red' ? 'bg-red-100 text-red-600' : alert.severity === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900">{alert.title}</h2>
                        <p className="text-sm font-bold text-gray-500">{alert.location}</p>
                      </div>
                    </div>
                    
                    {/* Integration Badges */}
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded flex items-center">
                        <ShieldAlert size={12} className="mr-1"/> {alert.source}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 mb-6 font-medium">{alert.text}</p>

                  {/* VAYU AI Insights Block */}
                  <div className="bg-gradient-to-r from-[#0f1c3d] to-[#1e3a68] p-5 rounded-lg text-white mb-6 shadow-inner border border-blue-800">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-2 flex items-center">
                      <Info size={16} className="mr-2"/> VAYU AI Prediction Insights
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{alert.aiInsight}</p>
                  </div>

                  {/* Footer & Actions */}
                  <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-bold mb-4 md:mb-0">{alert.time}</p>
                    
                    <div className="flex space-x-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition text-sm">
                        <Share2 size={16} className="mr-2"/> WhatsApp
                      </button>
                      <button className="flex-1 md:flex-none flex items-center justify-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-bold transition text-sm">
                        <Share2 size={16} className="mr-2"/> Share to X
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
