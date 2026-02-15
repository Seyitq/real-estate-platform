"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditProjectPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "Konut",
        location: "",
        year: "",
        area: "",
        client: "",
        status: "ongoing",
        image: "",
        description: "",
        features: "",
        tags: "",
        published: false,
    })

    useEffect(() => {
        fetchProject()
    }, [id])

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${id}`)
            if (response.ok) {
                const project = await response.json()
                setFormData({
                    ...project,
                    features: Array.isArray(project.features) ? project.features.join(", ") :
                        typeof project.features === "string" ? (JSON.parse(project.features) || []).join(", ") : "",
                    tags: Array.isArray(project.tags) ? project.tags.join(", ") :
                        typeof project.tags === "string" ? (JSON.parse(project.tags) || []).join(", ") : "",
                })
            }
        } catch (error) {
            console.error("Error fetching project:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    features: JSON.stringify(formData.features.split(",").map((f) => f.trim()).filter(Boolean)),
                    tags: JSON.stringify(formData.tags.split(",").map((t) => t.trim()).filter(Boolean)),
                }),
            })

            if (response.ok) {
                router.push("/admin/projeler")
            } else {
                alert("Proje güncellenirken bir hata oluştu")
            }
        } catch (error) {
            console.error("Error updating project:", error)
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/projeler">
                    <Button variant="ghost" size="icon" className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Projeyi Düzenle</h1>
                    <p className="text-muted-foreground">{formData.title}</p>
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
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
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
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Görsel URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                        />
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
                            Yayında
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
                    <Button type="submit" disabled={saving} className="rounded-xl">
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
