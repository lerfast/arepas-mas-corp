// src/components/common/Header.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import heroBackground from '../../assets/hero-background.jpg';

const SECTIONS = [
  { id: 'about', labelKey: 'about_us', href: '#about' },
  { id: 'products', labelKey: 'products', href: '#products' },
  { id: 'testimonials', labelKey: 'testimonials', href: '#testimonials' },
  { id: 'contact', labelKey: 'contact_us', href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deep, setDeep] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const { cart } = useContext(CartContext);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 10);
      setDeep(y > 240);
      const goingDown = y > lastScrollY.current;
      const shouldHide = goingDown && y > 120 && !isMenuOpen;
      setHidden(shouldHide);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') closeMenu(); };
    const onClickOutside = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) closeMenu();
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: [0.25, 0.5, 0.75, 1] }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navClasses =
    `fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`;

  const shadowSoft = 'shadow-[0_6px_24px_rgba(0,0,0,0.18)]';
  const shadowStrong = 'shadow-[0_10px_40px_rgba(0,0,0,0.35)]';

  const navInnerClasses =
    `mx-auto max-w-7xl px-4 py-3 flex items-center justify-between rounded-b-2xl transition-colors duration-300 ` +
    (scrolled
      ? `bg-[#0F2740]/95 ${deep ? shadowStrong : shadowSoft} border-b border-white/10`
      : 'bg-black/40 backdrop-blur-sm');

  return (
    <header
      className="relative min-h-[520px] w-full bg-center bg-cover flex items-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />

      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-amber-400 focus:px-3 focus:py-2 focus:text-black"
      >
        {t('skip_to_content') || 'Saltar al contenido'}
      </a>

      {/* Navbar */}
      <nav ref={navRef} className={navClasses} aria-label="Main navigation">
        <div className={navInnerClasses}>
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Arepas & Más Corp"
                className="h-20 w-20 md:h-20 md:w-20 rounded-full shadow ring-1 ring-white/10"
              />
              <span className="hidden sm:inline-block text-xs font-semibold text-white bg-amber-400 px-2 py-1 rounded">
                {t('far_but_not_flavors')}
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-6 text-white/90">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  className="hover:text-white transition"
                  aria-current={activeSection === s.id ? 'page' : undefined}
                >
                  {t(s.labelKey)}
                </a>
              </li>
            ))}
            <li>
              <Link to="/cart" className="hover:text-white transition" aria-label={t('cart_title')}>
                {t('cart_title')} {itemCount > 0 && <span aria-live="polite">({itemCount})</span>}
              </Link>
            </li>
          </ul>

          {/* Language switch (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => changeLanguage('es')}
              aria-pressed={i18n.language?.startsWith('es')}
              className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
            >
              ES
            </button>
            <button
              onClick={() => changeLanguage('en')}
              aria-pressed={i18n.language?.startsWith('en')}
              className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
            >
              EN
            </button>
          </div>

          {/* Hamburger (mobile) con animación a “X” */}
          <div className="md:hidden flex items-center" ref={menuRef}>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('close_menu') || 'Cerrar menú' : t('open_menu') || 'Abrir menú'}
              aria-controls="main-menu"
              aria-expanded={isMenuOpen}
              className="relative h-10 w-10 p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {/* 3 líneas que se morph a X */}
              <span
                className={`absolute left-2 right-2 top-3 h-0.5 rounded bg-white transition-transform duration-300 origin-center
                  ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`absolute left-2 right-2 top-1/2 h-0.5 -translate-y-1/2 rounded bg-white transition-opacity duration-200
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-2 right-2 bottom-3 h-0.5 rounded bg-white transition-transform duration-300 origin-center
                  ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu con slide + fade + stagger */}
        <div
          id="main-menu"
          aria-hidden={!isMenuOpen}
          className={`
            md:hidden overflow-hidden border-t border-white/10 bg-[#0F2740]/95 backdrop-blur-sm
            motion-safe:transition-all motion-safe:duration-300
            ${isMenuOpen ? 'max-h-[60vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
          `}
        >
          <ul className="px-4 py-2 text-white">
            {SECTIONS.map((s, idx) => (
              <li
                key={s.id}
                style={{ transitionDelay: isMenuOpen ? `${60 + idx * 40}ms` : '0ms' }}
                className={`
                  motion-safe:transition-all motion-safe:duration-300
                  ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
                `}
              >
                <a
                  href={s.href}
                  className="block py-2"
                  aria-current={activeSection === s.id ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {t(s.labelKey)}
                </a>
              </li>
            ))}

            <li
              className="pt-1"
              style={{ transitionDelay: isMenuOpen ? `${60 + SECTIONS.length * 40}ms` : '0ms' }}
            >
              <Link to="/cart" className="block py-2" onClick={closeMenu}>
                {t('cart_title')} {itemCount > 0 && `(${itemCount})`}
              </Link>
            </li>

            <li
              className="flex items-center gap-2 pt-2 pb-3"
              style={{ transitionDelay: isMenuOpen ? `${100 + SECTIONS.length * 40}ms` : '0ms' }}
            >
              <button
                onClick={() => changeLanguage('es')}
                aria-pressed={i18n.language?.startsWith('es')}
                className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
              >
                ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                aria-pressed={i18n.language?.startsWith('en')}
                className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
              >
                EN
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero con animaciones AOS */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-4xl px-4 py-28 md:py-40">
          <div
            className="bg-black/30 backdrop-blur-sm p-6 md:p-10 rounded-2xl text-center text-white shadow-xl"
            data-aos="zoom-in"
            data-aos-offset="0"
          >
            <h1
              className="text-4xl md:text-6xl font-extrabold drop-shadow"
              data-aos="fade-up"
              data-aos-delay="60"
            >
              Arepas & Más Corp
            </h1>
            <p className="mt-3 text-lg md:text-xl" data-aos="fade-up" data-aos-delay="130">
              {t('welcome')}
            </p>
            <p className="mt-1 text-sm md:text-base text-white/90" data-aos="fade-up" data-aos-delay="200">
              {t('corn_arepas')}
            </p>
            <a
              href="#products"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-amber-400 text-black font-semibold hover:shadow-xl active:scale-[0.98] transition"
              data-aos="fade-up"
              data-aos-delay="270"
            >
              {t('products')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
