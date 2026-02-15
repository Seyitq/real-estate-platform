import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - Get single blog post
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const post = await prisma.blog.findUnique({
            where: { id },
        })

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        return NextResponse.json(post)
    } catch (error) {
        console.error("Error fetching blog post:", error)
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 }
        )
    }
}

// PUT - Update blog post (admin only)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const data = await request.json()

        const post = await prisma.blog.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                image: data.image,
                author: data.author,
                category: data.category,
                readTime: data.readTime,
                published: data.published,
            },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error("Error updating blog post:", error)
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        )
    }
}

// DELETE - Delete blog post (admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params

        await prisma.blog.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting blog post:", error)
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        )
    }
}
