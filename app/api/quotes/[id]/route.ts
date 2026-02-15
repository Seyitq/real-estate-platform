import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - Get single quote
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params

        const quote = await prisma.quote.findUnique({
            where: { id },
        })

        if (!quote) {
            return NextResponse.json({ error: "Quote not found" }, { status: 404 })
        }

        return NextResponse.json(quote)
    } catch (error) {
        console.error("Error fetching quote:", error)
        return NextResponse.json(
            { error: "Failed to fetch quote" },
            { status: 500 }
        )
    }
}

// PUT - Update quote status/notes
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

        const quote = await prisma.quote.update({
            where: { id },
            data: {
                status: data.status,
                notes: data.notes,
            },
        })

        return NextResponse.json(quote)
    } catch (error) {
        console.error("Error updating quote:", error)
        return NextResponse.json(
            { error: "Failed to update quote" },
            { status: 500 }
        )
    }
}

// DELETE - Delete quote
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

        await prisma.quote.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting quote:", error)
        return NextResponse.json(
            { error: "Failed to delete quote" },
            { status: 500 }
        )
    }
}
