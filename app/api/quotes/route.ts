import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - List all quotes (admin only)
export async function GET(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get("status")

        const where = status ? { status } : {}

        const quotes = await prisma.quote.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(quotes)
    } catch (error) {
        console.error("Error fetching quotes:", error)
        return NextResponse.json(
            { error: "Failed to fetch quotes" },
            { status: 500 }
        )
    }
}

// POST - Create new quote (public - form submission)
export async function POST(request: Request) {
    try {
        const data = await request.json()

        const quote = await prisma.quote.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company,
                projectType: data.projectType,
                budget: data.budget,
                location: data.location,
                timeline: data.timeline,
                message: data.message,
                status: "new",
            },
        })

        return NextResponse.json(quote, { status: 201 })
    } catch (error) {
        console.error("Error creating quote:", error)
        return NextResponse.json(
            { error: "Failed to submit quote request" },
            { status: 500 }
        )
    }
}
