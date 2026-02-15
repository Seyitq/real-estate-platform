import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET - Get single project
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const project = await prisma.project.findUnique({
            where: { id },
        })

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json(project)
    } catch (error) {
        console.error("Error fetching project:", error)
        return NextResponse.json(
            { error: "Failed to fetch project" },
            { status: 500 }
        )
    }
}

// PUT - Update project
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

        const project = await prisma.project.update({
            where: { id },
            data,
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error("Error updating project:", error)
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        )
    }
}

// DELETE - Delete project
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

        await prisma.project.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting project:", error)
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        )
    }
}
