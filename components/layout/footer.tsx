import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"

const quickLinks = [
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Projeler", href: "/projeler" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Blog", href: "/blog" },
  { name: "Teklif Al", href: "/teklif-al" },
  { name: "İletişim", href: "/iletisim" },
]

const services = [
  { name: "Konut Projeleri", href: "/hizmetler#konut" },
  { name: "Ticari İnşaat", href: "/hizmetler#ticari" },
  { name: "Tadilat & Renovasyon", href: "/hizmetler#tadilat" },
  { name: "Proje Yönetimi", href: "/hizmetler#yonetim" },
  { name: "Mimari Tasarım", href: "/hizmetler#tasarim" },
  { name: "İç Mimarlık", href: "/hizmetler#ic-mimarlik" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/logo.avif" alt="Gökler İnşaat" width={140} height={48} className="h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              25 yılı aşkın tecrübemizle kaliteli ve güvenilir inşaat çözümleri sunuyoruz.
              Hayalinizdeki mekanları birlikte inşa edelim.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Konya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                <a href="tel:+905376566592" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  +90 537 656 65 92
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                <a href="mailto:göklerinsaat@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  göklerinsaat@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Pzt - Cmt: 09:00 - 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gökler İnşaat. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/goklerinsaatt/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/people/G%C3%B6kler-%C4%B0n%C5%9Faat/61581379206252/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/gizlilik" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-sartlari" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>

        {/* BK Media House Credit */}
        <div className="mt-4 text-center">
          <a
            href="https://bkmediahouse.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            BK Media House
          </a>
        </div>
      </div>
    </footer>
  )
}
