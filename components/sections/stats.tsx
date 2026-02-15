"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 25, suffix: "+", label: "Yıllık Deneyim", description: "sektörde liderlik" },
  { value: 150, suffix: "+", label: "Tamamlanan Proje", description: "başarıyla teslim edildi" },
  { value: 500, suffix: "K", label: "Toplam m²", description: "inşaat alanı" },
  { value: 1200, suffix: "+", label: "Mutlu Müşteri", description: "güvenle tercih etti" },
]

function useCountUp(end: number, duration: number = 2000, startCounting: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startCounting])

  return count
}

function StatCard({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCountUp(stat.value, 2000, inView)

  return (
    <div className="text-center">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground">
        {count}
        <span className="text-muted-foreground">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-lg font-semibold text-foreground">{stat.label}</div>
      <div className="text-sm text-muted-foreground">{stat.description}</div>
    </div>
  )
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Rakamlarla Biz
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Yılların getirdiği tecrübe ve güvenle sektörde öncü konumdayız
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
