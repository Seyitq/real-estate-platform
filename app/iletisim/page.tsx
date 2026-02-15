"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    content: "Konya",
    href: "https://maps.google.com/?q=37.8515,32.5403",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+90 537 656 65 92",
    href: "tel:+905376566592",
  },
  {
    icon: Mail,
    title: "E-posta",
    content: "göklerinsaat@gmail.com",
    href: "mailto:göklerinsaat@gmail.com",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    content: "Pazartesi - Cumartesi\n09:00 - 18:00",
    href: null,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
                İletişim
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Sorularınız, önerileriniz veya projeleriniz için bizimle iletişime geçin.
                Size en kısa sürede dönüş yapacağız.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="p-6 bg-secondary rounded-2xl border border-border"
                >
                  <div className="p-3 bg-card rounded-xl w-fit mb-4">
                    <info.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{info.title}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-pre-line block"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                      {info.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Bize Mesaj Gönderin</h2>

                {isSubmitted ? (
                  <div className="p-8 bg-card rounded-2xl border border-border text-center">
                    <div className="p-4 bg-secondary rounded-full w-fit mx-auto mb-4">
                      <Check className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Mesajınız Gönderildi!</h3>
                    <p className="mt-2 text-muted-foreground">
                      En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="mt-6 rounded-full"
                    >
                      Yeni Mesaj Gönder
                    </Button>
                  </div>
                ) : (
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
                          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Telefon Numaranız
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="0 (5XX) XXX XX XX"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Konu *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Seçiniz</option>
                          <option value="genel">Genel Bilgi</option>
                          <option value="teklif">Teklif Talebi</option>
                          <option value="is-birligi">İş Birliği</option>
                          <option value="kariyer">Kariyer</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Mesajınız *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="rounded-full px-12">
                      Mesaj Gönder
                    </Button>
                  </form>
                )}
              </div>

              {/* Map Placeholder */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Bizi Ziyaret Edin</h2>
                <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-card rounded-2xl border border-border overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3150.3744608591014!2d32.54028617588706!3d37.8515277719661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDUxJzA1LjUiTiAzMsKwMzInMzQuMyJF!5e0!3m2!1str!2str!4v1770933691108!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gökler İnşaat Konum"
                    className="absolute inset-0"
                  />
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
