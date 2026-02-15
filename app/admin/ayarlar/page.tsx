"use client"

import { useEffect, useState } from "react"
import { Save, Building2, Phone, Mail, MapPin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteSettings {
    id: string
    companyName: string
    phone: string
    phone2: string | null
    email: string
    email2: string | null
    address: string
    mapUrl: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    linkedin: string | null
    youtube: string | null
}

export default function SiteSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<Partial<SiteSettings>>({
        companyName: "Gökler İnşaat",
        phone: "+90 537 656 65 92",
        phone2: "",
        email: "göklerinsaat@gmail.com",
        email2: "",
        address: "Konya",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3150.3744608591014!2d32.54028617588706!3d37.8515277719661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDUxJzA1LjUiTiAzMsKwMzInMzQuMyJF!5e0!3m2!1str!2str!4v1770933691108!5m2!1str!2str",
        facebook: "https://www.facebook.com/people/G%C3%B6kler-%C4%B0n%C5%9Faat/61581379206252/",
        instagram: "https://www.instagram.com/goklerinsaatt/",
        twitter: "",
        linkedin: "",
        youtube: "",
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const response = await fetch("/api/settings")
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setFormData({
                        ...data,
                        phone2: data.phone2 || "",
                        email2: data.email2 || "",
                        mapUrl: data.mapUrl || "",
                        facebook: data.facebook || "",
                        instagram: data.instagram || "",
                        twitter: data.twitter || "",
                        linkedin: data.linkedin || "",
                        youtube: data.youtube || "",
                    })
                }
            }
        } catch (error) {
            console.error("Error fetching settings:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                alert("Ayarlar kaydedildi!")
            }
        } catch (error) {
            console.error("Error saving settings:", error)
            alert("Bir hata oluştu")
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Site Ayarları</h1>
                <p className="text-muted-foreground">
                    Şirket bilgileri ve iletişim detaylarını yönetin
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Info */}
                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Şirket Bilgileri
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Şirket Adı
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            <MapPin className="inline h-4 w-4 mr-2" />
                            Adres
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Harita URL (Google Maps Embed)
                        </label>
                        <input
                            type="url"
                            name="mapUrl"
                            value={formData.mapUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="https://maps.google.com/..."
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        İletişim Bilgileri
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Telefon 1
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Telefon 2 (Opsiyonel)
                            </label>
                            <input
                                type="tel"
                                name="phone2"
                                value={formData.phone2}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                <Mail className="inline h-4 w-4 mr-2" />
                                E-posta 1
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                E-posta 2 (Opsiyonel)
                            </label>
                            <input
                                type="email"
                                name="email2"
                                value={formData.email2}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Sosyal Medya
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Facebook
                            </label>
                            <input
                                type="url"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Instagram
                            </label>
                            <input
                                type="url"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Twitter / X
                            </label>
                            <input
                                type="url"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                YouTube
                            </label>
                            <input
                                type="url"
                                name="youtube"
                                value={formData.youtube}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={saving} className="rounded-xl">
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
