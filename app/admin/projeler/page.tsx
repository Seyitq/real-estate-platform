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
    MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
    id: string
    slug: string
    title: string
    category: string
    location: string
    year: string
    status: string
    published: boolean
    createdAt: string
}

export default function ProjectsManagementPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/projects")
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            }
        } catch (error) {
            console.error("Error fetching projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const togglePublished = async (id: string, published: boolean) => {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !published }),
            })
            if (response.ok) {
                fetchProjects()
            }
        } catch (error) {
            console.error("Error updating project:", error)
        }
    }

    const deleteProject = async (id: string) => {
        if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                fetchProjects()
            }
        } catch (error) {
            console.error("Error deleting project:", error)
        }
    }

    const filteredProjects = projects.filter(
        (p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.location.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h1 className="text-2xl font-bold text-foreground">Projeler</h1>
                    <p className="text-muted-foreground">
                        {projects.length} proje ({projects.filter((p) => p.published).length} yayında)
                    </p>
                </div>
                <Link href="/admin/projeler/yeni">
                    <Button className="rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Proje
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Proje ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length === 0 ? (
                    <p className="col-span-full text-center py-12 text-muted-foreground">
                        Proje bulunamadı
                    </p>
                ) : (
                    filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-card rounded-2xl border border-border overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-secondary text-foreground rounded-full">
                                        {project.category}
                                    </span>
                                    <button
                                        onClick={() => togglePublished(project.id, project.published)}
                                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${project.published
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-gray-500/10 text-gray-500"
                                            }`}
                                    >
                                        {project.published ? (
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
                                </div>

                                <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>

                                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                    <MapPin className="h-4 w-4" />
                                    {project.location}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{project.year}</span>
                                    <span className={`${project.status === "completed" ? "text-green-500" : "text-yellow-500"
                                        }`}>
                                        {project.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                                    <Link href={`/admin/projeler/${project.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full rounded-lg">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Düzenle
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-lg text-destructive hover:text-destructive"
                                        onClick={() => deleteProject(project.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
