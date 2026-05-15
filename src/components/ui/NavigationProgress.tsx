'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined)

  useEffect(() => {
    // Quando rota muda, para o loading
    setLoading(false)
    setWidth(0)
    clearTimeout(timerRef.current)
    clearInterval(intervalRef.current)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleStart = () => {
      setWidth(10)
      setLoading(true)
      intervalRef.current = setInterval(() => {
        setWidth((w) => {
          if (w >= 85) { clearInterval(intervalRef.current); return w }
          return w + Math.random() * 8
        })
      }, 300)
    }

    // Intercepta cliques em links internos
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('#')) return
      handleStart()
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      clearInterval(intervalRef.current)
      clearTimeout(timerRef.current)
    }
  }, [])

  if (!loading && width === 0) return null

  return (
    <div
      className="fixed top-0 left-0 z-50 h-0.5 bg-amber-500 transition-all duration-300 ease-out"
      style={{ width: loading ? `${width}%` : '100%', opacity: loading ? 1 : 0 }}
    />
  )
}