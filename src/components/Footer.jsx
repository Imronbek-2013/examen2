import React, { useState } from 'react';
import { IconSparkles, IconCheck, IconShield } from './Icons';

export default function Footer({ lang, onShowToast }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    onShowToast({
      type: 'promo',
      title: lang === 'UZ' ? 'Obuna bo\'ldingiz!' : 'Вы подписались!',
      message: lang === 'UZ' ? 'Maxsus 20% promokod pochtangizga yuborildi' : 'Промокод на 20% отправлен на вашу почту'
    });
    setEmailInput('');
  };

  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="brand-link footer-brand">
              <div className="brand-logo-icon">
                <span className="logo-letter">A</span>
              </div>
              <span className="brand-title">Apex<span className="gradient-highlight">Learn</span></span>
            </div>
            <p className="footer-about">
              {lang === 'UZ' 
                ? "Kelajak texnologiyalari, Sun'iy Intellekt va zamonaviy dasturlashni eng qulay narxlarda va yuqori darajada o'rgatuvchi onlayn platforma." 
                : "Передовая платформа онлайн-обучения IT и ИИ технологиям с практикой и доступными ценами."}
            </p>
            <div className="security-trust-badge">
              <IconShield size={16} />
              <span>100% SSL Shifrlangan va Xavfsiz to'lov</span>
            </div>
          </div>

          {/* Nav Links 1 */}
          <div className="footer-col">
            <h4 className="footer-heading">{lang === 'UZ' ? 'Ommabop Yo\'nalishlar' : 'Направления'}</h4>
            <ul className="footer-links-list">
              <li><a href="#all-courses-section">Sun'iy Intellekt & Agentlar</a></li>
              <li><a href="#all-courses-section">Python & Data Science</a></li>
              <li><a href="#all-courses-section">React 19 & Frontend</a></li>
              <li><a href="#all-courses-section">Spring AI & Java Backend</a></li>
              <li><a href="#all-courses-section">UI/UX & Figma Dizayn</a></li>
              <li><a href="#all-courses-section">Kiberxavfsizlik & Hacking</a></li>
            </ul>
          </div>

          {/* Nav Links 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">{lang === 'UZ' ? 'Platforma' : 'Платформа'}</h4>
            <ul className="footer-links-list">
              <li><a href="#">Biz haqimizda</a></li>
              <li><a href="#">O'qituvchi bo'lish</a></li>
              <li><a href="#">Talabalar loyihalari</a></li>
              <li><a href="#">Sertifikatni tekshirish</a></li>
              <li><a href="#">Tez-tez beriladigan savollar</a></li>
              <li><a href="#">Maxfiylik siyosati</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">{lang === 'UZ' ? 'Haftalik bepul darslar' : 'Бесплатные уроки'}</h4>
            <p className="newsletter-desc">
              {lang === 'UZ'
                ? "Yangi darslar va yopiq chegirmalarni birinchilardan bo'lib oling."
                : "Подпишитесь на полезные статьи и закрытые распродажи курсов."}
            </p>

            <form onSubmit={handleSubscribe} className="footer-email-form">
              <input
                type="email"
                required
                placeholder="Elektron pochtangiz..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="footer-input"
              />
              <button type="submit" className="footer-submit-btn">
                {subscribed ? <IconCheck size={16} /> : <IconSparkles size={16} />}
                <span>{subscribed ? 'Rahmat!' : 'Obuna bo\'lish'}</span>
              </button>
            </form>

            <div className="payment-badges-row">
              <span className="pay-pill">Humo</span>
              <span className="pay-pill">Uzcard</span>
              <span className="pay-pill">Visa</span>
              <span className="pay-pill">Mastercard</span>
              <span className="pay-pill">Payme</span>
              <span className="pay-pill">Click</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            © 2026 ApexLearn AI Academy. Barcha huquqlar himoyalangan.
          </p>
          <div className="footer-sub-links">
            <a href="#">Foydalanish shartlari</a>
            <span>•</span>
            <a href="#">Ommaviy oferta</a>
            <span>•</span>
            <a href="#">Yordam markazi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
