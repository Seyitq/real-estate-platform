import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - List all projects
export async function GET(request: Request) {
    try {
        const session = await auth()
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category")
        const status = searchParams.get("status")

        const where: Record<string, unknown> = {}

        if (!session?.user) {
            where.published = true
        }

        if (category) {
            where.category = category
        }

        if (status) {
            where.status = status
        }

        const projects = await prisma.project.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error("Error fetching projects:", error)
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        )
    }
}

// POST - Create new project
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await request.json()

        if (!data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
        }

        const project = await prisma.project.create({
            data: {
                slug: data.slug,
                title: data.title,
                category: data.category,
                location: data.location,
                year: data.year,
                area: data.area,
                client: data.client,
                status: data.status || "ongoing",
                image: data.image,
                gallery: data.gallery || [],
                description: data.description,
                features: data.features || [],
                tags: data.tags || [],
                published: data.published || false,
            },
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error("Error creating project:", error)
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        )
    }
}
