export default function AdBanner({ label = '広告', height = 'h-20' }: { label?: string; height?: string }) {
  return (
    <div className={`w-full border border-dashed border-[#222] flex items-center justify-center ${height} text-[#333] text-xs font-bebas tracking-widest`}>
      {label.toUpperCase()} — GOOGLE ADSENSE
    </div>
  );
}
