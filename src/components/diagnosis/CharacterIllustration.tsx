import { TypeCode } from '@/lib/diagnosis-data';

interface Props {
  code: TypeCode;
  width?: number;
  height?: number;
}

interface P { id: string }

export default function CharacterIllustration({ code, width = 200, height = 240 }: Props) {
  const Illus = MAP[code];
  return (
    <svg viewBox="0 0 200 240" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <Illus id={code} />
    </svg>
  );
}

/* ── SAC: リンク ─────────────────────────────────────────────── */
function SAC({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a4a1a"/>
        <stop offset="100%" stopColor="#2d5a1e"/>
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <ellipse cx="100" cy="90" rx="90" ry="70" fill="#aed58112"/>

    {/* body: green tunic */}
    <rect x="56" y="150" width="88" height="90" rx="7" fill="#558b2f"/>
    <rect x="48" y="178" width="104" height="10" rx="3" fill="#5d4037"/>
    <circle cx="100" cy="183" r="5" fill="#fdd835"/>
    {/* left arm + shield */}
    <rect x="34" y="154" width="24" height="52" rx="8" fill="#558b2f"/>
    <rect x="12" y="153" width="30" height="44" rx="5" fill="#1565c0"/>
    <rect x="15" y="156" width="24" height="38" rx="4" fill="#1976d2"/>
    <polygon points="27,163 35,179 19,179" fill="#fdd835"/>
    {/* right arm */}
    <rect x="142" y="154" width="24" height="52" rx="8" fill="#558b2f"/>
    {/* neck */}
    <rect x="83" y="141" width="34" height="14" rx="6" fill="#ffcc80"/>

    {/* head */}
    <ellipse cx="100" cy="109" rx="38" ry="36" fill="#ffcc80"/>
    {/* pointed ears */}
    <polygon points="63,103 53,121 73,114" fill="#ffcc80"/>
    <polygon points="137,103 147,121 127,114" fill="#ffcc80"/>
    {/* blonde hair sides */}
    <ellipse cx="67" cy="93" rx="18" ry="21" fill="#f9a825"/>
    <ellipse cx="133" cy="93" rx="18" ry="21" fill="#f9a825"/>
    {/* green pointed hat */}
    <polygon points="100,22 143,93 57,93" fill="#388e3c"/>
    <rect x="57" y="89" width="86" height="13" rx="4" fill="#2e7d32"/>
    <polygon points="100,34 128,87 72,87" fill="#4caf50" opacity="0.35"/>

    {/* eyes */}
    <ellipse cx="87" cy="113" rx="7" ry="6" fill="white"/>
    <ellipse cx="113" cy="113" rx="7" ry="6" fill="white"/>
    <ellipse cx="87" cy="113" rx="4.5" ry="4.5" fill="#1565c0"/>
    <ellipse cx="113" cy="113" rx="4.5" ry="4.5" fill="#1565c0"/>
    <circle cx="85" cy="111" r="2" fill="#0d47a1"/>
    <circle cx="111" cy="111" r="2" fill="#0d47a1"/>
    <circle cx="84" cy="110" r="1" fill="white" opacity="0.9"/>
    <circle cx="110" cy="110" r="1" fill="white" opacity="0.9"/>
    {/* eyebrows */}
    <path d="M81,105 Q87,102 94,106" stroke="#b8860b" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M106,106 Q113,102 119,105" stroke="#b8860b" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="100" cy="123" r="2.5" fill="#e0a06a" opacity="0.7"/>
    <path d="M92,132 Q100,139 108,132" stroke="#c07840" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </>;
}

/* ── SAH: クレイトス ─────────────────────────────────────────── */
function SAH({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2a0000"/>
        <stop offset="100%" stopColor="#120800"/>
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <ellipse cx="100" cy="100" r="90" fill="#b71c1c08"/>

    {/* body: dark leather */}
    <rect x="40" y="148" width="120" height="92" rx="8" fill="#1c1c1c"/>
    <rect x="50" y="154" width="100" height="68" rx="5" fill="#242424"/>
    <line x1="70" y1="155" x2="70" y2="220" stroke="#333" strokeWidth="2"/>
    <line x1="100" y1="155" x2="100" y2="220" stroke="#333" strokeWidth="2"/>
    <line x1="130" y1="155" x2="130" y2="220" stroke="#333" strokeWidth="2"/>
    {/* chains */}
    <path d="M22,172 Q32,166 40,174" stroke="#8d6e63" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M160,174 Q168,166 178,172" stroke="#8d6e63" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* shoulder pauldrons */}
    <ellipse cx="50" cy="150" rx="24" ry="15" fill="#2a2a2a"/>
    <ellipse cx="150" cy="150" rx="24" ry="15" fill="#2a2a2a"/>
    <ellipse cx="50" cy="148" rx="16" ry="9" fill="#333"/>
    <ellipse cx="150" cy="148" rx="16" ry="9" fill="#333"/>
    {/* neck */}
    <rect x="76" y="139" width="48" height="15" rx="5" fill="#9e9e9e"/>

    {/* head: large bald gray */}
    <ellipse cx="100" cy="107" rx="46" ry="42" fill="#9e9e9e"/>
    {/* red war paint across face */}
    <path d="M54,107 Q100,103 146,107 L146,121 Q100,125 54,121 Z" fill="#c62828"/>
    {/* white beard */}
    <ellipse cx="100" cy="136" rx="33" ry="23" fill="#eeeeee"/>
    <path d="M67,130 Q100,150 133,130" fill="#eeeeee"/>
    <path d="M76,128 Q100,142 124,128" stroke="#bdbdbd" strokeWidth="1.5" fill="none"/>
    <path d="M81,134 Q100,145 119,134" stroke="#bdbdbd" strokeWidth="1" fill="none"/>
    {/* heavy brow */}
    <path d="M72,104 L92,104" stroke="#555" strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M108,104 L128,104" stroke="#555" strokeWidth="4.5" strokeLinecap="round"/>
    {/* narrow intense eyes */}
    <ellipse cx="82" cy="113" rx="9" ry="4.5" fill="#111"/>
    <ellipse cx="118" cy="113" rx="9" ry="4.5" fill="#111"/>
    <ellipse cx="82" cy="113" rx="6" ry="3" fill="#c00"/>
    <ellipse cx="118" cy="113" rx="6" ry="3" fill="#c00"/>
    <ellipse cx="82" cy="113" rx="3" ry="3" fill="#1a0000"/>
    <ellipse cx="118" cy="113" rx="3" ry="3" fill="#1a0000"/>
    <circle cx="80" cy="112" r="1" fill="white" opacity="0.6"/>
    <circle cx="116" cy="112" r="1" fill="white" opacity="0.6"/>
    {/* facial scar */}
    <path d="M97,96 L103,116" stroke="#808080" strokeWidth="1.5" opacity="0.55"/>
  </>;
}

/* ── SDC: ゲラルト ────────────────────────────────────────────── */
function SDC({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#111825"/>
        <stop offset="100%" stopColor="#090d12"/>
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <ellipse cx="100" cy="190" rx="110" ry="65" fill="#37474f18"/>
    <ellipse cx="100" cy="80" rx="75" ry="50" fill="#90a4ae0c"/>

    {/* sword hilts behind shoulders */}
    <rect x="36" y="108" width="9" height="52" rx="3" fill="#607d8b"/>
    <rect x="26" y="126" width="29" height="7" rx="3" fill="#78909c"/>
    <rect x="32" y="106" width="17" height="11" rx="2" fill="#455a64"/>
    <rect x="155" y="108" width="9" height="52" rx="3" fill="#607d8b"/>
    <rect x="145" y="126" width="29" height="7" rx="3" fill="#78909c"/>
    <rect x="151" y="106" width="17" height="11" rx="2" fill="#455a64"/>

    {/* body: dark coat */}
    <rect x="44" y="150" width="112" height="90" rx="7" fill="#1e1e1e"/>
    <polygon points="100,155 78,205 58,240" fill="#181818"/>
    <polygon points="100,155 122,205 142,240" fill="#181818"/>
    <path d="M72,150 Q100,164 128,150" fill="#181818"/>
    {/* medallion */}
    <circle cx="100" cy="177" r="10" fill="#2c2c2c" stroke="#78909c" strokeWidth="1.5"/>
    <circle cx="100" cy="177" r="6" fill="#546e7a"/>
    <path d="M97,173 Q100,169 103,173 Q102,180 100,181 Q98,180 97,173" fill="#90a4ae" opacity="0.85"/>
    {/* neck */}
    <rect x="82" y="140" width="36" height="15" rx="5" fill="#c8a882"/>

    {/* head */}
    <ellipse cx="100" cy="109" rx="36" ry="38" fill="#c8a882"/>
    {/* white hair sides */}
    <ellipse cx="63" cy="94" rx="25" ry="31" fill="#e8e8e8"/>
    <ellipse cx="137" cy="94" rx="25" ry="31" fill="#e8e8e8"/>
    {/* hair top */}
    <ellipse cx="100" cy="74" rx="31" ry="22" fill="#f0f0f0"/>
    {/* flowing strands */}
    <path d="M75,102 Q63,122 58,148" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M125,102 Q137,122 142,148" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M68,97 Q60,118 56,144" stroke="#ccc" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* yellow cat eyes */}
    <ellipse cx="85" cy="113" rx="9" ry="7" fill="#f9a825"/>
    <ellipse cx="115" cy="113" rx="9" ry="7" fill="#f9a825"/>
    {/* slit pupils */}
    <ellipse cx="85" cy="113" rx="2.5" ry="6.5" fill="#100800"/>
    <ellipse cx="115" cy="113" rx="2.5" ry="6.5" fill="#100800"/>
    <circle cx="83" cy="111" r="1.5" fill="white" opacity="0.7"/>
    <circle cx="113" cy="111" r="1.5" fill="white" opacity="0.7"/>
    {/* scars */}
    <path d="M81,97 L87,111" stroke="#a07050" strokeWidth="1.5" opacity="0.65"/>
    <path d="M113,97 L119,111" stroke="#a07050" strokeWidth="1.5" opacity="0.65"/>
    {/* brows */}
    <path d="M77,106 Q85,103 93,106" stroke="#888" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M107,106 Q115,103 123,106" stroke="#888" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M97,121 Q100,126 103,121" stroke="#a07a58" strokeWidth="1.5" fill="none"/>
    <path d="M90,134 Q100,138 110,134" stroke="#9a7058" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </>;
}

/* ── SDH: サムス ─────────────────────────────────────────────── */
function SDH({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#080814"/>
        <stop offset="100%" stopColor="#160c00"/>
      </linearGradient>
      <radialGradient id={`${id}b`} cx="50%" cy="38%" r="48%">
        <stop offset="0%" stopColor="#ff8f00" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#ff8f00" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <rect width="200" height="240" fill={`url(#${id}b)`}/>
    {/* stars */}
    <circle cx="18" cy="18" r="1.5" fill="white" opacity="0.6"/>
    <circle cx="52" cy="32" r="1" fill="white" opacity="0.4"/>
    <circle cx="172" cy="14" r="1.5" fill="white" opacity="0.7"/>
    <circle cx="186" cy="52" r="1" fill="white" opacity="0.5"/>
    <circle cx="28" cy="82" r="1" fill="white" opacity="0.35"/>
    <circle cx="177" cy="88" r="1.5" fill="white" opacity="0.5"/>
    <circle cx="145" cy="28" r="1" fill="white" opacity="0.45"/>

    {/* body: power suit */}
    <rect x="44" y="148" width="112" height="92" rx="12" fill="#e65100"/>
    <rect x="54" y="158" width="92" height="70" rx="7" fill="#ef6c00"/>
    {/* chest orb */}
    <ellipse cx="100" cy="177" rx="20" ry="17" fill="#ff8f00"/>
    <circle cx="100" cy="177" r="11" fill="#ffb300"/>
    <circle cx="100" cy="177" r="6" fill="#ef6c00"/>
    {/* shoulder armor */}
    <ellipse cx="48" cy="150" rx="27" ry="19" fill="#e65100"/>
    <ellipse cx="152" cy="150" rx="27" ry="19" fill="#e65100"/>
    <circle cx="42" cy="142" r="6" fill="#ff8f00"/>
    <circle cx="158" cy="142" r="6" fill="#ff8f00"/>
    {/* arm cannon right */}
    <rect x="152" y="165" width="38" height="24" rx="9" fill="#bf360c"/>
    <ellipse cx="188" cy="177" rx="11" ry="12" fill="#bf360c"/>
    <circle cx="188" cy="177" r="7" fill="#ff6d00" opacity="0.8"/>
    {/* left arm */}
    <rect x="12" y="158" width="34" height="52" rx="11" fill="#e65100"/>

    {/* helmet: round orange */}
    <ellipse cx="100" cy="108" rx="50" ry="48" fill="#e65100"/>
    <ellipse cx="100" cy="89" rx="42" ry="26" fill="#ef6c00" opacity="0.5"/>
    <ellipse cx="76" cy="76" rx="13" ry="9" fill="#ff8f00" opacity="0.3"/>

    {/* T-visor */}
    <rect x="57" y="108" width="86" height="19" rx="5" fill="#090914"/>
    <rect x="87" y="100" width="26" height="35" rx="4" fill="#090914"/>
    <rect x="59" y="110" width="82" height="15" rx="4" fill="#1a237e" opacity="0.5"/>
    <ellipse cx="100" cy="117" rx="37" ry="7" fill="#3949ab" opacity="0.3"/>

    {/* helmet detail lines */}
    <path d="M50,108 Q100,94 150,108" stroke="#ff8f00" strokeWidth="2" fill="none" opacity="0.55"/>
    <path d="M50,127 Q100,140 150,127" stroke="#ff8f00" strokeWidth="2" fill="none" opacity="0.55"/>
  </>;
}

/* ── PAC: マリオ ─────────────────────────────────────────────── */
function PAC({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0d47a1"/>
        <stop offset="100%" stopColor="#1565c0"/>
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    {/* clouds */}
    <ellipse cx="40" cy="38" rx="30" ry="14" fill="white" opacity="0.14"/>
    <ellipse cx="56" cy="30" rx="20" ry="11" fill="white" opacity="0.14"/>
    <ellipse cx="163" cy="54" rx="27" ry="12" fill="white" opacity="0.1"/>
    <ellipse cx="178" cy="46" rx="18" ry="10" fill="white" opacity="0.1"/>

    {/* body: blue overalls */}
    <rect x="54" y="154" width="92" height="86" rx="9" fill="#1565c0"/>
    <rect x="66" y="150" width="68" height="56" rx="7" fill="#1976d2"/>
    <circle cx="78" cy="160" r="5" fill="#fdd835"/>
    <circle cx="122" cy="160" r="5" fill="#fdd835"/>
    {/* red shirt arms */}
    <rect x="36" y="154" width="22" height="53" rx="9" fill="#c62828"/>
    <rect x="142" y="154" width="22" height="53" rx="9" fill="#c62828"/>
    <ellipse cx="47" cy="208" rx="13" ry="10" fill="white"/>
    <ellipse cx="153" cy="208" rx="13" ry="10" fill="white"/>
    {/* neck */}
    <rect x="82" y="143" width="36" height="16" rx="6" fill="#ffcc80"/>

    {/* head: round and cheerful */}
    <circle cx="100" cy="111" r="40" fill="#ffcc80"/>
    <circle cx="60" cy="113" r="8" fill="#ffcc80"/>
    <circle cx="140" cy="113" r="8" fill="#ffcc80"/>

    {/* red cap */}
    <ellipse cx="100" cy="81" rx="46" ry="19" fill="#c62828"/>
    <ellipse cx="100" cy="95" rx="51" ry="10" fill="#c62828"/>
    <ellipse cx="100" cy="95" rx="51" ry="6.5" fill="#d32f2f"/>
    {/* M on cap */}
    <text x="88" y="84" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif">M</text>

    {/* eyes */}
    <ellipse cx="85" cy="113" rx="8" ry="7" fill="#3a1e00"/>
    <ellipse cx="115" cy="113" rx="8" ry="7" fill="#3a1e00"/>
    <circle cx="83" cy="111" r="2.5" fill="white" opacity="0.8"/>
    <circle cx="113" cy="111" r="2.5" fill="white" opacity="0.8"/>
    {/* brows */}
    <path d="M77,105 Q85,101 93,105" stroke="#5d3a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M107,105 Q115,101 123,105" stroke="#5d3a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* nose */}
    <ellipse cx="100" cy="121" rx="9" ry="7" fill="#e08050"/>
    {/* big mustache */}
    <ellipse cx="87" cy="126" rx="16" ry="9" fill="#5d3a1a"/>
    <ellipse cx="113" cy="126" rx="16" ry="9" fill="#5d3a1a"/>
    {/* smile */}
    <path d="M85,136 Q100,147 115,136" stroke="#5d3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </>;
}

/* ── PAH: クラウド ───────────────────────────────────────────── */
function PAH({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#091220"/>
        <stop offset="100%" stopColor="#0d1a0a"/>
      </linearGradient>
      <radialGradient id={`${id}b`} cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#1a78c2" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1a78c2" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <rect width="200" height="240" fill={`url(#${id}b)`}/>

    {/* buster sword behind body */}
    <rect x="120" y="8" width="20" height="205" rx="3" fill="#455a64" opacity="0.65"/>
    <rect x="120" y="8" width="11" height="205" rx="2" fill="#546e7a" opacity="0.45"/>
    <rect x="110" y="150" width="40" height="11" rx="3" fill="#607d8b" opacity="0.8"/>

    {/* body: SOLDIER uniform */}
    <rect x="50" y="150" width="100" height="90" rx="9" fill="#1a3a6b"/>
    <rect x="60" y="158" width="80" height="60" rx="6" fill="#1e4080"/>
    <ellipse cx="54" cy="152" rx="21" ry="15" fill="#1a3a6b"/>
    <ellipse cx="146" cy="152" rx="21" ry="15" fill="#1a3a6b"/>
    <rect x="62" y="167" width="76" height="3" rx="1" fill="#4fc3f7" opacity="0.6"/>
    <rect x="62" y="174" width="76" height="3" rx="1" fill="#4fc3f7" opacity="0.4"/>
    <rect x="87" y="160" width="26" height="7" rx="2" fill="#1565c0"/>
    <circle cx="100" cy="163.5" r="3.5" fill="#4fc3f7"/>
    {/* arms */}
    <rect x="30" y="154" width="24" height="53" rx="9" fill="#1a3a6b"/>
    <rect x="146" y="154" width="24" height="53" rx="9" fill="#1a3a6b"/>
    {/* neck */}
    <rect x="80" y="140" width="40" height="16" rx="6" fill="#f5d5a0"/>

    {/* head */}
    <ellipse cx="100" cy="109" rx="36" ry="36" fill="#f5d5a0"/>

    {/* spiky blonde hair */}
    <ellipse cx="100" cy="88" rx="45" ry="16" fill="#f9a825"/>
    <polygon points="62,90 52,36 74,74" fill="#fbc02d"/>
    <polygon points="74,86 66,28 84,70" fill="#f9a825"/>
    <polygon points="86,82 79,18 94,66" fill="#fbc02d"/>
    <polygon points="100,79 94,8 106,8 111,79" fill="#f9a825"/>
    <polygon points="114,82 106,18 121,66" fill="#fbc02d"/>
    <polygon points="126,86 118,28 136,70" fill="#f9a825"/>
    <polygon points="138,90 128,36 148,74" fill="#fbc02d"/>

    {/* mako eyes */}
    <ellipse cx="86" cy="113" rx="8.5" ry="7.5" fill="#e3f2fd"/>
    <ellipse cx="114" cy="113" rx="8.5" ry="7.5" fill="#e3f2fd"/>
    <ellipse cx="86" cy="113" rx="5.5" ry="5.5" fill="#29b6f6"/>
    <ellipse cx="114" cy="113" rx="5.5" ry="5.5" fill="#29b6f6"/>
    <ellipse cx="86" cy="113" rx="3" ry="3" fill="#0277bd"/>
    <ellipse cx="114" cy="113" rx="3" ry="3" fill="#0277bd"/>
    <circle cx="84" cy="111" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="112" cy="111" r="1.5" fill="white" opacity="0.9"/>
    <ellipse cx="86" cy="113" rx="12" ry="10" fill="#29b6f6" opacity="0.15"/>
    <ellipse cx="114" cy="113" rx="12" ry="10" fill="#29b6f6" opacity="0.15"/>
    {/* brows */}
    <path d="M78,105 Q86,102 93,106" stroke="#b8860b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M107,106 Q114,102 122,105" stroke="#b8860b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M97,121 Q100,126 103,121" stroke="#c09060" strokeWidth="1.5" fill="none"/>
    <path d="M90,133 L110,133" stroke="#c09060" strokeWidth="2" strokeLinecap="round"/>
  </>;
}

/* ── PDC: ルイージ ───────────────────────────────────────────── */
function PDC({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a5220"/>
        <stop offset="100%" stopColor="#2e7d32"/>
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <ellipse cx="100" cy="100" r="88" fill="#a5d6a710"/>

    {/* body: blue overalls */}
    <rect x="54" y="157" width="92" height="83" rx="9" fill="#1565c0"/>
    <rect x="66" y="153" width="68" height="54" rx="7" fill="#1976d2"/>
    <circle cx="78" cy="163" r="4.5" fill="#fdd835"/>
    <circle cx="122" cy="163" r="4.5" fill="#fdd835"/>
    {/* green shirt arms */}
    <rect x="36" y="157" width="22" height="50" rx="9" fill="#388e3c"/>
    <rect x="142" y="157" width="22" height="50" rx="9" fill="#388e3c"/>
    <ellipse cx="47" cy="209" rx="13" ry="10" fill="white"/>
    <ellipse cx="153" cy="209" rx="13" ry="10" fill="white"/>
    {/* neck */}
    <rect x="82" y="145" width="36" height="16" rx="6" fill="#ffcc80"/>

    {/* head: taller than Mario */}
    <ellipse cx="100" cy="113" rx="34" ry="41" fill="#ffcc80"/>
    <circle cx="66" cy="115" r="8" fill="#ffcc80"/>
    <circle cx="134" cy="115" r="8" fill="#ffcc80"/>

    {/* green cap */}
    <ellipse cx="100" cy="80" rx="45" ry="19" fill="#388e3c"/>
    <ellipse cx="100" cy="95" rx="50" ry="9.5" fill="#388e3c"/>
    <ellipse cx="100" cy="95" rx="50" ry="6" fill="#43a047"/>
    {/* L on cap */}
    <text x="91" y="84" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif">L</text>

    {/* eyes: slight worried look */}
    <ellipse cx="86" cy="115" rx="8" ry="7" fill="#3a1e00"/>
    <ellipse cx="114" cy="115" rx="8" ry="7" fill="#3a1e00"/>
    <circle cx="84" cy="113" r="2.5" fill="white" opacity="0.8"/>
    <circle cx="112" cy="113" r="2.5" fill="white" opacity="0.8"/>
    {/* worried inner brows raised */}
    <path d="M78,108 Q85,104 92,108" stroke="#5d3a1a" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M108,108 Q115,104 122,108" stroke="#5d3a1a" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    <path d="M83,107 Q86,104 89,107" stroke="#5d3a1a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M111,107 Q114,104 117,107" stroke="#5d3a1a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* nose */}
    <ellipse cx="100" cy="124" rx="8" ry="6" fill="#e08050"/>
    {/* mustache */}
    <ellipse cx="87" cy="128" rx="14" ry="8" fill="#5d3a1a"/>
    <ellipse cx="113" cy="128" rx="14" ry="8" fill="#5d3a1a"/>
    {/* small nervous smile */}
    <path d="M90,138 Q100,145 110,138" stroke="#5d3a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </>;
}

/* ── PDH: ティファ ───────────────────────────────────────────── */
function PDH({ id }: P) {
  return <>
    <defs>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#280015"/>
        <stop offset="100%" stopColor="#180820"/>
      </linearGradient>
      <radialGradient id={`${id}b`} cx="50%" cy="65%" r="50%">
        <stop offset="0%" stopColor="#e91e63" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="#e91e63" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="200" height="240" fill={`url(#${id}a)`}/>
    <rect width="200" height="240" fill={`url(#${id}b)`}/>

    {/* long black hair behind body */}
    <path d="M63,100 Q48,142 42,215 Q52,225 58,220 Q62,172 70,142 Q76,122 72,102 Z" fill="#181818"/>
    <path d="M137,100 Q152,142 158,215 Q148,225 142,220 Q138,172 130,142 Q124,122 128,102 Z" fill="#181818"/>

    {/* body: red top */}
    <rect x="58" y="155" width="84" height="85" rx="7" fill="#c62828"/>
    <rect x="68" y="162" width="64" height="50" rx="5" fill="#d32f2f"/>
    <polygon points="100,160 82,178 100,172 118,178" fill="#b71c1c"/>

    {/* bare arms */}
    <rect x="33" y="154" width="27" height="58" rx="11" fill="#f5c8a0"/>
    <rect x="140" y="154" width="27" height="58" rx="11" fill="#f5c8a0"/>
    {/* white bandage wraps */}
    <rect x="33" y="177" width="27" height="6" rx="2" fill="white" opacity="0.9"/>
    <rect x="33" y="185" width="27" height="6" rx="2" fill="white" opacity="0.85"/>
    <rect x="33" y="193" width="27" height="6" rx="2" fill="white" opacity="0.8"/>
    <rect x="140" y="177" width="27" height="6" rx="2" fill="white" opacity="0.9"/>
    <rect x="140" y="185" width="27" height="6" rx="2" fill="white" opacity="0.85"/>
    <rect x="140" y="193" width="27" height="6" rx="2" fill="white" opacity="0.8"/>
    {/* fists */}
    <ellipse cx="46" cy="215" rx="13" ry="10" fill="#f5c8a0"/>
    <ellipse cx="154" cy="215" rx="13" ry="10" fill="#f5c8a0"/>
    <rect x="35" y="207" width="23" height="10" rx="4" fill="white" opacity="0.85"/>
    <rect x="142" y="207" width="23" height="10" rx="4" fill="white" opacity="0.85"/>
    {/* neck */}
    <rect x="82" y="144" width="36" height="16" rx="6" fill="#f5c8a0"/>

    {/* head */}
    <ellipse cx="100" cy="111" rx="36" ry="37" fill="#f5c8a0"/>
    {/* hair front layer */}
    <ellipse cx="65" cy="93" rx="21" ry="27" fill="#1c1c1c"/>
    <ellipse cx="135" cy="93" rx="21" ry="27" fill="#1c1c1c"/>
    {/* hair top */}
    <ellipse cx="100" cy="77" rx="34" ry="22" fill="#212121"/>
    <path d="M88,65 Q100,59 112,65 Q106,72 100,74 Q94,72 88,65" fill="#2a2a2a" opacity="0.8"/>
    <path d="M100,59 Q103,69 100,80 Q97,69 100,59" stroke="#3a3a3a" strokeWidth="1.5" fill="none" opacity="0.6"/>

    {/* eyes */}
    <ellipse cx="86" cy="113" rx="8.5" ry="7" fill="#4e342e"/>
    <ellipse cx="114" cy="113" rx="8.5" ry="7" fill="#4e342e"/>
    <ellipse cx="86" cy="113" rx="5.5" ry="5" fill="#3e2723"/>
    <ellipse cx="114" cy="113" rx="5.5" ry="5" fill="#3e2723"/>
    <circle cx="84" cy="111" r="2" fill="white" opacity="0.85"/>
    <circle cx="112" cy="111" r="2" fill="white" opacity="0.85"/>
    <ellipse cx="86" cy="113" rx="11" ry="9" fill="#f48fb1" opacity="0.1"/>
    <ellipse cx="114" cy="113" rx="11" ry="9" fill="#f48fb1" opacity="0.1"/>
    {/* brows */}
    <path d="M77,105 Q86,102 94,105" stroke="#4e342e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M106,105 Q114,102 123,105" stroke="#4e342e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M97,121 Q100,125 103,121" stroke="#c09070" strokeWidth="1.5" fill="none"/>
    <path d="M89,131 Q100,140 111,131" stroke="#c07060" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </>;
}

const MAP = { SAC, SAH, SDC, SDH, PAC, PAH, PDC, PDH };
