import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - Get single contact
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

        const contact = await prisma.contact.findUnique({
            where: { id },
        })

        if (!contact) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 })
        }

        return NextResponse.json(contact)
    } catch (error) {
        console.error("Error fetching contact:", error)
        return NextResponse.json(
            { error: "Failed to fetch contact" },
            { status: 500 }
        )
    }
}

// PUT - Update contact status
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

        const contact = await prisma.contact.update({
            where: { id },
            data: {
                status: data.status,
            },
        })

        return NextResponse.json(contact)
    } catch (error) {
        console.error("Error updating contact:", error)
        return NextResponse.json(
            { error: "Failed to update contact" },
            { status: 500 }
        )
    }
}

// DELETE - Delete contact
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

        await prisma.contact.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting contact:", error)
        return NextResponse.json(
            { error: "Failed to delete contact" },
            { status: 500 }
        )
    }
}
