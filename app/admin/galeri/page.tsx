"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryItem {
    id: string
    title: string
    category: string
    image: string
    published: boolean
    order: number
    createdAt: string
}

export default function AdminGalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "Konut",
        image: "",
        published: true,
        order: 0,
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            const response = await fetch("/api/gallery")
            const data = await response.json()
            setGallery(data)
        } catch (error) {
            console.error("Error fetching gallery:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
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
            const imageUrl = imagePreview || formData.image

            const response = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl,
                }),
            })

            if (response.ok) {
                setShowForm(false)
                setFormData({
                    title: "",
                    category: "Konut",
                    image: "",
                    published: true,
                    order: 0,
                })
                setImageFile(null)
                setImagePreview("")
                fetchGallery()
            } else {
                alert("Görsel eklenirken bir hata oluştu")
            }
        } catch (error) {
            console.error("Error creating gallery item:", error)
            alert("Bir hata oluştu")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Bu görseli silmek istediğinizden emin misiniz?")) return

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                fetchGallery()
            } else {
                alert("Silme işlemi başarısız oldu")
            }
        } catch (error) {
            console.error("Error deleting gallery item:", error)
            alert("Bir hata oluştu")
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Galeri Yönetimi</h1>
                    <p className="text-muted-foreground">Foto galeri görsellerinizi yönetin</p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-xl"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {showForm ? "Formu Kapat" : "Yeni Görsel"}
                </Button>
            </div>

            {/* Add Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Başlık *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                                placeholder="Modern Rezidans Projesi"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kategori *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground"
                            >
                                <option value="Konut">Konut</option>
                                <option value="Ticari">Ticari</option>
                                <option value="Endüstriyel">Endüstriyel</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-foreground">
                            Görsel
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-foreground file:text-background hover:file:bg-foreground/90"
                        />
                        {imagePreview && (
                            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="h-5 w-5 rounded border-border"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-foreground">
                            Hemen yayınla
                        </label>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowForm(false)}
                            className="rounded-xl"
                        >
                            İptal
                        </Button>
                        <Button type="submit" disabled={loading} className="rounded-xl">
                            Kaydet
                        </Button>
                    </div>
                </form>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                    <div
                        key={item.id}
                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => handleDelete(item.id)}
                                className="rounded-xl"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="inline-block px-2 py-1 text-xs bg-white text-black rounded mb-1">
                                {item.category}
                            </span>
                            <h3 className="text-white font-medium text-sm">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {gallery.length === 0 && !loading && (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                    <p className="text-muted-foreground">Henüz görsel eklenmemiş</p>
                </div>
            )}
        </div>
    )
}
