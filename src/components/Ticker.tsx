export default function Ticker() {
  return (
    <div className="bg-white border-t-2 border-red-500 w-full flex items-center text-sm">
      <div className="bg-red-500 text-white font-bold px-4 py-2 uppercase whitespace-nowrap">
        CRITICAL
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="whitespace-nowrap animate-marquee text-red-600 font-medium px-4">
          CRITICAL (SIMULATION): Extreme rainfall and landslide risk. 185mm rainfall in 24h with saturated soil (95% - Demo Data). Evacuate low-lying settlements immediately.
        </div>
      </div>
      <div className="bg-white px-4 py-2 text-red-500 font-bold whitespace-nowrap border-l border-gray-200 cursor-pointer hover:bg-gray-50">
        View All &rarr;
      </div>
    </div>
  );
}

