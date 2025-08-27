import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Smartphone, Search, Globe, Headphones } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Yüksek Performans',
      description: '90+ PageSpeed Score ile hızlı yüklenen web siteleri',
      color: 'text-accent-500'
    },
    {
      icon: Shield,
      title: 'Güvenli Altyapı',
      description: 'SSL sertifikası ve güvenlik önlemleri ile korumalı siteler',
      color: 'text-secondary-500'
    },
    {
      icon: Smartphone,
      title: 'Responsive Tasarım',
      description: 'Tüm cihazlarda mükemmel görünüm sağlayan mobil uyumlu tasarım',
      color: 'text-primary-500'
    },
    {
      icon: Search,
      title: 'SEO Optimizasyonu',
      description: 'Arama motorlarında üst sıralarda yer almak için optimize edilmiş',
      color: 'text-accent-500'
    },
    {
      icon: Globe,
      title: 'Modern Teknolojiler',
      description: 'React, Vite, Tailwind CSS gibi güncel teknolojilerle geliştirilmiş',
      color: 'text-secondary-500'
    },
    {
      icon: Headphones,
      title: 'AI Destekli Destek',
      description: 'Luna AI ile 7/24 müşteri hizmeti ve teknik destek',
      color: 'text-primary-500'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Neden ModernSite?</h2>
          <p className="section-subtitle">
            Modern web teknolojileri ve AI destekli çözümlerle işletmenizi dijital dünyada öne çıkarıyoruz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection