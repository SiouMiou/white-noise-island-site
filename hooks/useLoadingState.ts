'use client'
// 檔案路徑：hooks/useLoadingState.ts

import { useState, useEffect } from 'react'

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // 檢查是否已經載入過（使用 sessionStorage）
    const hasLoaded = sessionStorage.getItem('hasLoaded')
    
    if (hasLoaded) {
      // 如果已經載入過，直接跳過動畫
      setIsLoading(false)
      setIsFirstLoad(false)
    } else {
      // 首次載入，顯示動畫
      setIsFirstLoad(true)
      // 確保動畫至少顯示 3 秒
      const minTimer = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false)
          setIsFirstLoad(false)
          sessionStorage.setItem('hasLoaded', 'true')
        }
      }, 3000)
      
      return () => clearTimeout(minTimer)
    }
  }, [isLoading])

  const completeLoading = () => {
    setIsLoading(false)
    setIsFirstLoad(false)
    // 標記已經載入過
    sessionStorage.setItem('hasLoaded', 'true')
  }

  return {
    isLoading,
    isFirstLoad,
    completeLoading
  }
}
