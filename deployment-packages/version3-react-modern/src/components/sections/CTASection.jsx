import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Projenizi Hayata Geçirmeye Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Modern web teknolojileri ve AI destekli çözümlerle işletmenizi dijital dünyada öne çıkarın.
          </p>
          <Link
            to="/iletisim"
            className="inline-flex items-center gap-2 bg-white text-primary-500 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Ücretsiz Teklif Al
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection