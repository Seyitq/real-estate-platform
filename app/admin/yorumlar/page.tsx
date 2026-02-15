"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Star, Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
    id: string
    name: string
    role: string
    company: string | null
    content: string
    image: string | null
    rating: number
    published: boolean
    createdAt: string
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        content: "",
        rating: 5,
        published: false,
    })

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            const response = await fetch("/api/testimonials")
            if (response.ok) {
                const data = await response.json()
                setTestimonials(data)
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials"
        const method = editingId ? "PUT" : "POST"

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchTestimonials()
                resetForm()
            }
        } catch (error) {
            console.error("Error saving testimonial:", error)
        }
    }

    const togglePublished = async (id: string, published: boolean) => {
        try {
            const response = await fetch(`/api/testimonials/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !published }),
            })
            if (response.ok) {
                fetchTestimonials()
            }
        } catch (error) {
            console.error("Error updating testimonial:", error)
        }
    }

    const deleteTestimonial = async (id: string) => {
        if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return

        try {
            const response = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                fetchTestimonials()
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error)
        }
    }

    const startEdit = (testimonial: Testimonial) => {
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            company: testimonial.company || "",
            content: testimonial.content,
            rating: testimonial.rating,
            published: testimonial.published,
        })
        setEditingId(testimonial.id)
        setShowForm(true)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            role: "",
            company: "",
            content: "",
            rating: 5,
            published: false,
        })
        setEditingId(null)
        setShowForm(false)
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Müşteri Yorumları</h1>
                    <p className="text-muted-foreground">
                        {testimonials.length} yorum ({testimonials.filter((t) => t.published).length} yayında)
                    </p>
                </div>
                <Button className="rounded-xl" onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Yorum
                </Button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        {editingId ? "Yorumu Düzenle" : "Yeni Yorum Ekle"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Ad Soyad *"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <input
                                type="text"
                                placeholder="Unvan *"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                                className="px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <input
                                type="text"
                                placeholder="Şirket (opsiyonel)"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <textarea
                            placeholder="Yorum *"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Puan:</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-5 w-5 ${star <= formData.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-muted-foreground"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="h-4 w-4 rounded border-border bg-secondary text-primary focus:ring-ring"
                                />
                                <span className="text-sm text-foreground">Yayınla</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" className="rounded-xl" onClick={resetForm}>
                                İptal
                            </Button>
                            <Button type="submit" className="rounded-xl">
                                {editingId ? "Güncelle" : "Kaydet"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-card rounded-2xl border border-border p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {testimonial.role}
                                    {testimonial.company && ` - ${testimonial.company}`}
                                </p>
                            </div>
                            <button
                                onClick={() => togglePublished(testimonial.id, testimonial.published)}
                                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${testimonial.published
                                        ? "bg-green-500/10 text-green-500"
                                        : "bg-gray-500/10 text-gray-500"
                                    }`}
                            >
                                {testimonial.published ? (
                                    <>
                                        <Eye className="h-3 w-3" />
                                        Yayında
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="h-3 w-3" />
                                        Gizli
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="flex gap-0.5 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= testimonial.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                        }`}
                                />
                            ))}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            "{testimonial.content}"
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-xs text-muted-foreground">
                                {format(new Date(testimonial.createdAt), "d MMM yyyy", { locale: tr })}
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-lg"
                                    onClick={() => startEdit(testimonial)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-lg text-destructive hover:text-destructive"
                                    onClick={() => deleteTestimonial(testimonial.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
