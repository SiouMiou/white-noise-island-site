'use client'
// 檔案路徑：components/LogoAnimation.tsx

import { useEffect, useState } from 'react'

export default function LogoAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 延遲顯示動畫，確保載入完成
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        width="500"
        height="150"
        viewBox="0 0 500 150"
        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 背景裝飾圓圈 */}
        <circle
          cx="80"
          cy="75"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-200 dark:text-blue-800"
        >
          <animate
            attributeName="r"
            values="40;50;40"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="420"
          cy="75"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-200 dark:text-blue-800"
        >
          <animate
            attributeName="r"
            values="35;45;35"
            dur="4s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="4s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>

        {/* 主要文字 - 白噪島 */}
        <text
          x="250"
          y="85"
          textAnchor="middle"
          className="fill-gray-900 dark:fill-white"
          style={{ 
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            fontSize: '48px',
            fontWeight: '700',
            letterSpacing: '0.05em'
          }}
        >
          <tspan
            className="animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            白
          </tspan>
          <tspan
            className="animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            噪
          </tspan>
          <tspan
            className="animate-fade-in"
            style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
          >
            島
          </tspan>
        </text>

        {/* 裝飾性線條 */}
        <line
          x1="150"
          y1="75"
          x2="200"
          y2="75"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400 dark:text-blue-500 animate-draw-line"
          style={{ animationDelay: '1s', animationFillMode: 'both' }}
        />
        <line
          x1="300"
          y1="75"
          x2="350"
          y2="75"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400 dark:text-blue-500 animate-draw-line"
          style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
        />

        {/* 簡約的浮動點 */}
        <circle
          cx="120"
          cy="50"
          r="1.5"
          fill="currentColor"
          className="text-blue-300 dark:text-blue-600 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <circle
          cx="380"
          cy="60"
          r="1"
          fill="currentColor"
          className="text-blue-300 dark:text-blue-600 animate-float"
          style={{ animationDelay: '0.8s' }}
        />
        <circle
          cx="100"
          cy="100"
          r="1"
          fill="currentColor"
          className="text-blue-300 dark:text-blue-600 animate-float"
          style={{ animationDelay: '1.6s' }}
        />
        <circle
          cx="400"
          cy="90"
          r="1.5"
          fill="currentColor"
          className="text-blue-300 dark:text-blue-600 animate-float"
          style={{ animationDelay: '2.4s' }}
        />

        {/* 副標題 */}
        <text
          x="250"
          y="115"
          textAnchor="middle"
          className="fill-gray-500 dark:fill-gray-400"
          style={{ 
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.1em'
          }}
        >
          <tspan
            className="animate-fade-in"
            style={{ animationDelay: '1.4s', animationFillMode: 'both' }}
          >
            WHITE NOISE ISLAND
          </tspan>
        </text>
      </svg>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-draw-line {
          animation: draw-line 1s ease-out forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
