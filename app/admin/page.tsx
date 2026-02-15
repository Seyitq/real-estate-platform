"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
    FileText,
    Building2,
    FileQuestion,
    Mail,
    ArrowRight,
    Clock,
    TrendingUp,
} from "lucide-react"

interface DashboardData {
    stats: {
        newQuotes: number
        unreadContacts: number
        totalProjects: number
        totalBlogPosts: number
        publishedProjects: number
        publishedBlogPosts: number
    }
    recentQuotes: Array<{
        id: string
        name: string
        projectType: string
        status: string
        createdAt: string
    }>
    recentContacts: Array<{
        id: string
        name: string
        subject: string
        status: string
        createdAt: string
    }>
}

const statusColors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-500",
    contacted: "bg-yellow-500/10 text-yellow-500",
    quoted: "bg-purple-500/10 text-purple-500",
    closed: "bg-green-500/10 text-green-500",
    unread: "bg-blue-500/10 text-blue-500",
    read: "bg-gray-500/10 text-gray-500",
    replied: "bg-green-500/10 text-green-500",
}

const statusLabels: Record<string, string> = {
    new: "Yeni",
    contacted: "İletişime Geçildi",
    quoted: "Teklif Verildi",
    closed: "Kapatıldı",
    unread: "Okunmadı",
    read: "Okundu",
    replied: "Yanıtlandı",
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const response = await fetch("/api/dashboard")
            if (response.ok) {
                const data = await response.json()
                setData(data)
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const statCards = [
        {
            title: "Yeni Teklif Talepleri",
            value: data?.stats.newQuotes || 0,
            icon: FileQuestion,
            href: "/admin/teklifler",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            title: "Okunmamış Mesajlar",
            value: data?.stats.unreadContacts || 0,
            icon: Mail,
            href: "/admin/mesajlar",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
        {
            title: "Toplam Proje",
            value: data?.stats.totalProjects || 0,
            subValue: `${data?.stats.publishedProjects || 0} yayında`,
            icon: Building2,
            href: "/admin/projeler",
            color: "text-green-500",
            bgColor: "bg-green-500/10",
        },
        {
            title: "Blog Yazıları",
            value: data?.stats.totalBlogPosts || 0,
            subValue: `${data?.stats.publishedBlogPosts || 0} yayında`,
            icon: FileText,
            href: "/admin/blog",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
        },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="mt-1 text-muted-foreground">
                    Hoş geldiniz! İşte sitenizin genel durumu.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                    <Link
                        key={stat.title}
                        href={stat.href}
                        className="group p-6 bg-card rounded-2xl border border-border hover:border-muted-foreground/30 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            {stat.subValue && (
                                <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Quotes */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Son Teklif Talepleri</h2>
                        <Link
                            href="/admin/teklifler"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Tümünü Gör →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {data?.recentQuotes.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                Henüz teklif talebi yok
                            </p>
                        ) : (
                            data?.recentQuotes.map((quote) => (
                                <Link
                                    key={quote.id}
                                    href={`/admin/teklifler/${quote.id}`}
                                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-foreground">{quote.name}</p>
                                        <p className="text-sm text-muted-foreground">{quote.projectType}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[quote.status]}`}>
                                            {statusLabels[quote.status]}
                                        </span>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {format(new Date(quote.createdAt), "d MMM", { locale: tr })}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Contacts */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Son Mesajlar</h2>
                        <Link
                            href="/admin/mesajlar"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Tümünü Gör →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {data?.recentContacts.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                Henüz mesaj yok
                            </p>
                        ) : (
                            data?.recentContacts.map((contact) => (
                                <Link
                                    key={contact.id}
                                    href={`/admin/mesajlar/${contact.id}`}
                                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-foreground">{contact.name}</p>
                                        <p className="text-sm text-muted-foreground">{contact.subject}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[contact.status]}`}>
                                            {statusLabels[contact.status]}
                                        </span>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {format(new Date(contact.createdAt), "d MMM", { locale: tr })}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
