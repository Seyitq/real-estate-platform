import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-secondary border border-border">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                Projenizi Birlikte Hayata Geçirelim
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
                Hayalinizdeki yapıyı gerçeğe dönüştürmek için ilk adımı atın.
                Ücretsiz keşif ve fiyat teklifi için hemen bizimle iletişime geçin.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Button asChild size="lg" className="rounded-full px-8 text-base">
                  <Link href="/teklif-al">
                    Ücretsiz Teklif Alın
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-transparent">
                  <a href="tel:+905376566592">
                    <Phone className="mr-2 h-5 w-5" />
                    Hemen Arayın
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
