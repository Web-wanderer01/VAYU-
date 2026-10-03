'use client';
import { useState, useEffect } from 'react';
import { Camera, MapPin, UploadCloud, AlertTriangle, Send, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export default function FieldReport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coordinates, setCoordinates] = useState<string>('Acquiring GPS...');

  useEffect(() => {
    // Simulate getting GPS
    setTimeout(() => {
      setCoordinates('Lat: 20.296, Lon: 85.824 (Accuracy: 4m)');
    }, 2000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start">
              <ShieldAlert className="mr-3 text-white" size={36}/> Ground Truth Field Report
            </h1>
            <p className="text-red-100 max-w-2xl text-lg font-medium">
              Authorized personnel only. Data submitted here actively fine-tunes the VAYU AI prediction models.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column: Assessment Form */}
        <div className="lg:col-span-2">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Report Synced to VAYU</h2>
                <p className="text-gray-500">Your ground truth data is now updating the AI models for this regime.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold">Submit Another Report</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Auto GPS */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center text-blue-800 font-bold text-sm">
                    <MapPin className="mr-2 text-blue-600" size={18}/> 
                    Auto-Captured Location
                  </div>
                  <div className="font-mono text-xs text-blue-600 bg-white px-2 py-1 rounded border border-blue-200">
                    {coordinates}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2">Primary Regime / Condition</label>
                    <select required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
                       <option value="">Select current state...</option>
                       <option>Flash Flood</option>
                       <option>Extreme Wind / Cyclone</option>
                       <option>Waterlogging (Urban)</option>
                       <option>Landslide / Mudslide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2">Water Depth (if applicable)</label>
                    <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
                       <option>None / N/A</option>
                       <option>&lt; 1 Foot</option>
                       <option>1 - 3 Feet</option>
                       <option>&gt; 3 Feet (Severe)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold text-sm mb-2">Damage Assessment & Casualties</label>
                  <textarea required rows={4} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Describe infrastructure damage, road blocks, power outages, etc..."></textarea>
                </div>

                {/* Photo Upload Mock */}
                <div>
                  <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><Camera size={16} className="mr-2"/> Upload Visual Evidence</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                    <UploadCloud className="mx-auto text-gray-400 mb-3" size={32}/>
                    <p className="text-sm font-bold text-gray-600">Click to upload photos or drone imagery</p>
                    <p className="text-xs text-gray-400 mt-1">Images are analyzed by VAYU Computer Vision</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? <><Activity className="animate-spin mr-2"/> Syncing to AI Model...</> : <><Send size={18} className="mr-2"/> Submit Official Ground Truth</>}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Right Sidebar: AI Sync Status */}
        <div className="space-y-6">
          
          <div className="bg-[#0f1c3d] rounded-xl p-6 shadow-lg border border-[#1e3a68] text-white">
            <h2 className="text-lg font-bold mb-4 flex items-center text-cyan-400">
              <Cpu className="mr-2"/> VAYU ML Sync Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] mr-3"></div>
                <div>
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Model Status</p>
                  <p className="text-sm font-medium mt-1">Accepting real-time feedback for Active Monsoon Regime.</p>
                </div>
              </div>
              <div className="flex items-start pt-3 border-t border-white/10">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] mr-3"></div>
                <div>
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Last Global Update</p>
                  <p className="text-sm font-medium mt-1">Weights updated 14 mins ago based on field data from District 4.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/40 rounded border border-blue-800">
              <p className="text-xs text-blue-200">
                <AlertTriangle size={12} className="inline mr-1 text-yellow-500"/> Your field reports are crucial. They correct false-positives in satellite data and train the AI for better future predictions.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
