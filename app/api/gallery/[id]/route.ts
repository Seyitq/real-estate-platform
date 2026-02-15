import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// DELETE gallery item
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params

        await prisma.gallery.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting gallery item:", error)
        return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
    }
}

// PUT update gallery item
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const { title, category, image, published, order } = body

        const galleryItem = await prisma.gallery.update({
            where: { id },
            data: {
                title,
                category,
                image,
                published,
                order,
            },
        })

        return NextResponse.json(galleryItem)
    } catch (error) {
        console.error("Error updating gallery item:", error)
        return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
    }
}
