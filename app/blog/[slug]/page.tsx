import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { prisma } from "@/lib/prisma"
import { Calendar, Clock, User, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

interface Props {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blog.findUnique({
      where: { slug, published: true },
    })
    return post
  } catch {
    return null
  }
}

async function getRelatedPosts(slug: string, category: string) {
  try {
    const posts = await prisma.blog.findMany({
      where: {
        slug: { not: slug },
        category,
        published: true,
      },
      take: 2,
      orderBy: { createdAt: "desc" },
    })
    return posts
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Gökler İnşaat Blog`,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.category)

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="py-6 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="px-4 py-1.5 text-sm font-medium bg-secondary rounded-full text-foreground border border-border">
                {post.category}
              </span>
              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.createdAt), "d MMMM yyyy", { locale: tr })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime} okuma
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="mt-12 prose prose-invert prose-lg max-w-none">
              <div
                className="text-muted-foreground leading-relaxed space-y-6"
                style={{ whiteSpace: "pre-line" }}
              >
                {post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-4 text-muted-foreground">
                        {paragraph.replace("- ", "")}
                      </li>
                    )
                  }
                  if (paragraph.match(/^\d+\./)) {
                    return (
                      <li key={index} className="ml-4 text-muted-foreground">
                        {paragraph}
                      </li>
                    )
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-muted-foreground">
                        {paragraph}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-border">
              <Button asChild variant="outline" className="rounded-full bg-transparent">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tüm Yazılar
                </Link>
              </Button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">İlgili Yazılar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex gap-4 p-4 bg-secondary rounded-2xl border border-border hover:border-muted-foreground/30 transition-colors"
                  >
                    <div className="relative w-32 h-24 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs text-muted-foreground">{relatedPost.category}</span>
                      <h3 className="mt-1 font-semibold text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <span className="mt-2 text-xs text-muted-foreground">
                        {format(new Date(relatedPost.createdAt), "d MMM yyyy", { locale: tr })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
