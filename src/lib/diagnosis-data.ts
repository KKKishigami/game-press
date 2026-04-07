// 3軸 × 2選択 = 8タイプ
// 軸0: Solo(S) / Party(P)
// 軸1: Attack(A) / Defense(D)
// 軸2: Casual(C) / Hardcore(H)

export type TypeCode = 'SAC' | 'SAH' | 'SDC' | 'SDH' | 'PAC' | 'PAH' | 'PDC' | 'PDH';

export const ALL_TYPE_CODES: TypeCode[] = ['SAC','SAH','SDC','SDH','PAC','PAH','PDC','PDH'];

export interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  /** 0=ソロ/パーティ  1=攻撃/防衛  2=カジュアル/ガチ */
  axis: 0 | 1 | 2;
}

export interface GameType {
  code: TypeCode;
  emoji: string;
  characterName: string;
  gameTitle: string;
  catchphrase: string;
  description: string;
  traits: string[];
  bestMatch: TypeCode;
  goodMatches: [TypeCode, TypeCode, TypeCode];
  rivalMatch: TypeCode;
  colorFrom: string;
  colorTo: string;
  accentColor: string;
}

// ── helpers ────────────────────────────────────────────────────────────────
const PAIRS: [string,string][] = [['S','P'],['A','D'],['C','H']];

function flipAxes(code: TypeCode, ...axes: number[]): TypeCode {
  return code.split('').map((ch, i) =>
    axes.includes(i) ? (PAIRS[i][0] === ch ? PAIRS[i][1] : PAIRS[i][0]) : ch
  ).join('') as TypeCode;
}

// ── 15 questions (5 per axis, interleaved 0-1-2) ──────────────────────────
export const questions: Question[] = [
  { id:  1, axis: 0, text: 'ボス攻略の前夜、あなたがすることは？',
    optionA: '一人で攻略情報を集め、完璧な作戦を頭の中で完成させる',
    optionB: 'フレンドに「明日ボス行かね？」とメッセージを送る' },

  { id:  2, axis: 1, text: 'RPGでキャラを作るとき、まず何に振る？',
    optionA: '攻撃力。敵をぶち倒せれば、それで十分だ',
    optionB: 'HP・防御力。死ななければ、いつかは勝てる' },

  { id:  3, axis: 2, text: 'ゲームでミスをしたとき、あなたは？',
    optionA: '「まあいっか〜」と笑い飛ばして次へ進む',
    optionB: '悔しすぎてそのまま10分間、ミスの原因を徹底分析する' },

  { id:  4, axis: 0, text: 'オンラインゲームで知らないプレイヤーが目の前に現れた。あなたは？',
    optionA: '無視して自分のクエストに集中する',
    optionB: 'とりあえず手を振ってみる' },

  { id:  5, axis: 1, text: 'FPSでの立ち回りといえば？',
    optionA: '前線に突っ込んでキルを量産する、これが俺のスタイル',
    optionB: '後衛でエイムを磨き、仲間をサポートし続ける' },

  { id:  6, axis: 2, text: '1日のゲームプレイ時間は？',
    optionA: '1〜2時間くらい。生活の合間に楽しむ程度',
    optionB: '最低でも4時間。ゲームこそが俺の生活だ' },

  { id:  7, axis: 0, text: 'MMORPGを始めたとき、まず何をする？',
    optionA: 'まずソロでストーリーを進め、世界の雰囲気をつかむ',
    optionB: 'まずギルドを探して、誰かと一緒に冒険を始める' },

  { id:  8, axis: 1, text: '難しいボスに対するアプローチは？',
    optionA: '全力で殴り続け、圧倒的な火力でゴリ押す',
    optionB: 'パターンを完全に覚えて、安全に確実にダメージを積み上げる' },

  { id:  9, axis: 2, text: 'ゲームの難易度設定は？',
    optionA: 'ノーマル〜イージー。楽しめればそれで十分',
    optionB: 'ハード以上一択。簡単なゲームをやる意味がわからない' },

  { id: 10, axis: 0, text: 'ゲームで最高の瞬間といえば？',
    optionA: '一人で積み重ねてきた努力が、ついに実を結んだ瞬間',
    optionB: 'チームの連携が爆発して、全員で歓声を上げた瞬間' },

  { id: 11, axis: 1, text: '敵に不意打ちされた！どうする？',
    optionA: '即座に反撃！こちらから全力でぶつかる',
    optionB: 'まず距離を取り、態勢を整えてから冷静に対処する' },

  { id: 12, axis: 2, text: 'ゲームとの向き合い方は？',
    optionA: '趣味の一つ。程よく楽しみ、程よく休む',
    optionB: '人生の一部。誰よりも上手くなるまで諦めない' },

  { id: 13, axis: 0, text: 'チームデスマッチに誘われた。あなたの反応は？',
    optionA: '「ソロでやった方が強いし…」と断る',
    optionB: '「待ってた！絶対行く！」と即レス' },

  { id: 14, axis: 1, text: 'パーティの役割を選ぶなら？',
    optionA: 'アタッカー。俺が一番ダメージを叩き出す',
    optionB: 'タンク・ヒーラー。仲間を守ることが最優先だ' },

  { id: 15, axis: 2, text: '新キャラや大型パッチが来たとき？',
    optionA: '「へー面白そう」程度で、のんびり様子見',
    optionB: 'リリース直後にフル検証し、最適解を誰より早く出す' },
];

// ── type base data ─────────────────────────────────────────────────────────
type TypeBase = Omit<GameType, 'bestMatch' | 'goodMatches' | 'rivalMatch'>;

const typeBaseData: TypeBase[] = [
  {
    code: 'SAC',
    emoji: '🗡️',
    characterName: 'リンク',
    gameTitle: 'ゼルダの伝説',
    catchphrase: '俺のペースで、世界を救う',
    description: '誰にも急かされず、自分だけの冒険地図を描く孤高の英雄。コログ石を全部集めるまで絶対にメインストーリーに進まない。ゆるいようで実は誰より世界を深く知っている、真の冒険者。急がず、焦らず、広大な世界を隅々まで味わい尽くす——それがあなたのスタイルだ。いざ本気を出せば、誰も追いつけない。あなたは世界で最も自由な英雄だ。',
    traits: ['マイペース最強', '寄り道が本番', 'コンプリートは義務', '縛りプレイも余裕', 'ゆっくり確実に最強へ'],
    colorFrom: '#1b5e20', colorTo: '#33691e', accentColor: '#aed581',
  },
  {
    code: 'SAH',
    emoji: '🪓',
    characterName: 'クレイトス',
    gameTitle: 'ゴッド・オブ・ウォー',
    catchphrase: '神すら殺す。ゲームオーバー画面も殺す',
    description: '難しい？それは始める理由だ。ゲームオーバー画面を見るたびに目が輝き、「次こそ」という怒りと興奮が全身を支配する。攻略動画は見ない、ヒントも要らない、助けも要らない——必要なのは自分の拳と、折れない意志だけだ。最高難度以外は難度とは呼ばない。何十回死のうが何百回死のうが、このゲームをクリアするまでコントローラーを置かない。あなたはゲームという名の神を殺し続ける、不死の破壊神だ。',
    traits: ['最高難度しか認めない', 'リトライが娯楽', '攻略動画は邪道', 'ソロ絶対主義', '全てを力で解決する'],
    colorFrom: '#b71c1c', colorTo: '#3e2723', accentColor: '#ef9a9a',
  },
  {
    code: 'SDC',
    emoji: '🐺',
    characterName: 'ゲラルト',
    gameTitle: 'ウィッチャー3',
    catchphrase: '準備が全て。でも寄り道もまた、全て',
    description: '戦いに臨む前、まず敵の弱点を調べ、最適な装備を整え、油を塗り、爆弾を仕込む。完璧な準備が整って初めて剣を抜く——それがあなたの美学だ。しかし問題がある。サブクエストに足を踏み入れた瞬間、メインストーリーの存在が宇宙の彼方へ消える。気づけば4時間後、まったく関係ない村人の恋愛問題を解決している。そのくせ戦闘になれば完璧に立ち回り、ノーダメージで制圧する。一人旅を愛し、寄り道を愛し、準備を愛する——これが最も賢く、最も自由な戦士の生き様だ。',
    traits: ['準備の鬼', 'サブクエスト全コンプ', '戦略で格上を倒す', '孤独を愛する自由人', '寄り道こそが本道'],
    colorFrom: '#37474f', colorTo: '#1a237e', accentColor: '#90a4ae',
  },
  {
    code: 'SDH',
    emoji: '🚀',
    characterName: 'サムス',
    gameTitle: 'メトロイド',
    catchphrase: '言葉は不要。結果が全てを語る',
    description: 'チャットウィンドウは永遠に沈黙している。ボイスチャットも当然オフだ。あなたに必要なのは会話ではなく、完璧な攻略だけ。一人で何時間でも、何日でも、クリアするまで黙って挑み続ける鋼の精神力を持つ者——それがあなただ。感情を殺し、効率を極め、あらゆる障害を無言で粉砕する。周囲が「難しすぎる」と匙を投げた後も、あなただけが静かにコントローラーを握り続けている。そしてクリアした後も、特に喜ばない。次の挑戦を探すだけだ。宇宙で最も孤高にして最強の存在、それがあなただ。',
    traits: ['孤独の完璧主義者', '静かなガチ勢', '効率と忍耐の化身', '感情より結果', '誰も到達できない境地へ'],
    colorFrom: '#e65100', colorTo: '#1a237e', accentColor: '#ffb74d',
  },
  {
    code: 'PAC',
    emoji: '🍄',
    characterName: 'マリオ',
    gameTitle: 'スーパーマリオ',
    catchphrase: "Let's-a go！一緒に全力で楽しもう",
    description: 'あなたがいるだけで、ゲームは祭りになる。どんなジャンルでも楽しめ、誰とでも盛り上がれる、ゲーム界最強の太陽。マリカーではレインボーロードで笑顔のまま友達を奈落に叩き落とし、「ごめんごめん笑」と言いながら1位でゴールする。ゲームに誘えば秒で来るし、誰かが落ち込んでいれば声をかける。難しいことは考えない、楽しければそれでいい——しかしその「楽しさ」への本気度は、ガチ勢をも超えることがある。あなたはゲームという文化そのものを体現した、永遠のヒーローだ。',
    traits: ['誰とでも全力で楽しめる', 'パーティゲームの絶対王者', '笑顔で容赦なし', '場の空気を支配する', 'ゲームを最高の思い出にする'],
    colorFrom: '#c62828', colorTo: '#1565c0', accentColor: '#fdd835',
  },
  {
    code: 'PAH',
    emoji: '⚡',
    characterName: 'クラウド',
    gameTitle: 'FF7',
    catchphrase: '仲間がいれば、俺は止まらない',
    description: '口数は少ない。表情も乏しい。しかしコントローラーを握った瞬間、その手が語り出す。仲間のためなら限界など存在せず、練習量は誰にも負けず、攻撃力は常に最大を叩き出す。クールに見えて、実は誰より仲間のことを考えている。チームが苦しい局面でこそ輝き、絶望的な状況を一人でひっくり返す理不尽な強さを持つ。「お前がいなければ負けてた」という言葉を最も多く言われるタイプ——それがあなただ。寡黙にして最強、仲間のために全てを賭ける孤高の剣士。',
    traits: ['寡黙な絶対的エース', '仲間への深すぎる忠義', '攻撃力の化身', '限界突破が日常', '背中で全てを語る'],
    colorFrom: '#0d47a1', colorTo: '#1b5e20', accentColor: '#64b5f6',
  },
  {
    code: 'PDC',
    emoji: '👻',
    characterName: 'ルイージ',
    gameTitle: 'スーパーマリオ',
    catchphrase: '2番でいい。でも最後に笑うのは俺だ',
    description: 'マリオの陰に隠れ続けて何十年。しかしよく見ろ、本当に仲間を支えているのは誰だ？ビビりながらも幽霊屋敷に乗り込み、震えながらも前に進み、ヘロヘロになりながらも最後まで諦めない——それがあなただ。目立たない、称賛されない、主役にもなれない。でもあなたがいなければ、このパーティはとっくに崩壊していた。縁の下で静かにチームを支え続ける真のMVP。気づいた時には、全員があなたを一番頼りにしている。これが本物の英雄の姿だ。',
    traits: ['縁の下の真のMVP', 'ビビりながらも絶対に諦めない', '愛されキャラの神', 'サポートの達人', 'いなくなったら全員が困る'],
    colorFrom: '#2e7d32', colorTo: '#1b5e20', accentColor: '#a5d6a7',
  },
  {
    code: 'PDH',
    emoji: '🥊',
    characterName: 'ティファ',
    gameTitle: 'FF7',
    catchphrase: '仲間を傷つけるなら、私が相手になる',
    description: 'その笑顔の奥に、鋼よりも硬い意志が眠っている。仲間が傷つく姿を見ることだけは、絶対に許さない。自分がボロボロになっても、MPがゼロになっても、全員のHPを守り続ける——それがあなたの誓いだ。優しさは弱さではない。あなたの優しさは、チームを全滅から何度も救ってきた最強の武器だ。ガチ勢でありながら仲間を誰より大切にする、矛盾しているようで完璧に両立している。これこそが本物の強さの定義であり、あなたはその体現者だ。',
    traits: ['仲間への愛が最強の武器', '鋼の守護力', '笑顔で限界突破', 'チームの絶対的精神支柱', '全滅だけは絶対に許さない'],
    colorFrom: '#880e4f', colorTo: '#1a237e', accentColor: '#f48fb1',
  },
];

// ── build full GameType array ───────────────────────────────────────────────
export const gameTypes: GameType[] = typeBaseData.map((base) => ({
  ...base,
  bestMatch:   flipAxes(base.code, 0, 1, 2),
  goodMatches: [
    flipAxes(base.code, 0),
    flipAxes(base.code, 1),
    flipAxes(base.code, 2),
  ] as [TypeCode, TypeCode, TypeCode],
  rivalMatch:  flipAxes(base.code, 1, 2),
}));

export function getTypeByCode(code: string): GameType | undefined {
  return gameTypes.find((t) => t.code === code.toUpperCase());
}

export function calculateTypeCode(scores: number[]): TypeCode {
  const chars = [
    scores[0] >= 3 ? 'P' : 'S',
    scores[1] >= 3 ? 'D' : 'A',
    scores[2] >= 3 ? 'H' : 'C',
  ];
  return chars.join('') as TypeCode;
}
