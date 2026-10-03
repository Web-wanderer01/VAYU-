'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, MapPin, Phone, Mail, User } from 'lucide-react';

export default function Registration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call and saving to local/session storage
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
          <ShieldAlert size={32} />
        </div>
        <h1 className="text-4xl font-black text-[#0f1c3d]">Citizen Registration Portal</h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Register to receive highly accurate, AI-processed early active alerts before a disaster strikes. 
          Your location data ensures warnings are hyper-local and regime-aware.
        </p>
      </div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Personal Details */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg border-b pb-2 text-gray-800">Personal Details</h3>
              
              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><User size={16} className="mr-2"/> Full Name</label>
                <input required type="text" placeholder="e.g. Rahul Sharma" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><Phone size={16} className="mr-2"/> Mobile Number</label>
                <div className="flex">
                  <span className="bg-gray-100 border border-gray-200 border-r-0 text-gray-500 px-4 py-3 rounded-l-lg font-medium">+91</span>
                  <input required type="tel" pattern="[0-9]{10}" placeholder="10-digit number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><Mail size={16} className="mr-2"/> Email Address</label>
                <input required type="email" placeholder="rahul@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              </div>
            </div>

            {/* Location & Persona */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg border-b pb-2 text-gray-800">Location & Alerts</h3>
              
              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><MapPin size={16} className="mr-2"/> State</label>
                <select required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 transition cursor-pointer">
                   <option value="">Select State...</option>
                   <option value="Odisha">Odisha</option>
                   <option value="Maharashtra">Maharashtra</option>
                   <option value="Delhi">Delhi</option>
                   <option value="Kerala">Kerala</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><MapPin size={16} className="mr-2"/> District / City</label>
                <input required type="text" placeholder="e.g. Bhubaneswar" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-sm mb-2">Primary Profile (Persona)</label>
                <select required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 transition cursor-pointer">
                   <option value="citizen">Standard Citizen</option>
                   <option value="farmer">Farmer / Agriculture</option>
                   <option value="aviation">Aviation / Marine</option>
                   <option value="disaster_management">Disaster Management Official</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">This customizes your dashboard widgets.</p>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto px-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? "Registering onto VAYU Network..." : "Complete Registration & Setup Alerts"}
            </button>
            <p className="text-xs text-gray-400 mt-4 text-center md:text-left">By registering, you consent to receive emergency warnings via SMS and IVR calls during life-threatening events.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
