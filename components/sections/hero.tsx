import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Building2 } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Kalite Garantisi",
    description: "Tüm projelerimizde en yüksek kalite standartları",
  },
  {
    icon: Clock,
    title: "Zamanında Teslimat",
    description: "Projelerinizi söz verilen tarihte teslim ediyoruz",
  },
  {
    icon: Building2,
    title: "Anahtar Teslim",
    description: "Baştan sona eksiksiz proje yönetimi",
  },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
          }}
        />
        {/* Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.avif"
            alt="Gökler İnşaat Yapı"
            width={400}
            height={400}
            className="opacity-10 object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Company Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <Image
                src="/logo.avif"
                alt="Gökler İnşaat Yapı"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            Güvenilir İnşaat Çözümleri
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            25 yılı aşkın tecrübemizle konut, ticari ve endüstriyel projelerde
            kaliteli ve zamanında teslimat garantisi sunuyoruz.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <Link href="/projeler">Projelerimizi İnceleyin</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-transparent">
              <Link href="/teklif-al">Teklif Alın</Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border"
            >
              <div className="p-2 bg-secondary rounded-lg">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
