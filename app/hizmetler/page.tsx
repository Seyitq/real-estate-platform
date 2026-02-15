import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTA } from "@/components/sections/cta"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Home, Building2, Wrench, ClipboardCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Gökler İnşaat olarak konut, ticari ve endüstriyel inşaat, tadilat, proje yönetimi ve mimari tasarım hizmetleri sunuyoruz.",
}

const services = [
  {
    id: "konut-site",
    icon: Home,
    title: "Konut Site Projeleri",
    subtitle: "Modern yaşam alanları",
    description: "Ailelere özel, güvenlikli ve sosyal alanlarıyla modern yaşam alanları inşa ediyoruz.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170",
    features: [
      "Kapalı Site Projeleri",
      "Sosyal Tesisler (Havuz, Spor Salonu)",
      "7/24 Güvenlik Sistemi",
      "Çocuk Oyun Alanları",
      "Yeşil Alanlar ve Parklar",
      "Akıllı Ev Sistemleri",
    ],
  },
  {
    id: "lokasyon",
    icon: Building2,
    title: "Prestijli Lokasyonlar",
    subtitle: "Değer kazanan yatırımlar",
    description: "Şehir Hastanesi ve ana ulaşım akslarına yakın, her geçen gün değer kazanan projeler geliştiriyoruz.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170",
    features: [
      "Stratejik Konumlar",
      "Ulaşım Avantajı",
      "Değer Artış Potansiyeli",
      "Şehir Merkezine Yakınlık",
      "Hastane ve Okul Yakınlığı",
      "Toplu Taşıma Erişimi",
    ],
  },
  {
    id: "yapi",
    icon: Wrench,
    title: "Güçlü Yapı & Mühendislik",
    subtitle: "Sağlam ve güvenli yapılar",
    description: "Güncel deprem yönetmeliklerine uygun, uzun ömürlü malzemelerle sağlam yapılar üretiyoruz.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170",
    features: [
      "Güncel Deprem Yönetmeliği Uyumu",
      "Kaliteli ve Uzun Ömürlü Malzemeler",
      "Uzman Mühendislik Ekibi",
      "Yapısal Sağlamlık Testleri",
      "Zemin Etüdü ve Analizi",
      "Kalite Kontrol ve Denetim",
    ],
  },
  {
    id: "destek",
    icon: ClipboardCheck,
    title: "Yatırım ve Satış Sonrası Destek",
    subtitle: "Her adımda yanınızdayız",
    description: "Satın alma sürecinden teslimata, kiralama ve değer artışı konusunda uzman ekibimizle yanınızdayız.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170",
    features: [
      "Yatırım Danışmanlığı",
      "Kiralama Desteği",
      "Değer Artışı Takibi",
      "Satış Sonrası Hizmetler",
      "Sürekli İletişim",
      "Emlak Yönetim Desteği",
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                Hizmetlerimiz
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                İnşaat sektöründe 25 yılı aşkın deneyimimizle, projenizin her aşamasında
                yanınızdayız. İhtiyacınıza uygun çözümler sunuyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="p-3 bg-secondary rounded-xl w-fit mb-4">
                      <service.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                    <p className="mt-1 text-lg text-muted-foreground">{service.subtitle}</p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-foreground shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button asChild className="rounded-full px-6">
                        <Link href="/teklif-al">
                          Teklif Alın
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-border ${index % 2 === 1 ? "lg:order-1" : ""
                    }`}>
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Çalışma Sürecimiz
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Projelerinizi 4 basit adımda hayata geçiriyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Keşif & Analiz", description: "Projenizi yerinde inceliyor, ihtiyaçlarınızı analiz ediyoruz" },
                { step: "02", title: "Planlama", description: "Detaylı proje planı ve maliyet tahmini hazırlıyoruz" },
                { step: "03", title: "Uygulama", description: "Uzman ekibimizle projeyi titizlikle hayata geçiriyoruz" },
                { step: "04", title: "Teslimat", description: "Kalite kontrolü sonrası projeyi teslim ediyoruz" },
              ].map((item) => (
                <div key={item.step} className="p-6 bg-card rounded-2xl border border-border">
                  <div className="text-4xl font-bold text-muted-foreground/30">{item.step}</div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
