// src/components/home/TestimonialsSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

// Imágenes
import woman1 from '../../assets/mujer1.jpg';
import woman2 from '../../assets/mujer2.jpg';
import man from '../../assets/hombre.jpg';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// AOS (solo para refrescar al montar el Swiper)
import AOS from 'aos';

const Star = ({ filled = true }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`h-4 w-4 ${filled ? 'text-amber-400' : 'text-gray-300'}`}
    fill="currentColor"
  >
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.164L12 18.897l-7.336 3.864 1.402-8.164L.132 9.21l8.2-1.192L12 .587z" />
  </svg>
);

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const items = [
    { img: woman1, nameKey: 'customer_1', textKey: 'testimonial_1', rating: 5 },
    { img: man,    nameKey: 'customer_2', textKey: 'testimonial_2', rating: 5 },
    { img: woman2, nameKey: 'customer_3', textKey: 'testimonial_3', rating: 5 },
  ];

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 bg-white"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="testimonials-title"
          className="text-3xl md:text-4xl font-extrabold text-[#0F2740]"
          data-aos="zoom-in"
        >
          {t('testimonials')}
        </h2>

        {/* Carrusel */}
        <div
          className="mt-8"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="120"
        >
          <Swiper
            modules={[Pagination, Autoplay, A11y]}
            className="testi !pb-10"
            a11y={{ enabled: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={24}
            breakpoints={{
              0:    { slidesPerView: 1, centeredSlides: true },
              640:  { slidesPerView: 1.2, centeredSlides: true },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSwiper={() => {
              // Asegura que AOS “vea” los slides cuando el carrusel se monta
              setTimeout(() => AOS.refresh(), 0);
            }}
          >
            {items.map((it, idx) => (
              <SwiperSlide key={idx} style={{ width: 'min(460px, 92vw)' }}>
                {/* Borde degradado premium */}
                <div
                  className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#00B4D8] to-[#0F2740]"
                  data-aos="fade-up"
                  data-aos-delay={150 + idx * 120}   // efecto escalonado
                  data-aos-duration="700"
                >
                  <article className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-6 h-full">
                    {/* Cabecera: avatar + nombre + rating */}
                    <div className="flex items-center gap-4">
                      <img
                        src={it.img}
                        alt={t(it.nameKey)}
                        loading="lazy"
                        className="h-14 w-14 rounded-full object-cover shadow"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1F2937] truncate">{t(it.nameKey)}</p>
                        <div className="flex items-center gap-1" aria-label={`${it.rating} / 5`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} filled={i < it.rating} />
                          ))}
                        </div>
                      </div>
                      {/* Comillas decorativas */}
                      <div className="ml-auto text-4xl leading-none text-[#00B4D8]/40" aria-hidden="true">“</div>
                    </div>

                    {/* Texto */}
                    <p className="mt-4 text-gray-700 leading-relaxed">{t(it.textKey)}</p>

                    {/* Sello marca discreto */}
                    <div className="mt-6 text-xs text-[#0F2740]/60 font-semibold">
                      Arepas & Más Corp
                    </div>
                  </article>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
