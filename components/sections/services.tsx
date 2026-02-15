import Link from "next/link"
import { Building2, Home, Wrench, ClipboardCheck, Check, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Konut Site Projeleri",
    description: "Ailelere özel, güvenlikli ve sosyal alanlarıyla modern yaşam alanları inşa ediyoruz.",
    features: ["Kapalı Site Projeleri", "Sosyal Tesisler", "7/24 Güvenlik"],
    href: "/hizmetler#konut-site",
  },
  {
    icon: Building2,
    title: "Prestijli Lokasyonlar",
    description: "Şehir Hastanesi ve ana ulaşım akslarına yakın, her geçen gün değer kazanan projeler geliştiriyoruz.",
    features: ["Stratejik Konumlar", "Ulaşım Avantajı", "Değer Artışı"],
    href: "/hizmetler#lokasyon",
  },
  {
    icon: Wrench,
    title: "Güçlü Yapı & Mühendislik",
    description: "Güncel deprem yönetmeliklerine uygun, uzun ömürlü malzemelerle sağlam yapılar üretiyoruz.",
    features: ["Deprem Yönetmeliği", "Kaliteli Malzeme", "Uzman Ekip"],
    href: "/hizmetler#yapi",
  },
  {
    icon: ClipboardCheck,
    title: "Yatırım ve Satış Sonrası Destek",
    description: "Satın alma sürecinden teslimata, kiralama ve değer artışı konusunda uzman ekibimizle yanınızdayız.",
    features: ["Yatırım Danışmanlığı", "Kiralama Desteği", "Sürekli İletişim"],
    href: "/hizmetler#destek",
  },
]

export function Services() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Geniş hizmet yelpazemizle inşaat ihtiyaçlarınızın tamamını karşılıyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-muted-foreground/30 transition-all duration-300"
            >
              <div className="p-3 bg-secondary rounded-xl w-fit">
                <service.icon className="h-6 w-6 text-foreground" />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                {service.title}
              </h3>

              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              <ul className="mt-4 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Detaylı Bilgi
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
