// 檔案路徑：components/BackgroundMarquee.tsx
'use client'

import { ReactNode } from 'react'

interface BackgroundMarqueeProps {
  children?: ReactNode
  text?: string
  className?: string
}

export default function BackgroundMarquee({ 
  children, 
  text = "WHITE NOISE ISLAND",
  className = ""
}: BackgroundMarqueeProps) {
  return (
    <div 
      className={`relative h-[200px] sm:h-[250px] overflow-hidden ${className}`}
      style={{ 
        background: 'rgba(255,90,140,0.03)',
        zIndex: 1
      }}
    >
      {/* 背景滾動文字 */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 1 }}>
        <div 
          className="whitespace-nowrap text-[8rem] sm:text-[10rem] font-black select-none"
          style={{ 
            color: 'rgba(255,90,140,0.06)',
            fontFamily: '"M PLUS Rounded 1c", "Zen Maru Gothic", system-ui, sans-serif',
            animation: 'marquee 30s linear infinite',
            letterSpacing: '0.1em'
          }}
        >
          {text} {text} {text} {text}
        </div>
      </div>
      
      {/* 前景內容 */}
      {children && (
        <div className="relative h-full flex items-center justify-center" style={{ zIndex: 2 }}>
          {children}
        </div>
      )}
      
    </div>
  )
}
