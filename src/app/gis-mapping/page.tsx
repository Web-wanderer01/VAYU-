import dynamic from 'next/dynamic';

const GisMapComponent = dynamic(() => import('@/components/GisMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[calc(100vh-64px)] w-full bg-[#0a1128] flex flex-col items-center justify-center text-cyan-500 font-bold tracking-widest uppercase">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      Initializing VAYU GIS Engine...
    </div>
  )
});

export default function GISMapping() {
  return (
    // We remove the max-w container and padding to make it truly edge-to-edge
    <div className="w-full bg-[#0a1128]">
      <GisMapComponent />
    </div>
  );
}
