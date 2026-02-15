"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
    Search,
    Eye,
    Clock,
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    Building2,
    Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Quote {
    id: string
    name: string
    email: string
    phone: string
    company: string | null
    projectType: string
    budget: string
    location: string
    timeline: string | null
    message: string | null
    status: string
    notes: string | null
    createdAt: string
}

const statusOptions = [
    { value: "new", label: "Yeni", color: "bg-blue-500/10 text-blue-500" },
    { value: "contacted", label: "İletişime Geçildi", color: "bg-yellow-500/10 text-yellow-500" },
    { value: "quoted", label: "Teklif Verildi", color: "bg-purple-500/10 text-purple-500" },
    { value: "closed", label: "Kapatıldı", color: "bg-green-500/10 text-green-500" },
]

export default function QuotesManagementPage() {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
    const [filter, setFilter] = useState<string>("")

    useEffect(() => {
        fetchQuotes()
    }, [])

    const fetchQuotes = async () => {
        try {
            const response = await fetch("/api/quotes")
            if (response.ok) {
                const data = await response.json()
                setQuotes(data)
            }
        } catch (error) {
            console.error("Error fetching quotes:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/quotes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })
            if (response.ok) {
                fetchQuotes()
                if (selectedQuote?.id === id) {
                    setSelectedQuote({ ...selectedQuote, status })
                }
            }
        } catch (error) {
            console.error("Error updating quote:", error)
        }
    }

    const filteredQuotes = quotes.filter((q) =>
        filter ? q.status === filter : true
    )

    const getStatusColor = (status: string) => {
        return statusOptions.find((s) => s.value === status)?.color || ""
    }

    const getStatusLabel = (status: string) => {
        return statusOptions.find((s) => s.value === status)?.label || status
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
            <div>
                <h1 className="text-2xl font-bold text-foreground">Teklif Talepleri</h1>
                <p className="text-muted-foreground">
                    {quotes.length} talep ({quotes.filter((q) => q.status === "new").length} yeni)
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={filter === "" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setFilter("")}
                >
                    Tümü ({quotes.length})
                </Button>
                {statusOptions.map((status) => (
                    <Button
                        key={status.value}
                        variant={filter === status.value ? "default" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => setFilter(status.value)}
                    >
                        {status.label} ({quotes.filter((q) => q.status === status.value).length})
                    </Button>
                ))}
            </div>

            {/* List & Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="lg:col-span-1 space-y-3">
                    {filteredQuotes.length === 0 ? (
                        <p className="text-center py-12 text-muted-foreground">
                            Teklif talebi bulunamadı
                        </p>
                    ) : (
                        filteredQuotes.map((quote) => (
                            <button
                                key={quote.id}
                                onClick={() => setSelectedQuote(quote)}
                                className={`w-full p-4 bg-card rounded-xl border text-left transition-colors ${selectedQuote?.id === quote.id
                                        ? "border-primary"
                                        : "border-border hover:border-muted-foreground/30"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-foreground">{quote.name}</span>
                                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                                        {getStatusLabel(quote.status)}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{quote.projectType}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {format(new Date(quote.createdAt), "d MMM yyyy, HH:mm", { locale: tr })}
                                </p>
                            </button>
                        ))
                    )}
                </div>

                {/* Detail */}
                <div className="lg:col-span-2">
                    {selectedQuote ? (
                        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">{selectedQuote.name}</h2>
                                    {selectedQuote.company && (
                                        <p className="text-muted-foreground">{selectedQuote.company}</p>
                                    )}
                                </div>
                                <select
                                    value={selectedQuote.status}
                                    onChange={(e) => updateStatus(selectedQuote.id, e.target.value)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-full border-0 ${getStatusColor(selectedQuote.status)}`}
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href={`mailto:${selectedQuote.email}`}
                                    className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                                >
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{selectedQuote.email}</span>
                                </a>
                                <a
                                    href={`tel:${selectedQuote.phone}`}
                                    className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                                >
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{selectedQuote.phone}</span>
                                </a>
                            </div>

                            {/* Project Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="p-4 bg-secondary/50 rounded-xl">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Building2 className="h-4 w-4" />
                                        <span className="text-xs">Proje Tipi</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{selectedQuote.projectType}</p>
                                </div>
                                <div className="p-4 bg-secondary/50 rounded-xl">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <span className="text-xs">💰 Bütçe</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{selectedQuote.budget}</p>
                                </div>
                                <div className="p-4 bg-secondary/50 rounded-xl">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-xs">Lokasyon</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{selectedQuote.location}</p>
                                </div>
                                <div className="p-4 bg-secondary/50 rounded-xl">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-xs">Zaman</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{selectedQuote.timeline || "-"}</p>
                                </div>
                            </div>

                            {/* Message */}
                            {selectedQuote.message && (
                                <div>
                                    <h3 className="text-sm font-medium text-foreground mb-2">Mesaj</h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap p-4 bg-secondary/50 rounded-xl">
                                        {selectedQuote.message}
                                    </p>
                                </div>
                            )}

                            {/* Date */}
                            <p className="text-xs text-muted-foreground">
                                Gönderim: {format(new Date(selectedQuote.createdAt), "d MMMM yyyy, HH:mm", { locale: tr })}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-card rounded-2xl border border-border p-12 text-center">
                            <p className="text-muted-foreground">
                                Detayları görüntülemek için bir talep seçin
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
