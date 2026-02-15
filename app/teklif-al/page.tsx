"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Check, Phone, Mail, MapPin } from "lucide-react"

const projectTypes = [
  "Konut İnşaatı",
  "Ticari İnşaat",
  "Tadilat & Renovasyon",
  "Proje Yönetimi",
  "Mimari Tasarım",
  "İç Mimarlık",
]

const budgetRanges = [
  "500.000 TL - 1.000.000 TL",
  "1.000.000 TL - 2.500.000 TL",
  "2.500.000 TL - 5.000.000 TL",
  "5.000.000 TL - 10.000.000 TL",
  "10.000.000 TL ve üzeri",
]

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    location: "",
    timeline: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-screen bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="p-4 bg-secondary rounded-full w-fit mx-auto mb-6">
              <Check className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Talebiniz Alındı!</h1>
            <p className="mt-4 text-muted-foreground">
              Teklif talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 rounded-full px-8"
            >
              Yeni Talep Oluştur
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                Ücretsiz Teklif Alın
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Projeniz için ücretsiz keşif ve fiyat teklifi almak için formu doldurun.
                En kısa sürede sizinle iletişime geçelim.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="0 (5XX) XXX XX XX"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Firma Adı (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Firma Adı"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                        Proje Tipi *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Seçiniz</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Tahmini Bütçe *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Seçiniz</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                        Proje Lokasyonu *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="İl, İlçe"
                      />
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                        Planlanan Başlangıç Tarihi
                      </label>
                      <input
                        type="text"
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Örn: 2024 Mart"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Proje Detayları
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Projeniz hakkında detaylı bilgi verin..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full px-12">
                    Teklif Talebi Gönder
                  </Button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="p-6 bg-secondary rounded-2xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Neden Biz?</h3>
                  <ul className="space-y-3">
                    {[
                      "25+ yıllık sektör deneyimi",
                      "150+ başarıyla tamamlanan proje",
                      "Şeffaf fiyatlandırma politikası",
                      "Zamanında teslimat garantisi",
                      "7/24 müşteri desteği",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-foreground shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-secondary rounded-2xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Hızlı İletişim</h3>
                  <div className="space-y-4">
                    <a
                      href="tel:+905376566592"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      +90 537 656 65 92
                    </a>
                    <a
                      href="mailto:göklerinsaat@gmail.com"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      göklerinsaat@gmail.com
                    </a>
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                      <span>
                        Konya
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
