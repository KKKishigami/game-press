export const runtime = 'edge';

import type { Metadata } from 'next';
import DiagnosisQuiz from '@/components/diagnosis/DiagnosisQuiz';

export const metadata: Metadata = {
  title: 'ゲームタイプ診断',
  description: 'あなたのゲームスタイルを16タイプで診断！相性も一緒にチェック。20問の質問に答えるだけ！',
};

export default function DiagnosisPage() {
  return <DiagnosisQuiz />;
}
