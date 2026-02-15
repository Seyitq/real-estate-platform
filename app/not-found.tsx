import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="text-8xl font-bold text-muted-foreground/20">404</div>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Sayfa Bulunamadı</h1>
          <p className="mt-4 text-muted-foreground">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek devam edebilirsiniz.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="rounded-full px-8">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfa
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 bg-transparent">
              <Link href="/iletisim">
                <ArrowLeft className="mr-2 h-4 w-4" />
                İletişim
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
