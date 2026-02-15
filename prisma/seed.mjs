import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, "dev.db")

const database = new Database(dbPath)
const adapter = new PrismaBetterSqlite3(database)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("🌱 Seeding database...")
    console.log("Database path:", dbPath)

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)

    const adminUser = await prisma.user.upsert({
        where: { email: "admin@goklerinsaat.com" },
        update: {},
        create: {
            email: "admin@goklerinsaat.com",
            name: "Admin",
            password: hashedPassword,
            role: "admin",
        },
    })
    console.log("✅ Admin user created:", adminUser.email)

    // Create blog posts
    const blogPosts = [
        {
            slug: "2024-insaat-trendleri",
            title: "2024 İnşaat Sektörü Trendleri",
            excerpt: "Sürdürülebilir yapılar, akıllı bina teknolojileri ve modüler inşaat yöntemleri.",
            content: "## 2024'te İnşaat Sektörünü Şekillendirecek Trendler\n\nİnşaat sektörü hızla dönüşüyor.",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1170",
            author: "Mehmet Gökler",
            category: "Sektör",
            readTime: "5 dk",
            published: true,
        },
    ]

    for (const post of blogPosts) {
        await prisma.blog.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        })
    }
    console.log("✅ Blog posts created")

    // Create projects
    const projects = [
        {
            slug: "park-rezidans",
            title: "Park Rezidans",
            category: "Konut",
            location: "İstanbul, Beşiktaş",
            year: "2023",
            area: "25.000 m²",
            client: "Park Gayrimenkul A.Ş.",
            status: "completed",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1035",
            gallery: JSON.stringify(["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1035"]),
            description: "İstanbul Beşiktaş'ın kalbinde, park manzaralı lüks rezidans projesi.",
            features: JSON.stringify(["40 Lüks Daire", "Açık & Kapalı Havuz", "Fitness Center"]),
            tags: JSON.stringify(["Lüks Konut", "40 Daire", "Havuzlu"]),
            published: true,
        },
    ]

    for (const project of projects) {
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: {},
            create: project,
        })
    }
    console.log("✅ Projects created")

    // Create testimonials
    await prisma.testimonial.create({
        data: {
            name: "Ahmet Yılmaz",
            role: "Proje Sahibi",
            company: "Yılmaz Holding",
            content: "Gökler İnşaat ile çalışmak gerçekten profesyonel bir deneyimdi.",
            rating: 5,
            published: true,
        },
    })
    console.log("✅ Testimonials created")

    // Create SEO settings
    await prisma.seoSettings.upsert({
        where: { page: "home" },
        update: {},
        create: {
            page: "home",
            title: "Gökler İnşaat | Güvenilir İnşaat Çözümleri",
            description: "25 yılı aşkın tecrübemizle kaliteli inşaat çözümleri sunuyoruz.",
            keywords: "inşaat, müteahhit, konut projeleri",
        },
    })
    console.log("✅ SEO settings created")

    // Create site settings
    const existingSettings = await prisma.siteSettings.findFirst()
    if (!existingSettings) {
        await prisma.siteSettings.create({
            data: {
                companyName: "Gökler İnşaat",
                phone: "+90 (212) 123 45 67",
                email: "info@goklerinsaat.com",
                address: "Merkez Mah. İnşaat Cad. No:123, Kadıköy, İstanbul",
            },
        })
    }
    console.log("✅ Site settings created")

    console.log("🎉 Database seeding completed!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
