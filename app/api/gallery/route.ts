import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET all gallery items
export async function GET() {
    try {
        const gallery = await prisma.gallery.findMany({
            where: { published: true },
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        })

        return NextResponse.json(gallery)
    } catch (error) {
        console.error("Error fetching gallery:", error)
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
    }
}

// POST new gallery item
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { title, category, image, published, order } = body

        const galleryItem = await prisma.gallery.create({
            data: {
                title,
                category,
                image,
                published: published ?? true,
                order: order ?? 0,
            },
        })

        return NextResponse.json(galleryItem)
    } catch (error) {
        console.error("Error creating gallery item:", error)
        return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
    }
}
