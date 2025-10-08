// src/components/checkout/Checkout.jsx
import React, { useState, useContext } from 'react';
import emailjs from 'emailjs-com';
import { CartContext } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import formatCurrency from '../../utils/formatCurrency';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const { cart, clearCart, getTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const format = (value) => formatCurrency(value, i18n.language, 'USD');

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (cart.length === 0) {
      setMessage(t('empty_cart_message'));
      return false;
    }
    const { name, email, address, phone } = formData;
    if (!name || !email || !address || !phone) {
      setMessage(t('order_failure_message'));
      return false;
    }
    // Validación simple de email (sin espacios y con @)
    if (!email.includes('@') || email.includes(' ')) {
      setMessage(t('invalid_email_message'));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;

    const orderDetails = cart
      .map(
        (item) =>
          `${t(`product_names.${item.id}`) || item.name} (${t('quantity')}: ${
            item.quantity
          })`
      )
      .join(', ');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      order: orderDetails,
      total: format(getTotal()),
    };

    setSending(true);
    emailjs
      .send(
        'service_k45d4h9',
        'template_5ec7k58',
        templateParams,
        'R5r9h5kY8r9zgVUJJ'
      )
      .then(
        () => {
          setMessage(t('order_success_message'));
          clearCart();
          setSending(false);
        },
        () => {
          setMessage(t('order_failure_message'));
          setSending(false);
        }
      );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F2740]" data-aos="fade-up">
          {t('checkout_title')}
        </h2>

        {/* Mensaje global */}
        <div role="status" aria-live="polite" className="mt-4 min-h-[1rem]" data-aos="fade-up" data-aos-delay="50">
          {message && (
            <div className="rounded-lg bg-white shadow ring-1 ring-black/5 px-4 py-3 text-[#1F2937]">
              {message}
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="mt-6 text-gray-600" data-aos="fade-up" data-aos-delay="100">
            {t('empty_cart')}
          </p>
        ) : (
          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6"
              data-aos="fade-up"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">{t('address')}</label>
                  <input
                    type="text"
                    name="address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">{t('phone')}</label>
                  <input
                    type="text"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center rounded-full bg-[#00B4D8] px-6 py-3 text-white font-semibold hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {sending ? 'Enviando…' : t('submit_order')}
                </button>
              </div>
            </form>

            {/* Resumen del pedido */}
            <aside className="lg:sticky lg:top-24 h-fit" data-aos="fade-left">
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
                <h3 className="text-lg font-bold text-[#1F2937]">{t('order_summary')}</h3>

                <ul className="mt-4 space-y-3">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-[#1F2937]">
                          {t(`product_names.${item.id}`) || item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t('quantity')}: {item.quantity} — {t('price')}: {format(item.price)}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-[#0F2740]">
                        {format(item.price * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('order_total')}</span>
                  <span className="text-xl font-extrabold text-[#0F2740]">{format(getTotal())}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;
