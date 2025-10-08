// src/components/home/AboutUs.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import aboutJpg from '../../assets/about-collage.jpg';      // <- tu imagen .jpg
import aboutWebp from '../../assets/about-collage.webp';    // <- opcional: borra esta línea si no tienes .webp

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div data-aos="fade-right">
          <h2 id="about-title" className="text-3xl md:text-4xl font-extrabold text-[#0F2740]">
            {t('about_us')}
          </h2>

          {/* Línea decorativa */}
          <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded bg-amber-400" />

          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            {t('about_description')}
          </p>

          <a
            href="#contact"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-[#00B4D8] text-white font-semibold hover:shadow-xl active:scale-[0.98] transition"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('contact_us')}
          </a>
        </div>

        {/* Imagen real del collage de productos */}
        <div className="hidden md:block" data-aos="fade-left" data-aos-delay="100">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.15)]">
            <picture>
              {/* Si no tienes .webp, borra esta <source> */}
              <source srcSet={aboutWebp} type="image/webp" />
              <img
                src={aboutJpg}
                alt={t('about_collage_alt')}
                loading="lazy"
                className="block w-full h-full object-cover"
                style={{ aspectRatio: '16 / 9' }}
              />
            </picture>

            {/* Vignette muy suave para legibilidad */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
