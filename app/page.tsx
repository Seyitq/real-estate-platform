import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"
import { BlogPreview } from "@/components/sections/blog-preview"
import { CTA } from "@/components/sections/cta"

// Disable cache for dynamic content (Featured Projects, Testimonials)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <FeaturedProjects />
        <Stats />
        <Testimonials />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
