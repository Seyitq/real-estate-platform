"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string | null
  content: string
  rating: number
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    // Fetch testimonials from API
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      })
      .catch(() => {
        // No fallback data
      })
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  if (testimonials.length === 0 || !currentTestimonial) return null

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Müşteri Yorumları
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Müşterilerimizin deneyimlerini ve memnuniyetlerini dinleyin
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-secondary rounded-3xl p-8 sm:p-12 border border-border">
            <Quote className="h-12 w-12 text-muted-foreground/30 mb-6" />

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= currentTestimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                    }`}
                />
              ))}
            </div>

            <p className="text-lg sm:text-xl text-foreground leading-relaxed">
              {currentTestimonial.content}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTestimonial.role}
                  {currentTestimonial.company && ` - ${currentTestimonial.company}`}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-secondary border border-border hover:bg-accent transition-colors"
              aria-label="Önceki yorum"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-foreground" : "w-2 bg-muted-foreground/30"
                    }`}
                  aria-label={`Yorum ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-secondary border border-border hover:bg-accent transition-colors"
              aria-label="Sonraki yorum"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
