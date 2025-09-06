'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type BannerItem = {
  title: string
  href: string
  imageUrl: string
}

export default function BannerCarousel({
  items,
  intervalMs = 5000,
}: {
  items: BannerItem[]
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  const total = items.length
  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    if (total <= 1 || prefersReducedMotion) return
    timerRef.current = window.setInterval(next, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [intervalMs, total, prefersReducedMotion, next])

  function pause() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }
  function resume() {
    if (total <= 1 || prefersReducedMotion) return
    if (!timerRef.current) {
      timerRef.current = window.setInterval(next, intervalMs)
    }
  }

  if (total === 0) return null

  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-white shadow-lg"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="relative h-[260px] sm:h-[360px] md:h-[420px]">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="absolute inset-0"
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            style={{
              transform: `translateX(${(i - index) * 100}%)`,
              transition: 'transform 500ms ease',
            }}
          >
            <span className="sr-only">{item.title}</span>
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={i === 0}
              style={{ objectFit: 'cover' }}
            />
          </Link>
        ))}
      </div>

      {/* 控制器 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            aria-label="上一張"
            onClick={prev}
            className="rounded-full bg-white/80 px-3 py-1 text-sm shadow hover:bg-white transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="下一張"
            onClick={next}
            className="rounded-full bg-white/80 px-3 py-1 text-sm shadow hover:bg-white transition-colors"
          >
            →
          </button>
        </div>
        <div className="pointer-events-auto flex gap-1">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`第 ${i + 1} 張`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
