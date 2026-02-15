import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - List all blog posts (public: only published, admin: all)
export async function GET(request: Request) {
    try {
        const session = await auth()
        const { searchParams } = new URL(request.url)
        const published = searchParams.get("published")
        const category = searchParams.get("category")

        const where: Record<string, unknown> = {}

        // If not admin, only show published posts
        if (!session?.user) {
            where.published = true
        } else if (published !== null) {
            where.published = published === "true"
        }

        if (category) {
            where.category = category
        }

        const posts = await prisma.blog.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(posts)
    } catch (error) {
        console.error("Error fetching blog posts:", error)
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        )
    }
}

// POST - Create new blog post (admin only)
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await request.json()

        // Generate slug from title if not provided
        if (!data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim()
        }

        const post = await prisma.blog.create({
            data: {
                slug: data.slug,
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                image: data.image,
                author: data.author,
                category: data.category,
                readTime: data.readTime || "5 dk",
                published: data.published || false,
            },
        })

        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error("Error creating blog post:", error)
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 }
        )
    }
}
