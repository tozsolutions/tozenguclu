import React from 'react'

const StatsSection = () => {
  return (
    <section className="section-padding bg-primary-500 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-primary-100">Tamamlanan Proje</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-primary-100">Müşteri Memnuniyeti</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-primary-100">Yıllık Deneyim</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-primary-100">Teknik Destek</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection