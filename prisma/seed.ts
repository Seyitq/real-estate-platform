import { PrismaClient } from "@prisma/client/index.js"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Seeding database...")

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
            excerpt: "Sürdürülebilir yapılar, akıllı bina teknolojileri ve modüler inşaat yöntemleri 2024'ün öne çıkan trendleri arasında.",
            content: `## 2024'te İnşaat Sektörünü Şekillendirecek Trendler

İnşaat sektörü, teknolojik gelişmeler ve değişen müşteri beklentileri doğrultusunda hızla dönüşüyor.

### 1. Sürdürülebilir Yapılar
Çevre bilincinin artmasıyla birlikte, yeşil bina sertifikaları ve enerji verimli tasarımlar artık bir tercih değil, zorunluluk haline geldi.

### 2. Akıllı Bina Teknolojileri
IoT sensörleri, otomasyon sistemleri ve yapay zeka destekli bina yönetim sistemleri, binaları daha verimli hale getiriyor.

### 3. Modüler ve Prefabrik İnşaat
Fabrikada üretilen modüller, şantiyede monte edilerek inşaat süresini önemli ölçüde kısaltıyor.`,
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1170",
            author: "Mehmet Gökler",
            category: "Sektör",
            readTime: "5 dk",
            published: true,
        },
        {
            slug: "enerji-verimli-binalar",
            title: "Enerji Verimli Bina Tasarımı",
            excerpt: "Enerji maliyetlerini düşüren ve çevreye duyarlı bina tasarım prensipleri hakkında bilmeniz gerekenler.",
            content: `## Enerji Verimli Bina Tasarımının Temelleri

Artan enerji maliyetleri ve çevresel kaygılar, enerji verimli bina tasarımını her zamankinden daha önemli hale getirdi.

### Pasif Tasarım İlkeleri
- **Güneş Enerjisinden Yararlanma**: Güneş ışığını maksimum düzeyde kullanan pencere konumlandırması
- **Doğal Havalandırma**: Mekanik sistemlere olan bağımlılığı azaltan tasarım
- **Isı Yalıtımı**: Yüksek kaliteli yalıtım malzemeleri ile enerji kaybının önlenmesi`,
            image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1165",
            author: "Ayşe Yılmaz",
            category: "Tasarım",
            readTime: "4 dk",
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
            gallery: JSON.stringify([
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1035",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170",
            ]),
            description: "İstanbul Beşiktaş'ın kalbinde, park manzaralı lüks rezidans projesi. 40 daireden oluşan proje, modern mimari anlayışı ve üstün yaşam kalitesi sunmaktadır.",
            features: JSON.stringify(["40 Lüks Daire", "Açık & Kapalı Havuz", "Fitness Center", "24 Saat Güvenlik"]),
            tags: JSON.stringify(["Lüks Konut", "40 Daire", "Havuzlu"]),
            published: true,
        },
        {
            slug: "merkez-plaza",
            title: "Merkez Plaza",
            category: "Ticari",
            location: "Ankara, Çankaya",
            year: "2022",
            area: "45.000 m²",
            client: "Merkez Holding",
            status: "completed",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170",
            gallery: JSON.stringify([
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170",
                "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=1036",
            ]),
            description: "Ankara'nın prestijli iş merkezinde A+ sınıfı ofis binası. LEED Gold sertifikalı, akıllı bina teknolojileri ile donatılmıştır.",
            features: JSON.stringify(["25 Katlı Ofis Kulesi", "LEED Gold Sertifika", "Helipad", "Konferans Merkezi"]),
            tags: JSON.stringify(["Ofis", "A+ Bina", "Akıllı Bina"]),
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
    const testimonials = [
        {
            name: "Ahmet Yılmaz",
            role: "Proje Sahibi",
            company: "Yılmaz Holding",
            content: "Gökler İnşaat ile çalışmak gerçekten profesyonel bir deneyimdi. Projemiz zamanında ve bütçe dahilinde tamamlandı. Kesinlikle tavsiye ediyorum.",
            rating: 5,
            published: true,
        },
        {
            name: "Fatma Demir",
            role: "Genel Müdür",
            company: "Demir Gayrimenkul",
            content: "Kalite standartları ve iletişimleri mükemmel. Her aşamada bilgilendirildik ve sonuç beklentilerimizin üzerindeydi.",
            rating: 5,
            published: true,
        },
        {
            name: "Mehmet Kaya",
            role: "Ev Sahibi",
            content: "Villa projemizde gösterdikleri özen ve profesyonellik için teşekkür ederiz. Hayalimizdeki evi inşa ettiler.",
            rating: 5,
            published: true,
        },
    ]

    for (const testimonial of testimonials) {
        await prisma.testimonial.create({
            data: testimonial,
        })
    }
    console.log("✅ Testimonials created")

    // Create default SEO settings
    const seoSettings = [
        {
            page: "home",
            title: "Gökler İnşaat | Güvenilir İnşaat Çözümleri",
            description: "25 yılı aşkın tecrübemizle konut, ticari ve endüstriyel projelerde kaliteli inşaat çözümleri sunuyoruz.",
            keywords: "inşaat, müteahhit, konut projeleri, ticari inşaat",
        },
        {
            page: "about",
            title: "Hakkımızda | Gökler İnşaat",
            description: "Gökler İnşaat olarak 25 yılı aşkın tecrübemizle sektörde öncü konumdayız.",
            keywords: "hakkımızda, şirket profili, deneyim",
        },
        {
            page: "projects",
            title: "Projelerimiz | Gökler İnşaat",
            description: "Tamamladığımız ve devam eden projelerimizi inceleyin.",
            keywords: "projeler, konut, ticari, endüstriyel",
        },
    ]

    for (const seo of seoSettings) {
        await prisma.seoSettings.upsert({
            where: { page: seo.page },
            update: {},
            create: seo,
        })
    }
    console.log("✅ SEO settings created")

    // Create default site settings
    await prisma.siteSettings.create({
        data: {
            companyName: "Gökler İnşaat",
            phone: "+90 537 656 65 92",
            phone2: "",
            email: "göklerinsaat@gmail.com",
            email2: "",
            address: "Konya",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3150.3744608591014!2d32.54028617588706!3d37.8515277719661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDUxJzA1LjUiTiAzMsKwMzInMzQuMyJF!5e0!3m2!1str!2str!4v1770933691108!5m2!1str!2str",
            facebook: "https://www.facebook.com/people/G%C3%B6kler-%C4%B0n%C5%9Faat/61581379206252/",
            instagram: "https://www.instagram.com/goklerinsaatt/",
        },
    })
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
