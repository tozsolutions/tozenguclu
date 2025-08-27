import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Award, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Floating elements data
  const floatingElements = [
    { icon: Star, color: 'text-accent-500', position: 'top-20 left-10', delay: 0 },
    { icon: Users, color: 'text-secondary-500', position: 'top-32 right-20', delay: 1 },
    { icon: Award, color: 'text-primary-500', position: 'bottom-32 left-20', delay: 2 },
    { icon: Zap, color: 'text-accent-500', position: 'bottom-20 right-10', delay: 3 }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon
        return (
          <motion.div
            key={index}
            className={`absolute ${element.position} hidden lg:block`}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: element.delay }}
          >
            <div className={`p-3 bg-white/10 backdrop-blur-sm rounded-full ${element.color}`}>
              <IconComponent className="w-6 h-6" />
            </div>
          </motion.div>
        )
      })}

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-medium">
                  React 19 + Vite 6 + AI Destekli
                </span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Modern Web
              <br />
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Çözümleri
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl lg:text-2xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              React, Vite ve Tailwind CSS ile geliştirilmiş, 
              AI destekli profesyonel web siteleri. 
              Hızlı, güvenli ve modern.
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0"
              variants={itemVariants}
            >
              {[
                '90+ PageSpeed Score',
                'Responsive Tasarım',
                'AI Chatbot Entegrasyonu',
                'SEO Optimizasyonu'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Link
                to="/iletisim"
                className="group inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-primary-500 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
              >
                Ücretsiz Teklif Al
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300">
                <Play className="w-5 h-5" />
                Demo İzle
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
              variants={itemVariants}
            >
              {[
                { number: '500+', label: 'Proje' },
                { number: '%98', label: 'Memnuniyet' },
                { number: '24/7', label: 'Destek' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 pb-4 border-b border-white/20">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center text-white/70 text-sm">
                      yourwebsite.com
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-500">R</span>
                      </div>
                      <div className="text-white font-semibold">React 19</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">V</span>
                      </div>
                      <div className="text-white font-semibold">Vite 6.3.5</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">T</span>
                      </div>
                      <div className="text-white font-semibold">Tailwind CSS</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">AI</span>
                      </div>
                      <div className="text-white font-semibold">Luna AI</div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-500 mb-1">95+</div>
                      <div className="text-xs text-white/70">PageSpeed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-500 mb-1">&lt;2s</div>
                      <div className="text-xs text-white/70">Yükleme</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-6 -right-6 bg-secondary-500 text-primary-500 p-4 rounded-xl shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-6 h-6" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-accent-500 text-primary-500 p-4 rounded-xl shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Zap className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection