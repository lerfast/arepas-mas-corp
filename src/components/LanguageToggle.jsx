// src/components/LanguageToggle.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    // i18next-browser-languagedetector ya guarda en localStorage / cookie
  };

  const current = i18n.language?.startsWith('en') ? 'en' : 'es';

  return (
    <div className="language-switch" role="group" aria-label="Language switch">
      <button
        className={`lang-btn ${current === 'es' ? 'active' : ''}`}
        onClick={() => setLang('es')}
        aria-pressed={current === 'es'}
      >
        🇨🇴 ES
      </button>
      <button
        className={`lang-btn ${current === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={current === 'en'}
      >
        🇺🇸 EN
      </button>
    </div>
  );
};

export default LanguageToggle;
