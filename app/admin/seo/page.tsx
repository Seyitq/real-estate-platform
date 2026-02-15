"use client"

import { useEffect, useState } from "react"
import { Save, Globe, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SeoSetting {
    id: string
    page: string
    title: string
    description: string
    keywords: string | null
    ogImage: string | null
}

const pages = [
    { value: "home", label: "Ana Sayfa" },
    { value: "about", label: "Hakkımızda" },
    { value: "services", label: "Hizmetler" },
    { value: "projects", label: "Projeler" },
    { value: "blog", label: "Blog" },
    { value: "contact", label: "İletişim" },
]

export default function SeoSettingsPage() {
    const [settings, setSettings] = useState<SeoSetting[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [selectedPage, setSelectedPage] = useState("home")
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        keywords: "",
        ogImage: "",
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    useEffect(() => {
        const setting = settings.find((s) => s.page === selectedPage)
        if (setting) {
            setFormData({
                title: setting.title,
                description: setting.description,
                keywords: setting.keywords || "",
                ogImage: setting.ogImage || "",
            })
        } else {
            setFormData({
                title: "",
                description: "",
                keywords: "",
                ogImage: "",
            })
        }
    }, [selectedPage, settings])

    const fetchSettings = async () => {
        try {
            const response = await fetch("/api/seo")
            if (response.ok) {
                const data = await response.json()
                setSettings(data)
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
            const response = await fetch("/api/seo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    page: selectedPage,
                    ...formData,
                }),
            })

            if (response.ok) {
                fetchSettings()
                alert("SEO ayarları kaydedildi!")
            }
        } catch (error) {
            console.error("Error saving settings:", error)
            alert("Bir hata oluştu")
        } finally {
            setSaving(false)
        }
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
                <h1 className="text-2xl font-bold text-foreground">SEO Ayarları</h1>
                <p className="text-muted-foreground">
                    Her sayfa için meta verileri ve SEO ayarlarını yönetin
                </p>
            </div>

            {/* Page Selector */}
            <div className="flex flex-wrap gap-2">
                {pages.map((page) => (
                    <Button
                        key={page.value}
                        variant={selectedPage === page.value ? "default" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => setSelectedPage(page.value)}
                    >
                        {page.label}
                    </Button>
                ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    {/* Page Title */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            <Globe className="inline h-4 w-4 mr-2" />
                            Sayfa Başlığı (Title)
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Sayfa Başlığı | Gökler İnşaat"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            Önerilen: 50-60 karakter
                        </p>
                    </div>

                    {/* Meta Description */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            <Search className="inline h-4 w-4 mr-2" />
                            Meta Açıklama (Description)
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            placeholder="Sayfa hakkında kısa açıklama..."
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            Önerilen: 150-160 karakter
                        </p>
                    </div>

                    {/* Keywords */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Anahtar Kelimeler
                        </label>
                        <input
                            type="text"
                            value={formData.keywords}
                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="inşaat, konut, proje, ..."
                        />
                    </div>

                    {/* OG Image */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Sosyal Medya Görseli (OG Image)
                        </label>
                        <input
                            type="url"
                            value={formData.ogImage}
                            onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="https://..."
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            Önerilen boyut: 1200x630 piksel
                        </p>
                    </div>
                </div>

                {/* SEO Preview */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-sm font-medium text-foreground mb-4">Google Önizleme</h3>
                    <div className="p-4 bg-white rounded-xl">
                        <p className="text-blue-600 text-lg font-medium truncate">
                            {formData.title || "Sayfa Başlığı | Gökler İnşaat"}
                        </p>
                        <p className="text-green-700 text-sm">
                            goklerinsaat.com/{selectedPage === "home" ? "" : selectedPage}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                            {formData.description || "Meta açıklama burada görünecek..."}
                        </p>
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
