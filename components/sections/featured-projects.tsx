import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"

async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    })
    return projects.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || "[]") as string[],
    }))
  } catch {
    return []
  }
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()

  if (projects.length === 0) return null

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Öne Çıkan Projeler
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tamamladığımız ve devam eden projelerimizden bazıları
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projeler/${project.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-secondary aspect-[4/3]"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-secondary/80 backdrop-blur-sm rounded-full text-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
            <Link href="/projeler">
              Tüm Projeleri Görüntüle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
