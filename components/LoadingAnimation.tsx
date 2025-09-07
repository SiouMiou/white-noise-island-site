'use client'
// 檔案路徑：components/LoadingAnimation.tsx

import { useEffect, useState } from 'react'

interface LoadingAnimationProps {
  onComplete: () => void
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // 動畫階段控制
    const phases = [
      { delay: 0, duration: 1000 },      // 0: 初始載入
      { delay: 1000, duration: 2000 },   // 1: 主要動畫
      { delay: 3000, duration: 1000 },   // 2: 完成動畫
    ]

    phases.forEach((phase, index) => {
      setTimeout(() => {
        setAnimationPhase(index)
      }, phase.delay)
    })

    // 總動畫時間：4秒
    const totalDuration = 4000
    const timer = setTimeout(() => {
      setIsVisible(false)
      // 淡出完成後調用 onComplete
      setTimeout(onComplete, 500)
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 背景漸層 */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          {/* 背景 */}
          <rect width="100%" height="100%" fill="url(#bgGradient)" />

          {/* 浮動粒子背景 */}
          {[
            { cx: 100, cy: 150, r: 2, dur1: '3.5s', dur2: '2.5s', values1: '150;400;150', values2: '0.1;0.5;0.1' },
            { cx: 300, cy: 250, r: 1.5, dur1: '4.2s', dur2: '3.1s', values1: '250;500;250', values2: '0.1;0.5;0.1' },
            { cx: 500, cy: 100, r: 2.5, dur1: '3.8s', dur2: '2.8s', values1: '100;350;100', values2: '0.1;0.5;0.1' },
            { cx: 700, cy: 300, r: 1.8, dur1: '4.5s', dur2: '3.3s', values1: '300;600;300', values2: '0.1;0.5;0.1' },
            { cx: 900, cy: 200, r: 2.2, dur1: '3.2s', dur2: '2.7s', values1: '200;450;200', values2: '0.1;0.5;0.1' },
            { cx: 150, cy: 400, r: 1.6, dur1: '4.8s', dur2: '3.5s', values1: '400;650;400', values2: '0.1;0.5;0.1' },
            { cx: 350, cy: 500, r: 2.8, dur1: '3.7s', dur2: '2.9s', values1: '500;750;500', values2: '0.1;0.5;0.1' },
            { cx: 550, cy: 350, r: 1.9, dur1: '4.1s', dur2: '3.2s', values1: '350;600;350', values2: '0.1;0.5;0.1' },
            { cx: 750, cy: 450, r: 2.3, dur1: '3.9s', dur2: '2.6s', values1: '450;700;450', values2: '0.1;0.5;0.1' },
            { cx: 950, cy: 150, r: 1.7, dur1: '4.3s', dur2: '3.4s', values1: '150;400;150', values2: '0.1;0.5;0.1' },
            { cx: 200, cy: 600, r: 2.4, dur1: '3.6s', dur2: '2.8s', values1: '600;800;600', values2: '0.1;0.5;0.1' },
            { cx: 400, cy: 700, r: 1.4, dur1: '4.7s', dur2: '3.6s', values1: '700;500;700', values2: '0.1;0.5;0.1' },
            { cx: 600, cy: 550, r: 2.6, dur1: '3.4s', dur2: '2.5s', values1: '550;300;550', values2: '0.1;0.5;0.1' },
            { cx: 800, cy: 650, r: 1.8, dur1: '4.4s', dur2: '3.7s', values1: '650;400;650', values2: '0.1;0.5;0.1' },
            { cx: 1000, cy: 500, r: 2.1, dur1: '3.8s', dur2: '2.9s', values1: '500;200;500', values2: '0.1;0.5;0.1' },
            { cx: 250, cy: 100, r: 1.5, dur1: '4.6s', dur2: '3.8s', values1: '100;300;100', values2: '0.1;0.5;0.1' },
            { cx: 450, cy: 300, r: 2.7, dur1: '3.3s', dur2: '2.4s', values1: '300;600;300', values2: '0.1;0.5;0.1' },
            { cx: 650, cy: 200, r: 1.9, dur1: '4.9s', dur2: '3.9s', values1: '200;500;200', values2: '0.1;0.5;0.1' },
            { cx: 850, cy: 400, r: 2.2, dur1: '3.5s', dur2: '2.7s', values1: '400;700;400', values2: '0.1;0.5;0.1' },
            { cx: 1050, cy: 600, r: 1.6, dur1: '4.2s', dur2: '3.1s', values1: '600;300;600', values2: '0.1;0.5;0.1' }
          ].map((particle, i) => (
            <circle
              key={i}
              cx={particle.cx}
              cy={particle.cy}
              r={particle.r}
              fill="currentColor"
              className="text-blue-200 dark:text-blue-800"
              opacity="0.3"
            >
              <animate
                attributeName="cy"
                values={particle.values1}
                dur={particle.dur1}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={particle.values2}
                dur={particle.dur2}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* 主要圓圈動畫 */}
          <circle
            cx="600"
            cy="400"
            r="100"
            fill="none"
            stroke="url(#textGradient)"
            strokeWidth="2"
            opacity="0.6"
          >
            <animate
              attributeName="r"
              values="50;150;50"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="600"
            cy="400"
            r="80"
            fill="none"
            stroke="url(#textGradient)"
            strokeWidth="1"
            opacity="0.4"
          >
            <animate
              attributeName="r"
              values="30;120;30"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
            <animate
              attributeName="opacity"
              values="0.1;0.6;0.1"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </circle>

          {/* 載入進度圓圈 */}
          <circle
            cx="600"
            cy="400"
            r="60"
            fill="none"
            stroke="url(#textGradient)"
            strokeWidth="3"
            strokeDasharray="377"
            strokeDashoffset="377"
            style={{
              animationDelay: '0.5s',
              animationFillMode: 'both'
            }}
            className="animate-progress"
          />

          {/* 主要文字 - 白噪島 */}
          <text
            x="600"
            y="420"
            textAnchor="middle"
            fill="url(#textGradient)"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              fontSize: '72px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              animationDelay: '1.5s',
              animationFillMode: 'both'
            }}
            className="animate-fade-in-up"
          >
            白噪島
          </text>

          {/* 副標題 */}
          <text
            x="600"
            y="480"
            textAnchor="middle"
            fill="currentColor"
            className="text-gray-600 dark:text-gray-400 animate-fade-in-up"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              fontSize: '18px',
              fontWeight: '400',
              letterSpacing: '0.1em',
              animationDelay: '2s',
              animationFillMode: 'both'
            }}
          >
            WHITE NOISE ISLAND
          </text>

          {/* 載入文字 */}
          <text
            x="600"
            y="550"
            textAnchor="middle"
            fill="currentColor"
            className="text-gray-500 dark:text-gray-500 animate-pulse"
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              animationDelay: '2.5s',
              animationFillMode: 'both'
            }}
          >
            {animationPhase === 0 && '載入中...'}
            {animationPhase === 1 && '準備中...'}
            {animationPhase === 2 && '完成！'}
          </text>

          {/* 裝飾性線條 */}
          <line
            x1="400"
            y1="400"
            x2="500"
            y2="400"
            stroke="url(#textGradient)"
            strokeWidth="2"
            className="animate-draw-line"
            style={{
              animationDelay: '1.8s',
              animationFillMode: 'both'
            }}
          />
          <line
            x1="700"
            y1="400"
            x2="800"
            y2="400"
            stroke="url(#textGradient)"
            strokeWidth="2"
            className="animate-draw-line"
            style={{
              animationDelay: '2.2s',
              animationFillMode: 'both'
            }}
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes draw-line {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          to {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }

        @keyframes progress {
          from {
            stroke-dashoffset: 377;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        .animate-draw-line {
          animation: draw-line 1s ease-out forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }

        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
