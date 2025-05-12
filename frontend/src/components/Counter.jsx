"use client"

import { useState, useEffect, useRef } from "react"

function Counter({ end, duration = 2000, label, icon }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    let animationFrameId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      }
    }

    animationFrameId = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [end, duration, isVisible])

  return (
    <div ref={countRef} className="text-center p-6">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">{icon}</div>
      </div>
      <h3 className="text-4xl font-bold text-blue-600 mb-2">{count.toLocaleString()}+</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  )
}

export default Counter
