"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Mail, Phone, Eye, EyeOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Contact {
    id: string
    name: string
    email: string
    phone: string | null
    subject: string
    message: string
    status: string
    createdAt: string
}

const statusOptions = [
    { value: "unread", label: "Okunmadı", color: "bg-blue-500/10 text-blue-500" },
    { value: "read", label: "Okundu", color: "bg-gray-500/10 text-gray-500" },
    { value: "replied", label: "Yanıtlandı", color: "bg-green-500/10 text-green-500" },
]

export default function MessagesPage() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [filter, setFilter] = useState<string>("")

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        try {
            const response = await fetch("/api/contacts")
            if (response.ok) {
                const data = await response.json()
                setContacts(data)
            }
        } catch (error) {
            console.error("Error fetching contacts:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })
            if (response.ok) {
                fetchContacts()
                if (selectedContact?.id === id) {
                    setSelectedContact({ ...selectedContact, status })
                }
            }
        } catch (error) {
            console.error("Error updating contact:", error)
        }
    }

    const deleteContact = async (id: string) => {
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return

        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                fetchContacts()
                if (selectedContact?.id === id) {
                    setSelectedContact(null)
                }
            }
        } catch (error) {
            console.error("Error deleting contact:", error)
        }
    }

    const handleSelectContact = (contact: Contact) => {
        setSelectedContact(contact)
        if (contact.status === "unread") {
            updateStatus(contact.id, "read")
        }
    }

    const filteredContacts = contacts.filter((c) =>
        filter ? c.status === filter : true
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
                <h1 className="text-2xl font-bold text-foreground">İletişim Mesajları</h1>
                <p className="text-muted-foreground">
                    {contacts.length} mesaj ({contacts.filter((c) => c.status === "unread").length} okunmamış)
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
                    Tümü ({contacts.length})
                </Button>
                {statusOptions.map((status) => (
                    <Button
                        key={status.value}
                        variant={filter === status.value ? "default" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => setFilter(status.value)}
                    >
                        {status.label} ({contacts.filter((c) => c.status === status.value).length})
                    </Button>
                ))}
            </div>

            {/* List & Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
                    {filteredContacts.length === 0 ? (
                        <p className="text-center py-12 text-muted-foreground">
                            Mesaj bulunamadı
                        </p>
                    ) : (
                        filteredContacts.map((contact) => (
                            <button
                                key={contact.id}
                                onClick={() => handleSelectContact(contact)}
                                className={`w-full p-4 bg-card rounded-xl border text-left transition-colors ${selectedContact?.id === contact.id
                                        ? "border-primary"
                                        : "border-border hover:border-muted-foreground/30"
                                    } ${contact.status === "unread" ? "bg-primary/5" : ""}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`font-medium ${contact.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}>
                                        {contact.name}
                                    </span>
                                    {contact.status === "unread" && (
                                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground font-medium">{contact.subject}</p>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                    {contact.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {format(new Date(contact.createdAt), "d MMM, HH:mm", { locale: tr })}
                                </p>
                            </button>
                        ))
                    )}
                </div>

                {/* Detail */}
                <div className="lg:col-span-2">
                    {selectedContact ? (
                        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">{selectedContact.name}</h2>
                                    <p className="text-muted-foreground">{selectedContact.subject}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={selectedContact.status}
                                        onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-full border-0 ${getStatusColor(selectedContact.status)}`}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-lg text-destructive hover:text-destructive"
                                        onClick={() => deleteContact(selectedContact.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={`mailto:${selectedContact.email}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                                >
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{selectedContact.email}</span>
                                </a>
                                {selectedContact.phone && (
                                    <a
                                        href={`tel:${selectedContact.phone}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                                    >
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-foreground">{selectedContact.phone}</span>
                                    </a>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-2">Mesaj</h3>
                                <p className="text-foreground whitespace-pre-wrap p-4 bg-secondary/50 rounded-xl">
                                    {selectedContact.message}
                                </p>
                            </div>

                            {/* Date */}
                            <p className="text-xs text-muted-foreground">
                                Gönderim: {format(new Date(selectedContact.createdAt), "d MMMM yyyy, HH:mm", { locale: tr })}
                            </p>

                            {/* Reply Button */}
                            <a
                                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                                className="block"
                            >
                                <Button className="w-full rounded-xl">
                                    <Mail className="h-4 w-4 mr-2" />
                                    E-posta ile Yanıtla
                                </Button>
                            </a>
                        </div>
                    ) : (
                        <div className="bg-card rounded-2xl border border-border p-12 text-center">
                            <p className="text-muted-foreground">
                                Detayları görüntülemek için bir mesaj seçin
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
