import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTA } from "@/components/sections/cta"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Ruler, Building2, Check, ArrowLeft, ChevronRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug, published: true },
    })
    if (!project) return null
    return {
      ...project,
      tags: JSON.parse(project.tags || "[]") as string[],
      features: JSON.parse(project.features || "[]") as string[],
      gallery: JSON.parse(project.gallery || "[]") as string[],
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: "Proje Bulunamadı",
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Gökler İnşaat`,
      description: project.description || "",
      images: project.image ? [project.image] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const specs = [
    { icon: MapPin, label: "Konum", value: project.location },
    { icon: Calendar, label: "Yıl", value: project.year },
    { icon: Ruler, label: "Alan", value: project.area },
    { icon: Building2, label: "Kategori", value: project.category },
  ]

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="py-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link href="/projeler" className="text-muted-foreground hover:text-foreground transition-colors">
                Projeler
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{project.title}</span>
            </nav>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[50vh] sm:h-[60vh]">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-sm font-medium bg-secondary/80 backdrop-blur-sm rounded-full text-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Proje Hakkında</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Features */}
                {project.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Özellikler</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                        >
                          <Check className="h-5 w-5 text-foreground shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {project.gallery.length > 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Galeri</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {project.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${project.title} - Görsel ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Specs Card */}
                <div className="p-6 bg-card rounded-2xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Proje Bilgileri</h3>
                  <div className="space-y-4">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-center gap-4">
                        <div className="p-2 bg-secondary rounded-lg">
                          <spec.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">{spec.label}</div>
                          <div className="text-sm font-medium text-foreground">{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {project.client && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-1">Müşteri</div>
                      <div className="text-sm font-medium text-foreground">{project.client}</div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Durum</div>
                    <div className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${project.status === "completed"
                        ? "bg-secondary text-foreground"
                        : "bg-accent text-accent-foreground"
                      }`}>
                      {project.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="p-6 bg-secondary rounded-2xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Benzer Bir Proje mi Planlıyorsunuz?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Projeniz için ücretsiz keşif ve fiyat teklifi alın.
                  </p>
                  <Button asChild className="w-full rounded-full">
                    <Link href="/teklif-al">Teklif Alın</Link>
                  </Button>
                </div>

                {/* Back Button */}
                <Button asChild variant="outline" className="w-full rounded-full bg-transparent">
                  <Link href="/projeler">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Tüm Projeler
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
