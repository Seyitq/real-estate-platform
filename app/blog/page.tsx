import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { prisma } from "@/lib/prisma"
import { Calendar, Clock, User } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

export const metadata: Metadata = {
  title: "Blog",
  description: "İnşaat sektörü hakkında güncel haberler, rehberler ve faydalı içerikler. Gökler İnşaat Blog.",
}

const categories = ["Tümü", "Sektör", "Tasarım", "Rehber", "Güvenlik", "Teknoloji", "Finans"]

async function getBlogPosts() {
  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    return posts
  } catch {
    // Fallback to empty array if database not available
    return []
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  // Fallback data if database is empty
  const hasPosts = blogPosts.length > 0
  const featuredPost = hasPosts ? blogPosts[0] : null
  const otherPosts = hasPosts ? blogPosts.slice(1) : []

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                Blog & Haberler
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                İnşaat sektöründen güncel haberler, faydalı rehberler ve uzman görüşleri
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
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

            {!hasPosts ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Henüz blog yazısı bulunmuyor.</p>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block mb-12"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-secondary rounded-3xl border border-border">
                      <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden">
                        <Image
                          src={featuredPost.image || "/placeholder.svg"}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 text-xs font-medium bg-card rounded-full text-foreground">
                            {featuredPost.category}
                          </span>
                          <span className="text-xs text-muted-foreground">Öne Çıkan</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="mt-4 text-muted-foreground line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(featuredPost.createdAt), "d MMMM yyyy", { locale: tr })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {featuredPost.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-secondary rounded-2xl border border-border overflow-hidden hover:border-muted-foreground/30 transition-colors"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 text-xs font-medium bg-card rounded-full text-muted-foreground border border-border">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>

                        <h2 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {post.author}
                          <span className="mx-2">•</span>
                          {format(new Date(post.createdAt), "d MMM yyyy", { locale: tr })}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
