import { Link2 } from 'lucide-react';

export default function DepartmentsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 w-full relative overflow-hidden">
      
      {/* Background seal watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[600px] h-[600px] bg-contain bg-no-repeat bg-center" style={{backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg')"}}></div>

      <div className="max-w-7xl mx-auto px-4 bg-white shadow-lg p-10 border-t-4 border-red-600 relative z-10">
        <h1 className="text-2xl font-bold text-red-600 text-center mb-10 uppercase tracking-widest">Departmental Websites</h1>
        
        {/* Category: Centres */}
        <div className="mb-10">
          <h2 className="text-blue-800 font-bold text-lg mb-4">Centres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm text-blue-600">
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> भा. मौ. वि. वि. - राजभाषा पटल</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Climate Research & Services (CR&S), Pune</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Upper Air Instrument Division, New Delhi</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Central Aviation Meteorological Division</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Agriculture Meteorology Division, Pune</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> WMO - Regional Training Institute</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Specialized Meteorological Centre</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Positional Astronomy Centre, Kolkata</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Meteorological Watch Office, Kolkata</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Cyclone Warning Centre Visakhapatnam</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Data Service Portal</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> National Center for Seismology</div>
          </div>
        </div>

        {/* Category: Regional Meteorological Centres */}
        <div className="mb-10">
          <h2 className="text-blue-800 font-bold text-lg mb-4">Regional Meteorological Centres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm text-blue-600">
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Meteorological Centre, New Delhi</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Meteorological Centre, Guwahati</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Meteorological Centre, Chennai</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Meteorological Centre, Kolkata</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Meteorological Centre, Mumbai</div>
             <div className="flex items-start hover:underline cursor-pointer"><Link2 size={14} className="mr-2 mt-0.5 shrink-0"/> Regional Meteorological Centre, Nagpur</div>
          </div>
        </div>

      </div>
    </div>
  );
}
