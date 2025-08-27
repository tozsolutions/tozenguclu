import React from 'react'
import { Helmet } from 'react-helmet-async'

// Sections
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import ServicesSection from '../components/sections/ServicesSection'
import StatsSection from '../components/sections/StatsSection'
import PortfolioSection from '../components/sections/PortfolioSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import BlogSection from '../components/sections/BlogSection'
import CTASection from '../components/sections/CTASection'

const HomePage = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>ModernSite | Profesyonel Web Tasarım ve AI Çözümleri</title>
        <meta 
          name="description" 
          content="React, Vite ve Tailwind CSS ile geliştirilmiş modern web sitesi. AI destekli çözümler, responsive tasarım ve üstün performans." 
        />
        <meta 
          name="keywords" 
          content="react web sitesi, modern web tasarım, AI çözümleri, responsive tasarım, vite, tailwind css, profesyonel web geliştirme" 
        />
        <link rel="canonical" href="/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ModernSite | Profesyonel Web Tasarım ve AI Çözümleri" />
        <meta property="og:description" content="React, Vite ve Tailwind CSS ile geliştirilmiş modern web sitesi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ModernSite",
            "description": "Profesyonel web tasarım ve AI destekli dijital çözümler",
            "url": "https://yourwebsite.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://yourwebsite.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      {/* Page Content */}
      <div className="overflow-hidden">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Portfolio Section */}
        <PortfolioSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Blog Section */}
        <BlogSection />
        
        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  )
}

export default HomePage