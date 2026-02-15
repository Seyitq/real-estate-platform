import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTA } from "@/components/sections/cta"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
    title: "Foto Galeri",
    description: "Gökler İnşaat projelerinden fotoğraflar. Tamamladığımız konut, ticari ve endüstriyel projelerin görselleri.",
}

async function getGalleryImages() {
    const gallery = await prisma.gallery.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })
    return gallery
}

export default async function GalleryPage() {
    const galleryImages = await getGalleryImages()

    return (
        <>
            <Header />
            <main className="pt-24">
                {/* Hero Section */}
                <section className="py-16 sm:py-24 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                                Foto Galeri
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                Tamamladığımız projelerin görselleri. Her proje kalite, estetik ve dayanıklılık
                                prensiplerimizin bir yansımasıdır.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="py-16 bg-card">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {galleryImages.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    Henüz galeri görseli eklenmemiş.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galleryImages.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-300 cursor-pointer"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <span className="inline-block px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full mb-2">
                                                    {item.category}
                                                </span>
                                                <h3 className="text-lg font-semibold text-white">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <CTA />
            </main>
            <Footer />
        </>
    )
}
