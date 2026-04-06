// AdSense広告プレースホルダー
// 実運用時はGoogle AdSenseのスクリプトタグに置き換えてください
export default function AdBanner({ label = '広告' }: { label?: string }) {
  return (
    <div className="w-full bg-gray-900 border border-dashed border-gray-700 rounded-lg flex items-center justify-center py-6 text-gray-600 text-xs">
      {label} (Google AdSense)
    </div>
  );
}
