// src/components/home/HomePage.jsx
import React, { useEffect } from 'react';
import Header from '../common/Header';
import AboutUs from './AboutUs';
import ProductCarousel from './ProductCarousel';
import TestimonialsSection from './TestimonialsSection';
import Footer from '../common/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 10 });
    AOS.refresh();
  }, []);

  return (
    <>
      <Header />
      <AboutUs />
      <ProductCarousel />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default HomePage;
