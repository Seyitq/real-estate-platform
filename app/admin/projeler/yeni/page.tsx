"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewProjectPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "Konut",
        location: "",
        year: new Date().getFullYear().toString(),
        area: "",
        client: "",
        status: "ongoing",
        image: "",
        description: "",
        features: "",
        tags: "",
        published: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData((prev) => ({
            ...prev,
            title,
            slug: generateSlug(title),
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Use uploaded image or URL from text input
            const imageUrl = imagePreview || formData.image

            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl,
                    features: JSON.stringify(formData.features.split(",").map((f) => f.trim()).filter(Boolean)),
                    tags: JSON.stringify(formData.tags.split(",").map((t) => t.trim()).filter(Boolean)),
                    gallery: JSON.stringify([imageUrl].filter(Boolean)),
                }),
            })

            if (response.ok) {
                router.push("/admin/projeler")
            } else {
                alert("Proje oluşturulurken bir hata oluştu")
            }
        } catch (error) {
            console.error("Error creating project:", error)
            alert("Bir hata oluştu")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/projeler">
                    <Button variant="ghost" size="icon" className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Yeni Proje</h1>
                    <p className="text-muted-foreground">Yeni proje ekleyin</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Proje Adı *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="Park Rezidans"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                URL Slug
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="park-rezidans"
                            />
                        </div>
                    </div>

                    {/* Category & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kategori *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                            >
                                <option value="Konut">Konut</option>
                                <option value="Ticari">Ticari</option>
                                <option value="Endüstriyel">Endüstriyel</option>
                                <option value="Restorasyon">Restorasyon</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Durum
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                            >
                                <option value="ongoing">Devam Ediyor</option>
                                <option value="completed">Tamamlandı</option>
                            </select>
                        </div>
                    </div>

                    {/* Location & Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Konum *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="İstanbul, Beşiktaş"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Yıl
                            </label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="2024"
                            />
                        </div>
                    </div>

                    {/* Area & Client */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Alan
                            </label>
                            <input
                                type="text"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="25.000 m²"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Müşteri
                            </label>
                            <input
                                type="text"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="ABC Şirketi"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-foreground">
                            Proje Görseli
                        </label>

                        {/* File Upload */}
                        <div className="flex flex-col gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-foreground file:text-background hover:file:bg-foreground/90"
                            />

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null)
                                            setImagePreview("")
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                    >
                                        Sil
                                    </button>
                                </div>
                            )}

                            {/* URL Input as Alternative */}
                            <div>
                                <label className="block text-sm text-muted-foreground mb-2">
                                    veya Görsel URL girin
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                    placeholder="https://..."
                                    disabled={!!imagePreview}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Açıklama
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground resize-none"
                            placeholder="Proje hakkında detaylı açıklama..."
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Özellikler (virgülle ayırın)
                        </label>
                        <input
                            type="text"
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                            placeholder="Havuz, Fitness, Otopark"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Etiketler (virgülle ayırın)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                            placeholder="Lüks, Modern, Merkezi"
                        />
                    </div>

                    {/* Published */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-border"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-foreground">
                            Hemen yayınla
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4">
                    <Link href="/admin/projeler">
                        <Button variant="outline" className="rounded-xl">
                            İptal
                        </Button>
                    </Link>
                    <Button type="submit" disabled={loading} className="rounded-xl">
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
