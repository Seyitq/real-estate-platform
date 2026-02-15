import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTA } from "@/components/sections/cta"
import { Users, Target, Award, Heart, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "25 yılı aşkın tecrübemizle güvenilir inşaat çözümleri sunuyoruz. Gökler İnşaat olarak kalite, güven ve müşteri memnuniyetini ön planda tutuyoruz.",
}

const values = [
  {
    icon: Target,
    title: "Vizyon",
    description: "Türkiye'nin önde gelen inşaat firmalarından biri olmak ve sektörde yenilikçi uygulamalarla öncü rol üstlenmek.",
  },
  {
    icon: Heart,
    title: "Misyon",
    description: "Müşterilerimize kaliteli, güvenli ve zamanında teslim edilen projelerle değer katmak ve güvenilir bir iş ortağı olmak.",
  },
  {
    icon: Award,
    title: "Değerlerimiz",
    description: "Dürüstlük, kalite, güvenilirlik ve müşteri memnuniyeti iş yapış şeklimizin temel taşlarıdır.",
  },
  {
    icon: Users,
    title: "Ekibimiz",
    description: "Deneyimli mühendisler, mimarlar ve ustalardan oluşan 200+ kişilik profesyonel ekibimizle hizmet veriyoruz.",
  },
]

const milestones = [
  { year: "1999", title: "Kuruluş", description: "Gökler İnşaat kuruldu" },
  { year: "2005", title: "İlk Büyük Proje", description: "100+ daire projesini tamamladık" },
  { year: "2010", title: "Ticari İnşaat", description: "Ticari projelere adım attık" },
  { year: "2015", title: "ISO Sertifikası", description: "ISO 9001 kalite belgesi aldık" },
  { year: "2020", title: "Endüstriyel", description: "Fabrika projelerine başladık" },
  { year: "2024", title: "Günümüz", description: "150+ proje tamamlandı" },
]

const features = [
  "25+ yıl sektör deneyimi",
  "150+ tamamlanmış proje",
  "200+ uzman personel",
  "ISO 9001 kalite sertifikası",
  "Zamanında teslimat garantisi",
  "7/24 müşteri desteği",
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                  Hakkımızda
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  1999 yılında kurulan Gökler İnşaat, 25 yılı aşkın tecrübesiyle Türkiye inşaat sektörünün güvenilir 
                  markalarından biri haline gelmiştir. Konut, ticari ve endüstriyel alanlarda gerçekleştirdiğimiz 
                  projelerle müşterilerimizin güvenini kazandık.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Kaliteli malzeme, uzman ekip ve modern teknolojileri bir araya getirerek her projede 
                  mükemmelliği hedefliyoruz. Müşteri memnuniyetini her şeyin önünde tutarak, hayalleri 
                  gerçeğe dönüştürmeye devam ediyoruz.
                </p>

                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-5 w-5 text-foreground shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1170"
                  alt="Gökler İnşaat ekibi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Vizyon, Misyon & Değerlerimiz
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Başarımızın arkasındaki temel ilkeler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-8 bg-secondary rounded-2xl border border-border"
                >
                  <div className="p-3 bg-card rounded-xl w-fit">
                    <value.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Yolculuğumuz
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                1999'dan bugüne önemli kilometre taşlarımız
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {milestones.map((milestone) => (
                <div
                  key={milestone.year}
                  className="p-6 bg-card rounded-2xl border border-border text-center"
                >
                  <div className="text-3xl font-bold text-foreground">{milestone.year}</div>
                  <h3 className="mt-2 font-semibold text-foreground">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
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
