import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - Get dashboard stats
export async function GET() {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const [
            newQuotes,
            unreadContacts,
            totalProjects,
            totalBlogPosts,
            publishedProjects,
            publishedBlogPosts,
            recentQuotes,
            recentContacts,
        ] = await Promise.all([
            prisma.quote.count({ where: { status: "new" } }),
            prisma.contact.count({ where: { status: "unread" } }),
            prisma.project.count(),
            prisma.blog.count(),
            prisma.project.count({ where: { published: true } }),
            prisma.blog.count({ where: { published: true } }),
            prisma.quote.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    projectType: true,
                    status: true,
                    createdAt: true,
                },
            }),
            prisma.contact.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    subject: true,
                    status: true,
                    createdAt: true,
                },
            }),
        ])

        return NextResponse.json({
            stats: {
                newQuotes,
                unreadContacts,
                totalProjects,
                totalBlogPosts,
                publishedProjects,
                publishedBlogPosts,
            },
            recentQuotes,
            recentContacts,
        })
    } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        return NextResponse.json(
            { error: "Failed to fetch dashboard stats" },
            { status: 500 }
        )
    }
}
