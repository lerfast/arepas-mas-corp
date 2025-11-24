// src/components/home/ProductCarousel.jsx
import React, { useContext, useRef, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import formatCurrency from '../../utils/formatCurrency';
import products from '../../data/products.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AOS from 'aos';

// Imágenes
import arepaPlainGrande   from '../../assets/arepa_plain_grande.jpg';
import arepaPlainPequena  from '../../assets/arepa_plain_pequena.jpg';
import arepaChocolo       from '../../assets/arepa_chocolo.jpg';
import arepaQueso         from '../../assets/arepa_queso.jpg';
import deditosQueso       from '../../assets/deditos_queso.jpg';
import pandebono          from '../../assets/pandebono.jpg';
import chorizo            from '../../assets/chorizo.jpg';
import morcilla           from '../../assets/morcilla.jpg';
import pandeyuca          from '../../assets/pandeyuca.jpg';
import bunuelos           from '../../assets/bunuelos.jpg';
import empanadas          from '../../assets/empanadas.jpg';
import papasCriollas      from '../../assets/papas_criollas.jpg';

const imagesMap = {
  arepaPlainGrande,
  arepaPlainPequena,
  arepaChocolo,
  arepaQueso,
  deditosQueso,
  pandebono,
  chorizo,
  morcilla,
  pandeyuca,
  bunuelos,
  empanadas,
  papasCriollas,
};

const ProductCarousel = () => {
  const { t, i18n } = useTranslation();
  const { addToCart, cart } = useContext(CartContext);

  const [quantities, setQuantities] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const format = (v) => formatCurrency(v, i18n.language, 'USD');
  const clamp  = (x) => Math.max(1, Math.min(999, Number.isFinite(x) ? x : 1));

  const inc = (id) => setQuantities((q) => ({ ...q, [id]: clamp((q[id] || 1) + 1) }));
  const dec = (id) => setQuantities((q) => ({ ...q, [id]: clamp((q[id] || 1) - 1) }));

  const add = (p) => {
    const qty = clamp(quantities[p.id] || 1);
    addToCart({ id: p.id, price: p.price, pack: p.pack, imageKey: p.imageKey }, qty);
    setConfirmationMessage(`${qty} ${t(`product_names.${p.id}`)} ${t('added_to_cart')}`);
    setTimeout(() => setConfirmationMessage(null), 3000);
  };

  return (
    <section
      id="products"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 bg-gradient-to-b from-white to-[#F6FAFF]"
      data-aos="fade-up"
      data-aos-offset="120"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F2740]" data-aos="zoom-in">
          {t('products')}
        </h2>

        {/* Mensaje accesible */}
        <div role="status" aria-live="polite" className="min-h-[0.5rem]">
          {confirmationMessage && (
            <div className="mt-3 rounded-lg bg-green-50 text-green-700 px-4 py-2 shadow" data-aos="fade-down">
              {confirmationMessage}
            </div>
          )}
        </div>

        <div className="mt-8 relative">
          {/* Swiper */}
          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay, A11y]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1.2, slideShadows: false }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{}} // usamos refs personalizadas
            breakpoints={{
              0:    { slidesPerView: 1,   centeredSlides: true },
              640:  { slidesPerView: 1.2, centeredSlides: true },
              1024: { slidesPerView: 2.2, centeredSlides: true },
            }}
            className="!pb-10"
            onInit={(swiper) => {
              // flechas personalizadas (no tapan el precio)
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              setTimeout(() => AOS.refreshHard(), 0);
            }}
          >
            {products.map((p, idx) => {
              const name = t(`product_names.${p.id}`, {
                defaultValue: p.name || `Product ${p.id}`
              });
              const desc = t(`product_descriptions.${p.id}`, {
                defaultValue: t('no_description_available', 'No description available')
              });
              const img = imagesMap[p.imageKey];
              const qty = quantities[p.id] || 1;

              return (
                <SwiperSlide key={p.id} style={{ width: 'min(380px, 90vw)' }}>
                  <div
                    className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#00B4D8] to-[#0F2740]"
                    data-aos="fade-up"
                    data-aos-delay={Math.min(idx * 80, 400)}
                  >
                    <article className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
                      <div className="relative">
                        {img ? (
                          <img src={img} alt={name} loading="lazy" className="h-56 w-full object-cover" />
                        ) : (
                          <div className="h-56 w-full grid place-content-center bg-gray-100 text-gray-400">
                            {t('image_not_available', 'Imagen no disponible')}
                          </div>
                        )}

                        {/* Badges */}
                        <span className="absolute left-3 top-3 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold shadow">
                          {t('pack')}: {String(p.pack)}
                        </span>
                        <span className="absolute right-3 top-3 rounded-full bg-[#00B4D8] text-white px-3 py-1 text-sm font-bold shadow">
                          {format(p.price)}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg md:text-xl font-bold text-[#1F2937]">{name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{desc}</p>

                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-gray-300 px-1.5">
                            <button
                              type="button"
                              onClick={() => dec(p.id)}
                              className="h-9 w-9 grid place-content-center text-lg rounded-full hover:bg-gray-50"
                              aria-label={t('decrease', 'Disminuir')}
                            >
                              –
                            </button>
                            <input
                              inputMode="numeric"
                              pattern="[0-9]*"
                              type="number"
                              min="1"
                              max="999"
                              value={qty}
                              onChange={(e) =>
                                setQuantities((q) => ({
                                  ...q,
                                  [p.id]: Math.max(1, parseInt(e.target.value, 10) || 1),
                                }))
                              }
                              className="w-12 text-center bg-transparent focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => inc(p.id)}
                              className="h-9 w-9 grid place-content-center text-lg rounded-full hover:bg-gray-50"
                              aria-label={t('increase', 'Aumentar')}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => add(p)}
                            className="ml-auto inline-flex items-center justify-center rounded-full 
                                       bg-gradient-to-r from-[#00B4D8] to-[#0F2740]
                                       px-5 py-2.5 text-white font-semibold hover:shadow-xl active:scale-[0.98] transition"
                          >
                            {t('add_to_cart')}
                          </button>
                        </div>

                        {cart.length > 0 && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <Link to="/checkout">
                              <button className="w-full rounded-full bg-amber-400 px-4 py-2 font-semibold text-black hover:shadow-xl">
                                {t('proceed_to_checkout')}
                              </button>
                            </Link>
                            <Link to="/cart">
                              <button className="w-full rounded-full bg-black px-4 py-2 font-semibold text-white hover:shadow-xl">
                                {t('view_cart')}
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Flechas personalizadas (no tapan el precio en móvil) */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="absolute left-1 -translate-y-1/2 top-[38%] md:top-1/2 z-10 
                       h-10 w-10 md:h-11 md:w-11 grid place-content-center rounded-full 
                       bg-white/90 ring-1 ring-black/10 hover:bg-white shadow"
          >
            ‹
          </button>
          <button
            ref={nextRef}
            aria-label="Next"
            className="absolute right-1 -translate-y-1/2 top-[38%] md:top-1/2 z-10 
                       h-10 w-10 md:h-11 md:w-11 grid place-content-center rounded-full 
                       bg-white/90 ring-1 ring-black/10 hover:bg-white shadow"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;