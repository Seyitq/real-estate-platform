import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - List all testimonials
export async function GET() {
    try {
        const session = await auth()

        const where = session?.user ? {} : { published: true }

        const testimonials = await prisma.testimonial.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(testimonials)
    } catch (error) {
        console.error("Error fetching testimonials:", error)
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 }
        )
    }
}

// POST - Create new testimonial
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await request.json()

        const testimonial = await prisma.testimonial.create({
            data: {
                name: data.name,
                role: data.role,
                company: data.company,
                content: data.content,
                image: data.image,
                rating: data.rating || 5,
                published: data.published || false,
            },
        })

        return NextResponse.json(testimonial, { status: 201 })
    } catch (error) {
        console.error("Error creating testimonial:", error)
        return NextResponse.json(
            { error: "Failed to create testimonial" },
            { status: 500 }
        )
    }
}
