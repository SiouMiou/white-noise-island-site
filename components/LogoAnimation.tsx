// components/LogoAnimation.tsx
type Props = {
  title?: string
  className?: string
}

export default function LogoAnimation({
  title = 'WHITE NOISE ISLAND',
  className = '',
}: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-5xl ${className}`} aria-hidden>
      <svg
        viewBox="0 0 900 220"
        className="w-full h-auto overflow-visible"
        role="img"
      >
        <defs>
          {/* 品牌漸層 */}
          <linearGradient id="wni-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5A8C" />
            <stop offset="60%" stopColor="#5DD7F1" />
            <stop offset="100%" stopColor="#FFD24D" />
          </linearGradient>
          {/* 柔光 */}
          <filter id="wni-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 背景微光（淡淡的極光帶） */}
        <g opacity="0.5" filter="url(#wni-glow)">
          <ellipse cx="450" cy="110" rx="360" ry="70" fill="url(#wni-g)" opacity="0.12" />
        </g>

        {/* 左右環形軌道 + 旋轉小點 */}
        <g transform="translate(310,75)">
          <circle r="36" fill="none" stroke="#CBD5E1" strokeWidth="2" opacity="0.8" />
          <g className="wni-orbit">
            <circle r="4.5" fill="url(#wni-g)" />
          </g>
        </g>
        <g transform="translate(590,95)">
          <circle r="28" fill="none" stroke="#CBD5E1" strokeWidth="2" opacity="0.8" />
          <g className="wni-orbit wni-orbit--slow">
            <circle r="3.5" fill="url(#wni-g)" />
          </g>
        </g>

        {/* 中央品牌字樣（淡入、微字距收縮） */}
        <g className="wni-title" textAnchor="middle">
          <text x="450" y="98"
            fill="url(#wni-g)"
            stroke="rgba(34,38,50,.15)" strokeWidth="0.6"
            style={{ letterSpacing: '0.22em' }}
          >
            {title}
          </text>
        </g>

        {/* 中央左右短線：由內往外展開 */}
        <g stroke="#111827" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
          <line x1="420" y1="82" x2="420" y2="82" className="wni-grow-left" />
          <line x1="480" y1="82" x2="480" y2="82" className="wni-grow-right" />
        </g>

        {/* 噪音波（stroke dash 流動） */}
        <path
          className="wni-wave"
          d="
            M 120 150
            C 170 135, 210 165, 260 150
            S 350 135, 400 150
            S 490 165, 540 150
            S 630 135, 680 150
            S 770 165, 820 150
          "
          fill="none"
          stroke="url(#wni-g)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* 局部樣式（styled-jsx，無須改你的 Tailwind 設定） */}
      <style jsx>{`
        /* 旋轉軌道上小點（只轉 group，不動外圈） */
        .wni-orbit { animation: wni-rotate 6s linear infinite; transform-origin: 0 0; }
        .wni-orbit--slow { animation-duration: 9s; }
        .wni-orbit circle { transform: translate(36px, 0); } /* 半徑同外圈 */

        /* 標題淡入 + 字距收斂，營造「浮現」 */
        .wni-title text {
          font: 700 18px/1.1 "M PLUS Rounded 1c", "Noto Sans TC", sans-serif;
          opacity: 0;
          transform: translateY(6px);
          animation: wni-fadeUp .8s cubic-bezier(.22,1,.36,1) .2s forwards;
        }

        /* 左右短線由內往外 */
        .wni-grow-left  { animation: wni-growLeft 700ms cubic-bezier(.16,1,.3,1) .25s forwards; }
        .wni-grow-right { animation: wni-growRight 700ms cubic-bezier(.16,1,.3,1) .25s forwards; }

        /* 噪音波流動（dash offset 循環） */
        .wni-wave {
          stroke-dasharray: 6 10;
          animation: wni-dash 2.6s linear infinite;
          filter: url(#wni-glow);
        }

        /* ===== Keyframes ===== */
        @keyframes wni-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes wni-fadeUp {
          to { opacity: 1; transform: translateY(0); letter-spacing: .18em; }
        }
        @keyframes wni-growLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-40px); }
        }
        @keyframes wni-growRight {
          from { transform: translateX(0); }
          to   { transform: translateX(40px); }
        }
        @keyframes wni-dash {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -160; }
        }

        /* 減少動態偏好 */
        @media (prefers-reduced-motion: reduce) {
          .wni-orbit, .wni-title text, .wni-grow-left, .wni-grow-right, .wni-wave { animation: none !important; }
          .wni-title text { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
