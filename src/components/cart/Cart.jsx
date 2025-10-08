// src/components/cart/Cart.jsx
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency';
import catalog from '../../data/products.json';

// Imágenes (mismo map que en el carrusel)
import arepaPlainGrande from '../../assets/arepa_plain_grande.jpg';
import arepaPlainPequena from '../../assets/arepa_plain_pequena.jpg';
import arepaChocolo from '../../assets/arepa_chocolo.jpg';
import arepaQueso from '../../assets/arepa_queso.jpg';
import deditosQueso from '../../assets/deditos_queso.jpg';

const imagesMap = {
  arepaPlainGrande,
  arepaPlainPequena,
  arepaChocolo,
  arepaQueso,
  deditosQueso,
};

const clamp = (n) => Math.max(1, Math.min(999, Number.isFinite(n) ? n : 1));

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { cart, clearCart, updateQuantity, getTotal, removeFromCart } = useContext(CartContext);

  const format = (value) => formatCurrency(value, i18n.language, 'USD');

  const getImageFor = (item) => {
    const key = item.imageKey || catalog.find((p) => p.id === item.id)?.imageKey;
    return key ? imagesMap[key] : null;
  };

  if (cart.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-[#F6FAFF]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00B4D8]/10 text-[#00B4D8] text-2xl">
            🛒
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#0F2740]">{t('cart_title')}</h2>
          <p className="mt-2 text-gray-600">{t('empty_cart')}</p>
          <Link to="/#products" className="inline-block mt-6">
            <span className="rounded-full bg-[#00B4D8] px-6 py-3 text-white font-semibold hover:shadow-lg active:scale-[0.98] transition">
              {t('products')}
            </span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F2740]">{t('cart_title')}</h2>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Lista de ítems */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const name = t(`product_names.${item.id}`);
              const img = getImageFor(item);
              const subtotal = item.price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden"
                >
                  <div className="grid grid-cols-[96px_1fr] md:grid-cols-[140px_1fr_auto] gap-4 p-4">
                    {/* Imagen */}
                    <div className="col-span-1">
                      {img ? (
                        <img
                          src={img}
                          alt={name}
                          className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-xl"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-24 w-24 md:h-32 md:w-32 grid place-content-center rounded-xl bg-gray-100 text-gray-400 text-xs">
                          {t('image_not_available') || 'Imagen no disponible'}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                      <h3 className="text-base md:text-lg font-semibold text-[#1F2937]">{name}</h3>
                      {item.pack && (
                        <p className="mt-0.5 text-xs md:text-sm text-gray-500">
                          {t('pack')}: {String(item.pack)}
                        </p>
                      )}

                      {/* Stepper cantidad */}
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-sm text-gray-600">{t('quantity')}:</span>
                        <div className="flex items-center rounded-full border border-gray-300 px-1.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, clamp(item.quantity - 1))}
                            className="h-9 w-9 grid place-content-center text-lg rounded-full hover:bg-gray-50"
                            aria-label={t('decrease') || 'Disminuir'}
                          >
                            –
                          </button>
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            type="number"
                            min="1"
                            max="999"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, clamp(parseInt(e.target.value, 10) || 1))}
                            className="w-14 text-center bg-transparent focus:outline-none"
                            aria-label={t('quantity')}
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, clamp(item.quantity + 1))}
                            className="h-9 w-9 grid place-content-center text-lg rounded-full hover:bg-gray-50"
                            aria-label={t('increase') || 'Aumentar'}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium"
                          aria-label={t('remove')}
                        >
                          {t('remove')}
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="hidden md:flex items-center">
                      <span className="ml-auto text-base font-semibold text-[#0F2740]">
                        {format(subtotal)}
                      </span>
                    </div>
                  </div>

                  {/* Subtotal en móvil */}
                  <div className="md:hidden border-t border-gray-100 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t('total')}</span>
                    <span className="text-base font-semibold text-[#0F2740]">{format(subtotal)}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Resumen */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
              <h3 className="text-lg font-bold text-[#1F2937]">{t('order_summary')}</h3>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('order_total')}</span>
                <span className="text-xl font-extrabold text-[#0F2740]">{format(getTotal())}</span>
              </div>

              <div className="mt-6 grid gap-3">
                <Link to="/checkout" aria-label={t('proceed_to_checkout')}>
                  <button className="w-full rounded-full bg-[#00B4D8] px-5 py-3 text-white font-semibold hover:shadow-lg active:scale-[0.98] transition">
                    {t('proceed_to_checkout')}
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full rounded-full bg-gray-100 px-5 py-3 text-gray-800 font-semibold hover:shadow"
                >
                  {t('clear_cart')}
                </button>
                <Link to="/#products" className="text-center text-sm text-[#00B4D8] hover:underline">
                  {t('products')}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
