import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
    try {
        const settings = await prisma.seoSettings.findMany()
        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error fetching SEO settings:", error)
        return NextResponse.json([])
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { page, title, description, keywords, ogImage } = body

        const setting = await prisma.seoSettings.upsert({
            where: { page },
            update: {
                title,
                description,
                keywords,
                ogImage,
            },
            create: {
                page,
                title,
                description,
                keywords,
                ogImage,
            },
        })

        return NextResponse.json(setting)
    } catch (error) {
        console.error("Error saving SEO settings:", error)
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }
}
