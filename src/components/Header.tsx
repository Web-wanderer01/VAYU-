import Link from 'next/link';
import { User, ShieldAlert, ChevronDown, Globe } from 'lucide-react';
import TopBar from './TopBar';

export default function Header() {
  return (
    <header className="w-full flex flex-col font-sans shadow-lg z-40 relative">
      <TopBar />

      {/* Global Disclaimer Banner */}
      <div className="bg-red-600 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide flex justify-center items-center">
        <ShieldAlert size={14} className="mr-2" />
        DEMO / PROTOTYPE — Not an official Government of India website. Operations and alerts are simulated.
      </div>

      {/* Unified Main Header */}
      <div className="bg-gradient-to-r from-[#0a1128] via-[#0f1c3d] to-[#0a1128] text-white py-4 border-b-4 border-orange-500">
        <div className="max-w-[1400px] mx-auto w-full px-4 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left: Branding & Logos */}
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            {/* Emblem */}
            <div 
              className="w-10 h-14 bg-contain bg-no-repeat bg-center opacity-90 shrink-0" 
              style={{
                backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg')",
                filter: "invert(1) brightness(2)"
              }}
            ></div>
            
            <div className="flex flex-col justify-center border-l border-white/20 pl-4">
              <div className="text-[10px] text-gray-300 font-medium tracking-wide">
                भारत सरकार | Government of India <span className="mx-2 text-gray-500">•</span> Ministry of Earth Sciences
              </div>
              <div className="text-xs font-bold tracking-widest text-white mt-1 uppercase">
                National Weather Forecasting Centre
              </div>
              <div className="text-xl font-black tracking-wider mt-1 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                WEATHERGPT
              </div>
            </div>
          </div>
          
          {/* Right: Unified Navigation Links */}
          <div className="flex flex-wrap items-center justify-end gap-1 relative z-50 max-w-[60%]">
            <Link href="/" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
              Home
            </Link>
            
            {/* Services Dropdown (Hover) */}
            <div className="group relative">
              <button className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
                Services <ChevronDown size={14} className="ml-1"/>
              </button>
              <div className="absolute top-full left-0 mt-1 w-[350px] bg-white border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col z-[100] text-gray-800 rounded-lg overflow-hidden">
                <Link href="/services/hydro" className="px-4 py-3 text-xs font-semibold border-b border-gray-100 hover:bg-blue-50 transition uppercase">Hydrometeorological Services</Link>
                <Link href="/services/agriculture" className="px-4 py-3 text-xs font-semibold border-b border-gray-100 hover:bg-blue-50 transition uppercase">Met. Services for Agriculture</Link>
                <Link href="/services/aviation" className="px-4 py-3 text-xs font-semibold border-b border-gray-100 hover:bg-blue-50 transition uppercase">Met. Services for Civil Aviation</Link>
                <Link href="/services/satmet" className="px-4 py-3 text-xs font-semibold border-b border-gray-100 hover:bg-blue-50 transition uppercase">Satmet Services</Link>
                <Link href="/services/dwr" className="px-4 py-3 text-xs font-semibold hover:bg-blue-50 transition uppercase">IMD DWR Network</Link>
              </div>
            </div>

            <Link href="/departments" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
              Departments
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
              Contact
            </Link>
            
            <Link href="/dashboard" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
              Dashboard
            </Link>
            <Link href="/analytics" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
               Analytics
            </Link>
            <Link href="/gis-mapping" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
               GIS Map
            </Link>
            <Link href="/alerts" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
               Alerts
            </Link>
            <Link href="/operations" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
               Operations
            </Link>
            <Link href="/field-report" className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center">
               Ground Truth
            </Link>
            <Link href="/emergency" className="px-3 py-2 text-sm font-black rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white shadow-lg flex items-center ml-2 border border-red-500">
               🚨 EMERGENCY SOS
            </Link>

            {/* Language Toggle (Multilingual Support) */}
            <div className="group relative shrink-0 ml-1">
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Change Language">
                <Globe size={16} className="text-white" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col z-[100] text-gray-800 rounded-lg overflow-hidden">
                <Link href="?lang=en" className="px-4 py-2 text-xs font-bold hover:bg-blue-50 transition border-b border-gray-100">English</Link>
                <Link href="?lang=hi" className="px-4 py-2 text-xs font-bold hover:bg-blue-50 transition border-b border-gray-100">हिन्दी (Hindi)</Link>
                <Link href="?lang=or" className="px-4 py-2 text-xs font-bold hover:bg-blue-50 transition">ଓଡ଼ିଆ (Odia)</Link>
              </div>
            </div>

            {/* Profile / Settings */}
            <div className="flex items-center space-x-2 shrink-0 ml-1">
              <Link href="/dashboard" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="User Profile">
                <User size={16} className="text-cyan-400" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
