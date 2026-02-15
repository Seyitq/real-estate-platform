import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - List all contacts (admin only)
export async function GET(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get("status")

        const where = status ? { status } : {}

        const contacts = await prisma.contact.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(contacts)
    } catch (error) {
        console.error("Error fetching contacts:", error)
        return NextResponse.json(
            { error: "Failed to fetch contacts" },
            { status: 500 }
        )
    }
}

// POST - Create new contact (public - form submission)
export async function POST(request: Request) {
    try {
        const data = await request.json()

        const contact = await prisma.contact.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
                status: "unread",
            },
        })

        return NextResponse.json(contact, { status: 201 })
    } catch (error) {
        console.error("Error creating contact:", error)
        return NextResponse.json(
            { error: "Failed to submit contact message" },
            { status: 500 }
        )
    }
}
