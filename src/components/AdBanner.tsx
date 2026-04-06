export default function AdBanner({ label = '広告', height = 'h-20' }: { label?: string; height?: string }) {
  return (
    <div className={`w-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center ${height} text-gray-400 text-xs`}>
      {label} (Google AdSense)
    </div>
  );
}
