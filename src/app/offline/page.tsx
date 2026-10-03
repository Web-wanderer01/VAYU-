import { WifiOff, ShieldAlert, CloudRain } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-red-200">
        <div className="bg-red-600 p-8 text-white text-center">
          <WifiOff size={48} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-2xl font-black mb-2">You are Offline</h1>
          <p className="text-red-100 text-sm">VAYU PWA Rural Resilience Mode</p>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            Don't worry! Your app is running in offline mode. Here are the last emergency alerts cached for your district before connection was lost:
          </p>
          
          <div className="space-y-3">
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg flex items-start">
              <ShieldAlert className="text-red-500 mr-3 shrink-0" size={20}/>
              <div>
                <h3 className="font-bold text-red-800 text-sm">RED ALERT: Flooding</h3>
                <p className="text-xs text-red-600 mt-1">High risk of coastal flooding expected in 4 hours. Move to safe shelters.</p>
              </div>
            </div>
            <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg flex items-start">
              <CloudRain className="text-orange-500 mr-3 shrink-0" size={20}/>
              <div>
                <h3 className="font-bold text-orange-800 text-sm">Heavy Rain Warning</h3>
                <p className="text-xs text-orange-600 mt-1">Intense orographic precipitation predicted tonight.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-bold text-sm transition">
              Retry Connection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
