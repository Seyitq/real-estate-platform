import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/sidebar"
import { SessionProvider } from "next-auth/react"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        redirect("/giris")
    }

    return (
        <SessionProvider session={session}>
            <div className="min-h-screen bg-background">
                <AdminSidebar />
                <main className="lg:pl-64">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </SessionProvider>
    )
}
