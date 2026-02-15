export interface Project {
  slug: string
  title: string
  category: string
  location: string
  year: string
  area: string
  client: string
  status: "completed" | "ongoing"
  image: string
  gallery: string[]
  description: string
  features: string[]
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: "park-rezidans",
    title: "Park Rezidans",
    category: "Konut",
    location: "İstanbul, Beşiktaş",
    year: "2023",
    area: "25.000 m²",
    client: "Park Gayrimenkul A.Ş.",
    status: "completed",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1035",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1035",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1175",
    ],
    description: "İstanbul Beşiktaş'ın kalbinde, park manzaralı lüks rezidans projesi. 40 daireden oluşan proje, modern mimari anlayışı ve üstün yaşam kalitesi sunmaktadır. Akıllı ev sistemleri, enerji verimli tasarım ve yüksek kaliteli malzemeler kullanılmıştır.",
    features: [
      "40 Lüks Daire",
      "Açık & Kapalı Havuz",
      "Fitness Center",
      "24 Saat Güvenlik",
      "Yer Altı Otoparkı",
      "Akıllı Ev Sistemleri",
    ],
    tags: ["Lüks Konut", "40 Daire", "Havuzlu"],
  },
  {
    slug: "merkez-plaza",
    title: "Merkez Plaza",
    category: "Ticari",
    location: "Ankara, Çankaya",
    year: "2022",
    area: "45.000 m²",
    client: "Merkez Holding",
    status: "completed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170",
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=1036",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1169",
    ],
    description: "Ankara'nın prestijli iş merkezinde A+ sınıfı ofis binası. LEED Gold sertifikalı, akıllı bina teknolojileri ve sürdürülebilir tasarım özellikleriyle donatılmıştır.",
    features: [
      "25 Katlı Ofis Kulesi",
      "LEED Gold Sertifika",
      "Helipad",
      "Konferans Merkezi",
      "500 Araçlık Otopark",
      "7/24 Güvenlik",
    ],
    tags: ["Ofis", "A+ Bina", "Akıllı Bina"],
  },
  {
    slug: "yesilkoy-villalari",
    title: "Yeşilköy Villaları",
    category: "Konut",
    location: "İstanbul, Yeşilköy",
    year: "2023",
    area: "18.000 m²",
    client: "Özel Müşteri",
    status: "completed",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1171",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1171",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1153",
    ],
    description: "Deniz manzaralı, özel tasarım 12 villadan oluşan lüks konut projesi. Her villa 500m² kullanım alanı, özel bahçe ve havuza sahiptir.",
    features: [
      "12 Müstakil Villa",
      "Özel Havuzlar",
      "Deniz Manzarası",
      "Akıllı Ev Sistemleri",
      "Güvenlikli Site",
      "Peyzaj Tasarımı",
    ],
    tags: ["Villa", "12 Ünite", "Deniz Manzaralı"],
  },
  {
    slug: "anadolu-fabrika",
    title: "Anadolu Fabrika Kompleksi",
    category: "Endüstriyel",
    location: "Kocaeli, Gebze",
    year: "2024",
    area: "75.000 m²",
    client: "Anadolu Otomotiv",
    status: "completed",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1331",
    gallery: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1331",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1170",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1170",
    ],
    description: "Gebze Organize Sanayi Bölgesi'nde modern fabrika ve lojistik merkezi. Yüksek tavanlı üretim alanları, depo ve idari binadan oluşmaktadır.",
    features: [
      "25.000 m² Üretim Alanı",
      "15.000 m² Depo",
      "İdari Bina",
      "Vinç Sistemleri",
      "Yükleme Rampaları",
      "Çevre Dostu Tasarım",
    ],
    tags: ["Fabrika", "75.000 m²", "Lojistik"],
  },
  {
    slug: "sahil-konaklari",
    title: "Sahil Konakları",
    category: "Konut",
    location: "İzmir, Çeşme",
    year: "2024",
    area: "32.000 m²",
    client: "Ege Yapı A.Ş.",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1170",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1170",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1170",
    ],
    description: "Çeşme'nin en güzel koyunda, denize sıfır konumda lüks tatil konutları projesi. 80 daire ve 8 villadan oluşmaktadır.",
    features: [
      "80 Daire + 8 Villa",
      "Özel Plaj",
      "Marina Erişimi",
      "Spa & Wellness",
      "Restoranlar",
      "Çocuk Kulübü",
    ],
    tags: ["Tatil Konutu", "Denize Sıfır", "Marina"],
  },
  {
    slug: "teknokent-ofis",
    title: "Teknokent Ofis Kampüsü",
    category: "Ticari",
    location: "İstanbul, Maslak",
    year: "2024",
    area: "55.000 m²",
    client: "Tech Ventures",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1169",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1169",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1169",
    ],
    description: "Teknoloji şirketleri için tasarlanmış modern ofis kampüsü. Açık ofis alanları, ortak çalışma mekanları ve sosyal alanlar içermektedir.",
    features: [
      "4 Ofis Binası",
      "Co-working Alanları",
      "Konferans Merkezi",
      "Kafeterya & Restoran",
      "Fitness Merkezi",
      "Yeşil Alan",
    ],
    tags: ["Teknokent", "Kampüs", "Akıllı Ofis"],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category)
}
