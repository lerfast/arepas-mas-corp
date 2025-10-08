// src/App.js
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import HomePage from './components/home/HomePage';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';

// AOS (animaciones on-scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

// Componente que refresca AOS al cambiar de ruta/idioma
function AOSWatcher() {
  const location = useLocation();
  const { i18n } = useTranslation();
  useEffect(() => {
    AOS.refreshHard();
  }, [location.pathname, i18n.language]);
  return null;
}

function App() {
  // Inicializa AOS una sola vez
  useEffect(() => {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 700,
      easing: 'ease-out-quart',
      offset: 80,
      once: true,     // anima una sola vez por elemento
      mirror: false,  // no re-anima al hacer scroll hacia arriba
    });
  }, []);

  return (
    <CartProvider>
      <Router basename="/arepas-mas-corp">
        {/* IMPORTANTE para el "Saltar al contenido" del Header */}
        <main id="main" className="App">
          <Suspense fallback={<div>Loading…</div>}>
            <AOSWatcher />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
