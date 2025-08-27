import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Web Tasarım', href: '/hizmetler/web-tasarim' },
      { name: 'Mobil Uygulama', href: '/hizmetler/mobil-uygulama' },
      { name: 'AI Çözümleri', href: '/hizmetler/ai-cozumleri' },
      { name: 'SEO & Pazarlama', href: '/hizmetler/seo-pazarlama' }
    ],
    company: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'Portföy', href: '/portfoy' },
      { name: 'Blog', href: '/blog' },
      { name: 'Kariyer', href: '/kariyer' }
    ],
    support: [
      { name: 'İletişim', href: '/iletisim' },
      { name: 'Destek', href: '/destek' },
      { name: 'SSS', href: '/sss' },
      { name: 'Gizlilik Politikası', href: '/gizlilik' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin }
  ]

  return (
    <footer className="bg-primary-500 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-primary-500 font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold">ModernSite</span>
              </Link>
              
              <p className="text-primary-100 mb-6 leading-relaxed">
                Modern web teknolojileri ve AI destekli çözümlerle işletmenizi dijital dünyada öne çıkarıyoruz.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary-100">
                  <Phone className="w-4 h-4 text-secondary-500" />
                  <span>+90 (212) 555 0123</span>
                </div>
                <div className="flex items-center gap-3 text-primary-100">
                  <Mail className="w-4 h-4 text-secondary-500" />
                  <span>info@modernsite.com</span>
                </div>
                <div className="flex items-center gap-3 text-primary-100">
                  <MapPin className="w-4 h-4 text-secondary-500" />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Hizmetler</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-100 hover:text-secondary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Şirket</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-100 hover:text-secondary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Destek</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-100 hover:text-secondary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-400 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-primary-100">
              © {currentYear} ModernSite. Tüm hakları saklıdır.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-primary-400 hover:bg-secondary-500 rounded-full flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Tech Stack */}
            <div className="text-primary-100 text-sm">
              React 19 + Vite 6 + Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer