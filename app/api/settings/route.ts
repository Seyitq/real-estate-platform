import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
    try {
        // Get the first (and only) site settings record
        const settings = await prisma.siteSettings.findFirst()
        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error fetching site settings:", error)
        return NextResponse.json(null)
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        // Check if settings exist
        const existing = await prisma.siteSettings.findFirst()

        let settings
        if (existing) {
            settings = await prisma.siteSettings.update({
                where: { id: existing.id },
                data: body,
            })
        } else {
            settings = await prisma.siteSettings.create({
                data: body,
            })
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error saving site settings:", error)
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }
}
