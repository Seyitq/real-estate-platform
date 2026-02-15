"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
    LayoutDashboard,
    FileText,
    Building2,
    MessageSquare,
    Mail,
    FileQuestion,
    Settings,
    Search,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Image as ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Yazıları", href: "/admin/blog", icon: FileText },
    { name: "Projeler", href: "/admin/projeler", icon: Building2 },
    { name: "Galeri", href: "/admin/galeri", icon: ImageIcon },
    { name: "Müşteri Yorumları", href: "/admin/yorumlar", icon: MessageSquare },
    { name: "Teklif Talepleri", href: "/admin/teklifler", icon: FileQuestion },
    { name: "İletişim Mesajları", href: "/admin/mesajlar", icon: Mail },
    { name: "SEO Ayarları", href: "/admin/seo", icon: Search },
    { name: "Site Ayarları", href: "/admin/ayarlar", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
            >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-border">
                        <Link href="/admin" className="flex items-center gap-3">
                            <Image src="/logo.avif" alt="Gökler İnşaat" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
                            <div>
                                <h1 className="font-bold text-foreground">Gökler İnşaat</h1>
                                <p className="text-xs text-muted-foreground">Admin Panel</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/admin" && pathname.startsWith(item.href))

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Menu */}
                    <div className="p-4 border-t border-border">
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary-foreground">A</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Admin</p>
                                    <p className="text-xs text-muted-foreground">admin@goklerinsaat.com</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/admin/giris" })}
                            className="flex items-center gap-2 w-full mt-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
