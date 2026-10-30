import React, { useState } from 'react';
import { IconX, IconTrash, IconCart, IconTag, IconArrowRight, IconShield, IconCheck } from './Icons';
import { CartItemSkeleton } from './Skeletons';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  lang,
  onRemoveFromCart,
  onClearCart,
  onProceedCheckout,
  discountPercent,
  appliedPromo,
  onApplyPromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isRecalculating, setIsRecalculating] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const formatPrice = (usd) => {
    if (currency === 'UZS') {
      const uzs = Math.round(usd * 12850);
      return `${uzs.toLocaleString('uz-UZ')} so'm`;
    }
    return `${usd.toFixed(2).replace('.', ',')} $`;
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'SUPER2026' || clean === 'DEV20' || clean === 'EXAMEN') {
      setIsRecalculating(true);
      setTimeout(() => {
        onApplyPromo(clean, 20);
        setIsRecalculating(false);
      }, 350);
      setPromoError('');
    } else {
      setPromoError(lang === 'UZ' ? 'Promokod noto\'g\'ri yoki muddati o\'tgan' : 'Неверный промокод');
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <IconCart size={20} />
            <h3 className="drawer-heading">
              {lang === 'UZ' ? 'Xarid savati' : 'Корзина покупок'}
            </h3>
            <span className="drawer-badge-count">{cart.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {cart.length > 0 && (
              <button
                type="button"
                className="cart-clear-all-link"
                onClick={onClearCart}
                style={{ fontSize: '11px', color: '#94a3b8' }}
              >
                {lang === 'UZ' ? 'Tozalash' : 'Очистить'}
              </button>
            )}
            <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Yopish">
              <IconX size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        {cart.length > 0 ? (
          <div className="drawer-body">
            {/* Items List */}
            <div className="drawer-items-list">
              {isRecalculating ? (
                <>
                  <CartItemSkeleton />
                  <CartItemSkeleton />
                </>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-instructor">{item.instructor}</p>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className="cart-item-orig-price">{formatPrice(item.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cart-item-remove-btn"
                      onClick={() => onRemoveFromCart(item.id)}
                      title={lang === 'UZ' ? 'Savatdan o\'chirish' : 'Удалить'}
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code Input */}
            <div className="cart-promo-section">
              <form onSubmit={handleApplyPromo} className="promo-input-form">
                <div className="promo-input-group">
                  <IconTag size={16} className="promo-tag-icon" />
                  <input
                    type="text"
                    placeholder={lang === 'UZ' ? "Promokod (masalan: SUPER2026)" : "Промокод (напр. SUPER2026)"}
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    className="promo-text-input"
                  />
                  <button type="submit" className="promo-submit-btn">
                    {lang === 'UZ' ? 'Qo\'llash' : 'Применить'}
                  </button>
                </div>
              </form>

              {appliedPromo && (
                <div className="promo-applied-badge">
                  <IconCheck size={14} />
                  <span>
                    {lang === 'UZ' 
                      ? `"${appliedPromo}" kodi qo'llandi (-${discountPercent}%)` 
                      : `Код "${appliedPromo}" применен (-${discountPercent}%)`}
                  </span>
                </div>
              )}

              {promoError && (
                <p className="promo-error-msg">{promoError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="cart-summary-box">
              <div className="summary-row">
                <span>{lang === 'UZ' ? 'Jami summa:' : 'Стоимость курсов:'}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="summary-row discount-row">
                  <span>{lang === 'UZ' ? `Chegirma (${discountPercent}%):` : `Скидка (${discountPercent}%):`}</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>{lang === 'UZ' ? 'Yakuniy to\'lov:' : 'Итого к оплате:'}</span>
                <span className="total-accent">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="drawer-footer">
              <button
                type="button"
                className="checkout-proceed-btn"
                onClick={onProceedCheckout}
              >
                <span>{lang === 'UZ' ? 'To\'lovga o\'tish' : 'Перейти к оплате'}</span>
                <IconArrowRight size={18} />
              </button>

              <div className="secure-checkout-hint">
                <IconShield size={14} />
                <span>{lang === 'UZ' ? '100% Xavfsiz to\'lov va kafolat' : '100% Безопасная оплата'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="drawer-empty-state">
            <div className="empty-cart-icon-wrap">
              <IconCart size={40} />
            </div>
            <h4>{lang === 'UZ' ? 'Savatingiz hozircha bo\'sh' : 'Ваша корзина пуста'}</h4>
            <p>
              {lang === 'UZ'
                ? "O'zingizga yoqqan kurslarni tanlang va savatga qo'shing."
                : "Выберите интересные курсы в каталоге и добавьте их в корзину."}
            </p>
            <button type="button" className="drawer-explore-btn" onClick={onClose}>
              {lang === 'UZ' ? 'Kurslarni tanlash' : 'Выбрать курсы'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
