'use client';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg">
      <div className="text-gray-500 font-medium">Loading Interactive Map...</div>
    </div>
  )
});

export default function MapLoader({ zoom = 5, height = "500px" }: { zoom?: number, height?: string }) {
  return <MapComponent zoom={zoom} height={height} />;
}
