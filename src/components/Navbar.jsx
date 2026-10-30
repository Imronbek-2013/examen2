import React from 'react';
import {
  IconSearch,
  IconCart,
  IconHeart,
  IconSun,
  IconMoon,
  IconSparkles,
  IconX
} from './Icons';

export default function Navbar({
  searchTerm,
  onSearchChange,
  currency,
  onCurrencyChange,
  lang,
  onLangChange,
  darkMode,
  onToggleDarkMode,
  cartCount,
  cartTotal,
  wishlistCount,
  isLoading,
  onSimulateLoading,
  onOpenCart,
  onOpenWishlist
}) {

  const formatCartTotal = (usdTotal) => {
    if (currency === 'UZS') {
      const uzs = Math.round(usdTotal * 12850);
      return `${uzs.toLocaleString('uz-UZ')} so'm`;
    }
    return `$${usdTotal.toFixed(2)}`;
  };

  return (
    <header className="site-header">
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="announcement-content">
          <span className="announcement-badge">
            <IconSparkles size={13} />
            {lang === 'UZ' ? 'Chegirma haftaligi' : 'Весенняя распродажа'}
          </span>
          <p className="announcement-text">
            {lang === 'UZ' 
              ? "Barcha mashhur kurslarga 70% gacha maxsus chegirma! Promokod: "
              : "Скидки до 70% на популярные курсы по промокоду: "}
            <span className="promo-code-pill">SUPER2026</span>
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo-brand-wrap">
            <a href="#" className="brand-link">
              <div className="brand-logo-icon">
                <span className="logo-letter">A</span>
                <span className="glowing-orb"></span>
              </div>
              <div className="brand-name-group">
                <span className="brand-title">Apex<span className="gradient-highlight">Learn</span></span>
                <span className="brand-tag">PRO ACADEMY</span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="search-bar-wrap">
            <div className="search-input-box">
              <span className="search-icon"><IconSearch size={17} /></span>
              <input
                type="text"
                placeholder={lang === 'UZ' ? "Dasturlash, AI, Python yoki dizayn kurslarini qidiring..." : "Искать курсы по AI, Python, React, дизайну..."}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  className="search-clear-btn" 
                  onClick={() => onSearchChange('')}
                  aria-label="Tozalash"
                >
                  <IconX size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Nav Actions (Currency, Lang, Theme, Wishlist, Cart) */}
          <div className="nav-actions-wrap">
            {/* Currency Switcher */}
            <div className="pill-selector currency-switch">
              <button
                type="button"
                className={`pill-option ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => onCurrencyChange('USD')}
                title="AQSH Dollari"
              >
                $ USD
              </button>
              <button
                type="button"
                className={`pill-option ${currency === 'UZS' ? 'active' : ''}`}
                onClick={() => onCurrencyChange('UZS')}
                title="O'zbek so'mi"
              >
                UZS
              </button>
            </div>

            {/* Language Switcher */}
            <div className="pill-selector lang-switch">
              <button
                type="button"
                className={`pill-option ${lang === 'UZ' ? 'active' : ''}`}
                onClick={() => onLangChange('UZ')}
              >
                UZ
              </button>
              <button
                type="button"
                className={`pill-option ${lang === 'RU' ? 'active' : ''}`}
                onClick={() => onLangChange('RU')}
              >
                RU
              </button>
            </div>

            {/* Skeleton Loading Simulator */}
            <button
              type="button"
              className={`skeleton-simulate-btn ${isLoading ? 'active' : ''}`}
              onClick={onSimulateLoading}
              title={lang === 'UZ' ? "Skeleton yuklanishni sinash" : "Имитация загрузки Skeleton"}
            >
              <span>🦴 Skeleton</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleDarkMode}
              title={darkMode ? "Yorug' rejimga o'tish" : "Tungi rejimga o'tish"}
              aria-label="Tungi/Yorug' rejim"
            >
              {darkMode ? <IconSun size={19} /> : <IconMoon size={19} />}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="nav-icon-btn wishlist-nav-btn"
              onClick={onOpenWishlist}
              title="Sevimlilar"
              aria-label="Sevimlilar"
            >
              <IconHeart size={21} fill={wishlistCount > 0 ? '#ef4444' : 'none'} color={wishlistCount > 0 ? '#ef4444' : 'currentColor'} />
              {wishlistCount > 0 && (
                <span className="badge-count wishlist-count">{wishlistCount}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="nav-cart-btn"
              onClick={onOpenCart}
              title="Savatni ko'rish"
              aria-label="Savat"
            >
              <div className="cart-icon-wrapper">
                <IconCart size={20} />
                {cartCount > 0 && (
                  <span className="badge-count cart-count">{cartCount}</span>
                )}
              </div>
              <div className="cart-text-details">
                <span className="cart-label">{lang === 'UZ' ? 'Savat' : 'Корзина'}</span>
                {cartCount > 0 && (
                  <span className="cart-price-sum">{formatCartTotal(cartTotal)}</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
