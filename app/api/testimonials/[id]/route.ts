import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - Get single testimonial
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        })

        if (!testimonial) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
        }

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error("Error fetching testimonial:", error)
        return NextResponse.json(
            { error: "Failed to fetch testimonial" },
            { status: 500 }
        )
    }
}

// PUT - Update testimonial
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

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data,
        })

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error("Error updating testimonial:", error)
        return NextResponse.json(
            { error: "Failed to update testimonial" },
            { status: 500 }
        )
    }
}

// DELETE - Delete testimonial
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

        await prisma.testimonial.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting testimonial:", error)
        return NextResponse.json(
            { error: "Failed to delete testimonial" },
            { status: 500 }
        )
    }
}
