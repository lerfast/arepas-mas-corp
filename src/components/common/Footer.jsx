// src/components/common/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 md:scroll-mt-28 bg-[#0F2740] text-white"
      aria-labelledby="footer-title"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70
        [background:radial-gradient(60%_40%_at_12%_8%,rgba(0,180,216,0.12),transparent),radial-gradient(45%_55%_at_85%_25%,rgba(251,191,36,0.12),transparent)]"
      />

      {/* Contenido principal */}
      <div
        className="relative mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3"
        data-aos="fade-up"
        data-aos-offset="120"
      >
        {/* Columna 1: Contacto Arepas */}
        <div data-aos="fade-up" data-aos-delay="0">
          <h3 id="footer-title" className="text-2xl font-bold">
            {t('contact_us')}
          </h3>
          <span aria-hidden="true" className="mt-2 block h-1 w-16 rounded bg-amber-400" />
          <p className="mt-4 text-white/90">{t('contact_message')}</p>

          <a
            href="https://wa.me/17865437061"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00B4D8] px-5 py-2.5 font-semibold text-white hover:shadow focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={t('contact_via_whatsapp')}
            data-aos="zoom-in"
            data-aos-delay="80"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
            <span>{t('contact_via_whatsapp')}</span>
          </a>

          <p className="mt-3 text-white/90">
            <strong>+1 (786) 543-7061</strong>
          </p>

          <p className="mt-6 text-white/80">{t('contact_closing')}</p>
        </div>

        {/* Columna 2: Enlaces + Instagram de la marca */}
        <nav aria-label="Quick links" data-aos="fade-up" data-aos-delay="100">
          <h4 className="text-xl font-semibold">Arepas & Más Corp</h4>
          <ul className="mt-4 space-y-2 text-white/85">
            <li>
              <a href="#about" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
                {t('about_us')}
              </a>
            </li>
            <li>
              <a href="#products" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
                {t('products')}
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
                {t('testimonials')}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded">
                {t('contact_us')}
              </a>
            </li>
          </ul>

          {/* Única red de la marca: Instagram */}
          <div className="mt-6 flex items-center gap-4 text-xl" data-aos="zoom-in" data-aos-delay="150">
            <a
              href="https://www.instagram.com/arepasymascorp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              aria-label="Instagram de Arepas & Más Corp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </nav>

        {/* Columna 3 vacía (respira visualmente en desktop) */}
        <div data-aos="fade-up" data-aos-delay="200" />
      </div>

      {/* Barra inferior: copyright + bloque del desarrollador (debajo) + back to top */}
      <div className="relative border-t border-white/10" data-aos="fade-up" data-aos-offset="60" data-aos-delay="120">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white/70 text-sm">
          {/* Lado izquierdo apilado */}
          <div className="flex flex-col gap-2">
            <p>© {year} Arepas & Más Corp — {t('developed_by')}</p>

            {/* Debajo: CTA desarrollador + redes personales */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <p className="text-white/80">
                {t('contact_follow_up')}{' '}
                <a
                  href="https://wa.me/573187757620"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/40 hover:decoration-white"
                  aria-label="Escríbeme por WhatsApp"
                >
                  WhatsApp
                </a>
              </p>
              <div className="flex items-center gap-3 text-lg">
                <a
                  href="https://wa.me/573187757620"
                  className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  aria-label="WhatsApp del desarrollador"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a
                  href="https://www.linkedin.com/in/luisemiliorojas/"
                  className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  aria-label="LinkedIn del desarrollador"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="https://github.com/lerfast"
                  className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  aria-label="GitHub del desarrollador"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>

          {/* Back to top con micro-interacciones */}
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label={t('Back to top') || 'Volver arriba'}
            className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5
                       ring-1 ring-white/20 bg-white/5 hover:bg-white/10 hover:ring-white/40
                       shadow-sm overflow-hidden transition-all duration-300
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-[0.98]"
          >
            {/* Brillo deslizante */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full
                         bg-gradient-to-r from-transparent via-white/10 to-transparent
                         transition-transform duration-700 group-hover:translate-x-0"
            />
            {/* Icono chevron animado */}
            <span
              aria-hidden="true"
              className="grid place-items-center h-6 w-6 rounded-full bg-white/10 ring-1 ring-white/20
                         transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 14l6-6 6 6" />
              </svg>
            </span>
            <span className="font-medium">{t('Back to Top') || 'Volver arriba'}</span>
            {/* Halo suave al hover */}
            <span
              aria-hidden="true"
              className="absolute -z-10 inset-0 rounded-full opacity-0 group-hover:opacity-100
                         blur-md bg-[#00B4D8]/20 transition-opacity duration-300"
            />
          </button>
        </div>
      </div>

      {/* Contador de visitas — al final */}
      <div className="relative px-4 pb-6 pt-2 text-center" data-aos="fade-up" data-aos-delay="140">
        <a href="https://www.hitwebcounter.com" target="_blank" rel="noreferrer" className="inline-block">
          <img
            src="https://hitwebcounter.com/counter/counter.php?page=17014722&style=0038&nbdigits=9&type=page&initCount=0"
            title="Counter Widget"
            alt={t('visit_counter_alt')}
            border="0"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
