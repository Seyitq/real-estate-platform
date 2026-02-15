"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    author: string
    published: boolean
    createdAt: string
}

export default function BlogManagementPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/blog")
            if (response.ok) {
                const data = await response.json()
                setPosts(data)
            }
        } catch (error) {
            console.error("Error fetching posts:", error)
        } finally {
            setLoading(false)
        }
    }

    const togglePublished = async (id: string, published: boolean) => {
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !published }),
            })
            if (response.ok) {
                fetchPosts()
            }
        } catch (error) {
            console.error("Error updating post:", error)
        }
    }

    const deletePost = async (id: string) => {
        if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return

        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                fetchPosts()
            }
        } catch (error) {
            console.error("Error deleting post:", error)
        }
    }

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                    <h1 className="text-2xl font-bold text-foreground">Blog Yazıları</h1>
                    <p className="text-muted-foreground">
                        {posts.length} yazı ({posts.filter((p) => p.published).length} yayında)
                    </p>
                </div>
                <Link href="/admin/blog/yeni">
                    <Button className="rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Yazı
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Yazı ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Table */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                    Başlık
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                    Kategori
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                    Yazar
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                    Durum
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                    Tarih
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        Blog yazısı bulunamadı
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-foreground">{post.title}</p>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-secondary text-foreground rounded-full">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            {post.author}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePublished(post.id, post.published)}
                                                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${post.published
                                                        ? "bg-green-500/10 text-green-500"
                                                        : "bg-gray-500/10 text-gray-500"
                                                    }`}
                                            >
                                                {post.published ? (
                                                    <>
                                                        <Eye className="h-3 w-3" />
                                                        Yayında
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="h-3 w-3" />
                                                        Taslak
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            {format(new Date(post.createdAt), "d MMM yyyy", { locale: tr })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/blog/${post.id}`}>
                                                    <Button variant="ghost" size="sm" className="rounded-lg">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-lg text-destructive hover:text-destructive"
                                                    onClick={() => deletePost(post.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
