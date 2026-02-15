"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = ["Sektör", "Tasarım", "Rehber", "Güvenlik", "Teknoloji", "Finans"]

interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    image: string
    author: string
    category: string
    readTime: string
    published: boolean
}

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<BlogPost | null>(null)

    useEffect(() => {
        fetchPost()
    }, [id])

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${id}`)
            if (response.ok) {
                const data = await response.json()
                setFormData(data)
            }
        } catch (error) {
            console.error("Error fetching post:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!formData) return
        const { name, value, type } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return
        setSaving(true)

        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                router.push("/admin/blog")
            } else {
                alert("Bir hata oluştu")
            }
        } catch (error) {
            console.error("Error updating post:", error)
            alert("Bir hata oluştu")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return

        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                router.push("/admin/blog")
            }
        } catch (error) {
            console.error("Error deleting post:", error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!formData) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Yazı bulunamadı</p>
                <Link href="/admin/blog" className="text-primary hover:underline mt-2 inline-block">
                    Geri Dön
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <Button variant="ghost" size="sm" className="rounded-lg">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Yazıyı Düzenle</h1>
                        <p className="text-muted-foreground">{formData.title}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-destructive hover:text-destructive"
                    onClick={handleDelete}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Sil
                </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Başlık *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    {/* Category & Author & Read Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kategori *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Yazar *
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Okuma Süresi
                            </label>
                            <input
                                type="text"
                                name="readTime"
                                value={formData.readTime}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Kapak Görseli URL *
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Özet *
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows={2}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            İçerik (Markdown) *
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={15}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                        />
                    </div>

                    {/* Published */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-border bg-secondary text-primary focus:ring-ring"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-foreground">
                            Yayınla
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link href="/admin/blog">
                        <Button type="button" variant="outline" className="rounded-xl">
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
