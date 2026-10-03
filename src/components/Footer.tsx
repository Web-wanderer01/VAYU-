import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1c3d] text-gray-300 pt-12 pb-6 border-t border-gray-700 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Bio / About */}
        <div>
          <h3 className="text-xl font-black text-white mb-4 tracking-wide">WeatherGPT (वायु)</h3>
          <p className="text-sm leading-relaxed mb-4 text-gray-400">
            Regime-Aware AI Post-Processing of Monsoon Rainfall Forecasts. A modern platform for real-time weather analytics, emergency alerts, and predictive modeling for heavy rainfall events.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/dashboard" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> Citizen Dashboard</Link></li>
            <li><Link href="/analytics" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> Analytics Report</Link></li>
            <li><Link href="/gis-mapping" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> GIS Mapping</Link></li>
            <li><Link href="/emergency" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> Emergency</Link></li>
          </ul>
        </div>

        {/* Connections / External Portals */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Govt Integrations</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="https://sachet.ndma.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> Sachet Application</a></li>
            <li><a href="https://bhashini.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> Bhashini API</a></li>
            <li><a href="https://ndma.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> NDMA Portal</a></li>
            <li><a href="https://mausam.imd.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition flex items-center"><span className="text-blue-500 mr-2">›</span> IMD Mausam</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Contact</h3>
          <ul className="space-y-3 text-sm mb-6">
            <li className="flex items-start space-x-3">
              <MapPin size={16} className="text-blue-400 mt-1 shrink-0" />
              <span>Ministry of Earth Sciences, Prithvi Bhavan, New Delhi, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={16} className="text-blue-400 shrink-0" />
              <span>+91-11-24611524</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-blue-400 shrink-0" />
              <span>support@WeatherGPT.gov.in</span>
            </li>
          </ul>
        </div>

      </div>
      
      {/* Official Government Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-blue-400 transition">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400 transition">Copyright Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400 transition">Hyperlinking Policy</a>
            <span>|</span>
            <Link href="/screen-reader" className="hover:text-blue-400 transition">Accessibility Statement</Link>
          </div>

          <div className="text-center md:text-right">
            <p className="mb-1">This site is designed, developed and hosted by</p>
            <p className="font-bold text-gray-400">National Informatics Centre (NIC), Ministry of Electronics & IT</p>
            <p className="mt-2">&copy; {new Date().getFullYear()} Government of India. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
