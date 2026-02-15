import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTA } from "@/components/sections/cta"
import { prisma } from "@/lib/prisma"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "Gökler İnşaat olarak tamamladığımız ve devam eden konut, ticari ve endüstriyel projelerimizi inceleyin.",
}

const categories = ["Tümü", "Konut", "Ticari", "Endüstriyel"]

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    return projects.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || "[]") as string[],
      features: JSON.parse(p.features || "[]") as string[],
      gallery: JSON.parse(p.gallery || "[]") as string[],
    }))
  } catch {
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                Projelerimiz
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Tamamladığımız ve devam eden projelerimizi keşfedin. Her proje, kalite ve
                güvenilirlik anlayışımızın bir yansımasıdır.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-5 py-2 text-sm font-medium bg-secondary rounded-full text-foreground border border-border hover:bg-accent transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Henüz proje bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projeler/${project.slug}`}
                    className="group bg-secondary rounded-2xl border border-border overflow-hidden hover:border-muted-foreground/30 transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {project.status === "ongoing" && (
                        <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full">
                          Devam Ediyor
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-card rounded-full text-muted-foreground border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                        {project.title}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{project.category}</span>
                        <span className="text-muted-foreground">{project.year}</span>
                      </div>
                    </div>
                  </Link>
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
