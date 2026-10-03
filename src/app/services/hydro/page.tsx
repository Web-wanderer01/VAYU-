import { ArrowLeft, CheckCircle, FileText, Database } from 'lucide-react';
import Link from 'next/link';

export default function Hydro() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6">
          <ArrowLeft size={16} className="mr-2"/> Back to Home
        </Link>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-[#0f1c3d] p-8 text-white">
            <h1 className="text-3xl font-black">Hydrometeorological Services</h1>
            <p className="text-blue-200 mt-2">Official Meteorological Division</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Service</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hydrometeorological Services provide critical data on rainfall, river levels, and flood forecasting. We monitor the hydrological cycle to support water resource management and disaster mitigation across the country.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-3 shrink-0" size={20}/>
                    <div>
                      <h4 className="font-bold text-gray-800">Real-time Data Integration</h4>
                      <p className="text-sm text-gray-600">Access live feeds directly from regional meteorological centers.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-3 shrink-0" size={20}/>
                    <div>
                      <h4 className="font-bold text-gray-800">AI-Powered Forecasting</h4>
                      <p className="text-sm text-gray-600">Utilizing advanced machine learning models for regime-aware corrections.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center"><FileText size={18} className="mr-2"/> Resources</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-blue-600 hover:underline text-sm font-semibold flex items-center"><Database size={14} className="mr-2"/> Daily Reports</Link></li>
                  <li><Link href="#" className="text-blue-600 hover:underline text-sm font-semibold flex items-center"><Database size={14} className="mr-2"/> Historical Archives</Link></li>
                  <li><Link href="#" className="text-blue-600 hover:underline text-sm font-semibold flex items-center"><Database size={14} className="mr-2"/> Division Contacts</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
