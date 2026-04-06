export type TypeCode =
  | 'SARC' | 'SARG' | 'SAEC' | 'SAEG'
  | 'SDRC' | 'SDRG' | 'SDEC' | 'SDEG'
  | 'PARC' | 'PARG' | 'PAEC' | 'PAEG'
  | 'PDRC' | 'PDRG' | 'PDEC' | 'PDEG';

export interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  /** 0=ソロ/パーティ  1=攻撃/防衛  2=ストーリー/効率  3=カジュアル/ガチ */
  axis: 0 | 1 | 2 | 3;
}

export interface GameType {
  code: TypeCode;
  name: string;
  catchphrase: string;
  description: string;
  traits: string[];
  bestMatch: TypeCode;
  goodMatches: [TypeCode, TypeCode, TypeCode];
  rivalMatch: TypeCode;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  accentColor: string;
}

// ── helpers ────────────────────────────────────────────────────────────────
const PAIRS: [string, string][] = [['S', 'P'], ['A', 'D'], ['R', 'E'], ['C', 'G']];

function flipAxes(code: TypeCode, ...axes: number[]): TypeCode {
  return code
    .split('')
    .map((ch, i) =>
      axes.includes(i) ? (PAIRS[i][0] === ch ? PAIRS[i][1] : PAIRS[i][0]) : ch
    )
    .join('') as TypeCode;
}

// ── 20 questions (5 per axis, interleaved 0-1-2-3) ────────────────────────
export const questions: Question[] = [
  {
    id: 1, axis: 0,
    text: 'ボス攻略の前夜、あなたがすることは？',
    optionA: '一人で攻略情報を集め、完璧な作戦を頭の中で完成させる',
    optionB: 'フレンドに「明日ボス行かね？」とメッセージを送る',
  },
  {
    id: 2, axis: 1,
    text: 'RPGでキャラを作るとき、まず何に振る？',
    optionA: '攻撃力。敵をぶち倒せれば、それで十分だ',
    optionB: 'HP・防御力。死ななければ、いつかは勝てる',
  },
  {
    id: 3, axis: 2,
    text: 'RPGのサブクエスト、あなたはどう攻める？',
    optionA: '全部やる。この世界の隅々まで味わい尽くしたい',
    optionB: '経験値と報酬が美味しいものだけ厳選してこなす',
  },
  {
    id: 4, axis: 3,
    text: 'ゲームでミスをしたとき、あなたは？',
    optionA: '「まあいっか〜」と笑い飛ばして次へ進む',
    optionB: '悔しすぎてそのまま10分間、ミスの原因を徹底分析する',
  },
  {
    id: 5, axis: 0,
    text: 'オンラインゲームで見知らぬプレイヤーが目の前に現れた。あなたは？',
    optionA: '無視して自分のクエストに集中する',
    optionB: 'とりあえず手を振ってみる',
  },
  {
    id: 6, axis: 1,
    text: 'FPSでの立ち回りといえば？',
    optionA: '前線に突っ込んでキルを量産する、これが俺のスタイル',
    optionB: '後衛でエイムを磨き、仲間をサポートし続ける',
  },
  {
    id: 7, axis: 2,
    text: '新しいゲームを買ったら、最初にすることは？',
    optionA: 'オープニングをスキップせず、世界観にどっぷり浸かる',
    optionB: '最強ビルドを検索してから、最効率でゲームを始める',
  },
  {
    id: 8, axis: 3,
    text: '1日のゲームプレイ時間は？',
    optionA: '1〜2時間くらい。生活の合間に楽しむ程度',
    optionB: '最低でも4時間。ゲームこそが俺の生活だ',
  },
  {
    id: 9, axis: 0,
    text: 'MMORPGを始めたとき、一番先にやりたいことは？',
    optionA: 'まずソロでストーリーを進め、世界の雰囲気をつかむ',
    optionB: 'まずギルドを探して、誰かと一緒に冒険を始める',
  },
  {
    id: 10, axis: 1,
    text: '難しいボスに対するアプローチは？',
    optionA: '全力で殴り続け、圧倒的な火力でゴリ押す',
    optionB: 'パターンを完全に覚えて、安全に確実にダメージを積み上げる',
  },
  {
    id: 11, axis: 2,
    text: 'ゲームをする最大の目的は？',
    optionA: '感動できる物語や、美しい世界観に没入すること',
    optionB: '最強のキャラや装備を手に入れ、誰よりも強くなること',
  },
  {
    id: 12, axis: 3,
    text: 'ゲームの難易度設定は？',
    optionA: 'ノーマル〜イージー。楽しめればそれで十分',
    optionB: 'ハード以上一択。簡単なゲームをやる意味がわからない',
  },
  {
    id: 13, axis: 0,
    text: 'ゲームで最高の瞬間といえば？',
    optionA: '一人で積み重ねてきた努力が、ついに実を結んだ瞬間',
    optionB: 'チームの連携が爆発して、全員で歓声を上げた瞬間',
  },
  {
    id: 14, axis: 1,
    text: '敵に不意打ちされた！どうする？',
    optionA: '即座に反撃！こちらから全力でぶつかる',
    optionB: 'まず距離を取り、態勢を整えてから冷静に対処する',
  },
  {
    id: 15, axis: 2,
    text: 'ゲーム実況動画を選ぶなら？',
    optionA: '感動系・ストーリー重視の丁寧な実況が好き',
    optionB: '最速攻略・タイムアタック・最強ビルド検証が好き',
  },
  {
    id: 16, axis: 3,
    text: 'ゲームとの向き合い方は？',
    optionA: '趣味の一つ。程よく楽しみ、程よく休む',
    optionB: '人生の一部。誰よりも上手くなるまで諦めない',
  },
  {
    id: 17, axis: 0,
    text: 'チームデスマッチに誘われた。あなたの反応は？',
    optionA: '「ソロでやった方が強いし…」と断る',
    optionB: '「待ってた！絶対行く！」と即レス',
  },
  {
    id: 18, axis: 1,
    text: 'パーティの役割を選ぶなら？',
    optionA: 'アタッカー。俺が一番ダメージを叩き出す',
    optionB: 'タンク・ヒーラー。仲間を守ることが最優先だ',
  },
  {
    id: 19, axis: 2,
    text: 'ゲームエンディングを迎えたとき？',
    optionA: 'キャラたちへの感謝でじーんと胸が熱くなる',
    optionB: 'さっそくやり込み要素や次のゲームをチェックし始める',
  },
  {
    id: 20, axis: 3,
    text: '新キャラや大型パッチが来たとき？',
    optionA: '「へー面白そう」程度で、のんびり様子見',
    optionB: 'リリース直後にフル検証し、最適解を誰より早く出す',
  },
];

// ── type base data ─────────────────────────────────────────────────────────
type TypeBase = Omit<GameType, 'bestMatch' | 'goodMatches' | 'rivalMatch'>;

const typeBaseData: TypeBase[] = [
  {
    code: 'SARC',
    name: '気まぐれな一匹狼',
    catchphrase: '俺のペースで、俺の物語を生きる',
    description: '孤独を愛し、誰の指図も受けず、気の向くままにゲームの世界を旅する孤高の冒険者。急がず、焦らず、物語の一行一行を自分だけの感動として刻む。弱く見えて、実は誰よりも深い場所まで旅している。その背中に、伝説が宿る。',
    traits: ['マイペース最強', '感受性が豊か', '自由人', 'ソロプレイの達人', '物語に深く没入'],
    emoji: '🐺',
    colorFrom: '#c2410c', colorTo: '#7c2d12', accentColor: '#fb923c',
  },
  {
    code: 'SARG',
    name: '孤高の剣聖',
    catchphrase: '頂点は、孤独の先にある',
    description: '一切の妥協を許さない鋼鉄の意志。他者の声を遮断し、己の限界と向き合い続ける。何十回も死に、何百回も試行し、それでも前へ進む。その孤独な戦いの果てに、誰も到達できない極みが待っている。これが真の剣聖の道。',
    traits: ['不屈の精神', 'ストイックの権化', '孤高のプロ', 'リトライは娯楽', '完璧主義者'],
    emoji: '⚔️',
    colorFrom: '#991b1b', colorTo: '#3b0764', accentColor: '#fca5a5',
  },
  {
    code: 'SAEC',
    name: '無双の破壊者',
    catchphrase: '効率よく壊す、それが美学',
    description: 'ルールなど知ったことか。最も効率よく敵を殲滅する方法を、一人で実践し続ける自由な破壊者。物語より結果、雰囲気よりスペック。「最強になること」それだけが目的のシンプルにして最強の生き方。反省の文字は辞書にない。',
    traits: ['効率至上主義', '一人が最強', 'メタ研究家', '感情より数値', '時間を無駄にしない'],
    emoji: '💥',
    colorFrom: '#ea580c', colorTo: '#b45309', accentColor: '#fed7aa',
  },
  {
    code: 'SAEG',
    name: '虐殺マシーン',
    catchphrase: '感情は不要、計算のみが残る',
    description: '感情は死んだ。残るのは計算と最適化のみ。一人で、ガチで、効率よく、すべての障害を数字として処理する。人はこのタイプを「怖い」と言うが、本人はただゲームを楽しんでいるだけだ。最もゲームの神に近い存在。',
    traits: ['計算機の魂', '廃人レベルの集中力', '最適化の鬼', 'クールヘッド', '圧倒的な熱量'],
    emoji: '💀',
    colorFrom: '#1c1917', colorTo: '#7f1d1d', accentColor: '#dc2626',
  },
  {
    code: 'SDRC',
    name: '静かなる観察者',
    catchphrase: '世界の美しさは、急がない者だけに見える',
    description: '世界の細部に宿る美しさを、誰より深く見つめる者。急がず、焦らず、敵の動きを読みながらストーリーの一行一行を心に刻む。その静けさの中に、無限の洞察と感動が眠っている。孤独に見えて、世界で一番豊かな旅人。',
    traits: ['観察眼が鋭い', '世界観マニア', '慎重派', 'ゆっくり丁寧', '深読みの天才'],
    emoji: '🔮',
    colorFrom: '#0c4a6e', colorTo: '#1e3a5f', accentColor: '#7dd3fc',
  },
  {
    code: 'SDRG',
    name: '沈黙の戦術家',
    catchphrase: '一手に全てを込めろ',
    description: '口数は少なく、動きは完璧。敵のすべてのパターンを研究し尽くした後、一撃で仕留める。その沈黙は恐怖であり、その一手は芸術である。このタイプの攻略日記は、もはや学術論文レベルだ。影に潜む最強の孤高者。',
    traits: ['完璧な下準備', '沈黙の美学', 'パターン解析機', '研究者気質', 'ガチすぎる学者'],
    emoji: '🦅',
    colorFrom: '#2e1065', colorTo: '#1e1b4b', accentColor: '#a78bfa',
  },
  {
    code: 'SDEC',
    name: 'マイペースな要塞',
    catchphrase: '急かされても、俺は動じない',
    description: '急かされても動じない。自分のペースが最強の盾。ソロで効率よく、静かに、着実に強くなっていく。気づいたら周りが置いてけぼりになっていた──それがこのタイプの日常。焦らない姿が、逆に最強の戦略となる。',
    traits: ['ペースが崩れない', '効率とマイペースの融合', '孤独な城主', '着実な積み上げ', '感情に流されない'],
    emoji: '🏰',
    colorFrom: '#1e3a5f', colorTo: '#374151', accentColor: '#93c5fd',
  },
  {
    code: 'SDEG',
    name: '鉄壁の孤高神',
    catchphrase: '崩れない壁が、最強の武器だ',
    description: '一人で最強を極める防衛の神。いかなる攻撃も通さず、いかなる効率も限界まで磨き上げる。完璧な防御と極限の効率の融合。このタイプが壁の前に立ったとき、ゲームはもう終わっている。孤高にして不滅。',
    traits: ['無敵の防衛力', '一人最強', '効率の極北', '崩れない精神', '神域のソロプレイ'],
    emoji: '⚙️',
    colorFrom: '#111827', colorTo: '#1f2937', accentColor: '#9ca3af',
  },
  {
    code: 'PARC',
    name: '陽気な冒険者',
    catchphrase: '仲間がいれば、どこでも楽園',
    description: '仲間がいれば百人力！笑いが絶えず、ハプニングも楽しみに変える魔法の持ち主。物語を仲間と共有し、感動を倍に増やす。あなたがいるだけでパーティが輝く──これが世界で最も愛されるゲームタイプだ。',
    traits: ['仲間を幸せにする', '笑いが止まらない', '感動を共有する', 'ポジティブの塊', 'パーティの太陽'],
    emoji: '🌟',
    colorFrom: '#065f46', colorTo: '#713f12', accentColor: '#6ee7b7',
  },
  {
    code: 'PARG',
    name: '伝説の英雄',
    catchphrase: '仲間と共に、歴史に名を刻め',
    description: '仲間のために命を張り、共に語り継がれる伝説を刻む。圧倒的な攻撃力と揺るぎない絆──このタイプが率いたパーティは、必ず最強になる運命を持つ。あなたはゲームの中の真の主人公だ。全世界が見守る英雄。',
    traits: ['圧倒的カリスマ', '仲間のために戦う', '伝説を作る男/女', 'ガチの主人公属性', '誰より輝く'],
    emoji: '👑',
    colorFrom: '#78350f', colorTo: '#1e3a8a', accentColor: '#fcd34d',
  },
  {
    code: 'PAEC',
    name: 'ゆかいな爆破魔',
    catchphrase: '仲間と一緒に、効率よく暴れろ',
    description: '仲間と一緒に暴れるのが最高の快感！効率よく敵を殲滅しながら、笑顔を絶やさない。「なんでも楽しめる」という才能は、誰もが羨む超能力だ。このタイプのいるパーティは、常に爆発的なエネルギーに満ちている。',
    traits: ['爆発的な楽しさ', '効率も楽しさも両立', 'パーティの爆弾', '誰とでも仲良し', '笑いが武器'],
    emoji: '🎆',
    colorFrom: '#9d174d', colorTo: '#c2410c', accentColor: '#f9a8d4',
  },
  {
    code: 'PAEG',
    name: 'レイドの支配者',
    catchphrase: 'このパーティで、世界の頂点へ',
    description: 'このタイプがいなければ、レイドは成立しない。完璧な戦略、圧倒的な火力、そして仲間を勝利に導く絶対的なリーダーシップ。世界最強パーティの核心にいるのは、常にこのタイプだ。頂点を見続ける支配者。',
    traits: ['天才的リーダーシップ', '完璧な戦略立案', 'レイドの核心', 'ガチの覇者', '仲間を勝利へ導く'],
    emoji: '⚡',
    colorFrom: '#4c1d95', colorTo: '#831843', accentColor: '#c4b5fd',
  },
  {
    code: 'PDRC',
    name: '優しき守護者',
    catchphrase: '仲間の笑顔が、最強の盾',
    description: '仲間の笑顔が、あなたの最強の武器。攻めよりも守りを選び、物語を共に楽しみながら全員を導く。その温かさが、パーティをどんな危機からも救う。このタイプのいるチームは、決して崩れない。',
    traits: ['誰より優しい', '物語を共有する', '守りの天才', 'みんなの心の支え', '涙もろいが強い'],
    emoji: '💚',
    colorFrom: '#14532d', colorTo: '#164e63', accentColor: '#86efac',
  },
  {
    code: 'PDRG',
    name: '神話の守り人',
    catchphrase: '仲間が倒れるなど、許さない',
    description: '神話に語られる最後の盾。どんな絶望的な状況でも、仲間を守り抜く鋼の意志。その存在があるだけで、チームは決して崩れない──これが本物の英雄の定義だ。全滅の二文字を辞書から消した男/女。',
    traits: ['不滅の守護力', '絶対に仲間を見捨てない', '神話級の防御', 'プレッシャーを喜びに変える', '鋼の精神'],
    emoji: '🐉',
    colorFrom: '#1e3a8a', colorTo: '#4c1d95', accentColor: '#818cf8',
  },
  {
    code: 'PDEC',
    name: '縁の下の功労者',
    catchphrase: '目立たなくていい、勝てば正義',
    description: '目立たなくていい、勝てばそれでいい。チームの弱点を素早く補い、効率よくサポートする縁の下の真の英雄。気づいたら自分なしではパーティが機能しなくなっている。それがこのタイプの最強の証明だ。',
    traits: ['縁の下の英雄', '効率サポートの達人', '空気を読む天才', '目立たず最強', 'チームの潤滑油'],
    emoji: '🔧',
    colorFrom: '#0e7490', colorTo: '#1e3a5f', accentColor: '#67e8f9',
  },
  {
    code: 'PDEG',
    name: '不滅のサポート神',
    catchphrase: '神は、最後まで仲間を見守る',
    description: 'チームが崩れ落ちる寸前、そこに立っているのがあなただ。全員のHPを見続け、完璧なタイミングで介入し、誰も死なせない。神の域に達したサポート力はもはや超能力。ゲームの神に最も愛されたタイプ。',
    traits: ['神域のサポート力', '全滅ゼロを実現', '完璧なタイミング', '仲間への愛が異次元', '縁の下の神'],
    emoji: '✨',
    colorFrom: '#5b21b6', colorTo: '#9d174d', accentColor: '#e879f9',
  },
];

// ── build full GameType array with computed compatibility ──────────────────
export const gameTypes: GameType[] = typeBaseData.map((base) => ({
  ...base,
  bestMatch:   flipAxes(base.code, 0, 1),
  goodMatches: [
    flipAxes(base.code, 0),
    flipAxes(base.code, 1),
    flipAxes(base.code, 2, 3),
  ] as [TypeCode, TypeCode, TypeCode],
  rivalMatch:  flipAxes(base.code, 1, 2, 3),
}));

export function getTypeByCode(code: string): GameType | undefined {
  return gameTypes.find((t) => t.code === code.toUpperCase());
}

export function calculateTypeCode(scores: number[]): TypeCode {
  // scores[axis] = count of B-option answers (0–5 per axis)
  const chars = [
    scores[0] >= 3 ? 'P' : 'S',
    scores[1] >= 3 ? 'D' : 'A',
    scores[2] >= 3 ? 'E' : 'R',
    scores[3] >= 3 ? 'G' : 'C',
  ];
  return chars.join('') as TypeCode;
}
