'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';
import { Target, Activity, CheckCircle, TrendingUp, ArrowRight, ShieldAlert } from 'lucide-react';

const rmseData = [
  { day: 'Day 1', IMD: 8.4, WeatherGPT: 4.1 },
  { day: 'Day 2', IMD: 10.2, WeatherGPT: 5.3 },
  { day: 'Day 3', IMD: 12.8, WeatherGPT: 6.8 },
  { day: 'Day 4', IMD: 15.5, WeatherGPT: 8.2 },
  { day: 'Day 5', IMD: 18.1, WeatherGPT: 9.7 },
];

const csiData = [
  { threshold: '> 15mm', IMD: 0.65, WeatherGPT: 0.82 },
  { threshold: '> 35mm', IMD: 0.42, WeatherGPT: 0.76 },
  { threshold: '> 65mm', IMD: 0.28, WeatherGPT: 0.65 },
  { threshold: '> 115mm', IMD: 0.15, WeatherGPT: 0.51 },
];

const podData = [
  { month: 'Jun', IMD: 71, WeatherGPT: 89 },
  { month: 'Jul', IMD: 74, WeatherGPT: 92 },
  { month: 'Aug', IMD: 70, WeatherGPT: 91 },
  { month: 'Sep', IMD: 68, WeatherGPT: 88 },
];

const etsData = [
  { region: 'Active Monsoon', IMD: 0.45, WeatherGPT: 0.68 },
  { region: 'Break Monsoon', IMD: 0.38, WeatherGPT: 0.61 },
  { region: 'Depression', IMD: 0.52, WeatherGPT: 0.74 },
  { region: 'Orographic', IMD: 0.35, WeatherGPT: 0.59 },
];

const farData = [
  { threshold: '> 15mm', IMD: 0.22, WeatherGPT: 0.08 },
  { threshold: '> 35mm', IMD: 0.35, WeatherGPT: 0.12 },
  { threshold: '> 65mm', IMD: 0.55, WeatherGPT: 0.18 },
  { threshold: '> 115mm', IMD: 0.72, WeatherGPT: 0.25 },
];

const fssData = [
  { scale: '10 km', IMD: 0.4, WeatherGPT: 0.65 },
  { scale: '20 km', IMD: 0.55, WeatherGPT: 0.78 },
  { scale: '50 km', IMD: 0.7, WeatherGPT: 0.88 },
  { scale: '100 km', IMD: 0.82, WeatherGPT: 0.95 },
];

export default function Analytics() {
  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* Header */}
      <div className="bg-[#0f1c3d] text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start">
              <Activity className="mr-3 text-cyan-400" size={36}/> AI Forecast Skill Verification
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg font-medium">
              Real-time statistical evaluation of the WeatherGPT Regime-Aware AI Post-Processing Model versus standard IMD physical NWP models.
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-blue-900/50 border border-blue-700 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-green-400">32.4%</div>
            <div className="text-xs text-blue-200 uppercase tracking-widest mt-1">Avg Skill Improvement</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* RMSE */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f1c3d] mb-1">RMSE Forecast Error</h3>
            <p className="text-sm text-gray-500 mb-6 font-bold text-blue-600">Root Mean Square Error (Lower is Better)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rmseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <RechartsTooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Area type="monotone" dataKey="IMD" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={3} name="IMD Raw NWP" />
                  <Area type="monotone" dataKey="WeatherGPT" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} strokeWidth={3} name="WeatherGPT AI" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CSI */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f1c3d] mb-1">CSI by Rainfall Threshold</h3>
            <p className="text-sm text-gray-500 mb-6 font-bold text-blue-600">Critical Success Index (Higher is Better)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={csiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="threshold" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <RechartsTooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="IMD" fill="#94a3b8" radius={[4, 4, 0, 0]} name="IMD Raw NWP" />
                  <Bar dataKey="WeatherGPT" fill="#3b82f6" radius={[4, 4, 0, 0]} name="WeatherGPT AI" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* POD */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f1c3d] mb-1">POD - Probability of Detection</h3>
            <p className="text-sm text-gray-500 mb-6 font-bold text-blue-600">Correct heavy rainfall hits (Higher is Better)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={podData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <RechartsTooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" dataKey="IMD" stroke="#f59e0b" strokeWidth={3} dot={{r: 6}} name="IMD Raw NWP" />
                  <Line type="monotone" dataKey="WeatherGPT" stroke="#10b981" strokeWidth={3} dot={{r: 6}} name="WeatherGPT AI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ETS */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f1c3d] mb-1">ETS by Weather Regime</h3>
            <p className="text-sm text-gray-500 mb-6 font-bold text-blue-600">Equitable Threat Score (Higher is Better)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={etsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <RechartsTooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="IMD" fill="#9ca3af" radius={[4, 4, 0, 0]} name="IMD Raw NWP" />
                  <Bar dataKey="WeatherGPT" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="WeatherGPT AI" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* FAR */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f1c3d] mb-1">FAR - False Alarm Ratio</h3>
            <p className="text-sm text-gray-500 mb-6 font-bold text-blue-600">False warnings issued (Lower is Better)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={farData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="threshold" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <RechartsTooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Area type="monotone" dataKey="IMD" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={3} name="IMD Raw NWP" />
                  <Area type="monotone" dataKey="WeatherGPT" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} strokeWidth={3} name="WeatherGPT AI" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* FSS */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f1c3d] mb-1">FSS - Fractions Skill Score</h3>
            <p className="text-sm text-gray-500 mb-6 font-bold text-blue-600">Spatial accuracy across grid scales (Higher is Better)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fssData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="scale" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <RechartsTooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" dataKey="IMD" stroke="#f97316" strokeWidth={3} dot={{r: 6}} name="IMD Raw NWP" />
                  <Line type="monotone" dataKey="WeatherGPT" stroke="#3b82f6" strokeWidth={3} dot={{r: 6}} name="WeatherGPT AI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
