import React, { useState } from 'react';
import { IconX, IconCheck, IconShield, IconCreditCard, IconSparkles } from './Icons';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  total,
  currency,
  lang,
  onSuccessfulPayment
}) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: 'Alisher Qodirov',
    email: 'student@apexlearn.uz',
    phone: '+998 90 123 45 67',
    cardNumber: '8600 4912 3456 7890',
    expiry: '08/28'
  });
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (usd) => {
    if (currency === 'UZS') {
      const uzs = Math.round(usd * 12850);
      return `${uzs.toLocaleString('uz-UZ')} so'm`;
    }
    return `${usd.toFixed(2).replace('.', ',')} $`;
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onSuccessfulPayment();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-header-title">
            <IconShield size={22} className="shield-icon-accent" />
            <h3>{lang === 'UZ' ? 'Xavfsiz To\'lov Tizimi' : 'Безопасная оплата'}</h3>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose} aria-label="Yopish">
            <IconX size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="checkout-success-view">
            <div className="success-animated-circle">
              <IconCheck size={48} />
            </div>
            <h3>{lang === 'UZ' ? 'To\'lov muvaffaqiyatli amalga oshirildi!' : 'Оплата прошла успешно!'}</h3>
            <p className="success-subtitle">
              {lang === 'UZ' 
                ? "Barcha darslar va sertifikat tizimi sizning shaxsiy kabinetingizda faollashtirildi." 
                : "Все видео-уроки и сертификат разблокированы в личном кабинете."}
            </p>

            <div className="receipt-summary-card">
              <div className="receipt-row">
                <span>{lang === 'UZ' ? 'Buyurtma raqami:' : 'Номер заказа:'}</span>
                <span className="mono-code">#APX-{orderId}</span>
              </div>
              <div className="receipt-row">
                <span>{lang === 'UZ' ? 'To\'langan summa:' : 'Оплаченная сумма:'}</span>
                <span className="bold-price">{formatPrice(total)}</span>
              </div>
              <div className="receipt-row">
                <span>{lang === 'UZ' ? 'Kurslar soni:' : 'Курсов:'}</span>
                <span>{cart.length} ta kurs</span>
              </div>
            </div>

            <button
              type="button"
              className="start-learning-btn"
              onClick={onClose}
            >
              <IconSparkles size={18} />
              <span>{lang === 'UZ' ? 'Darslarni boshlash' : 'Начать обучение'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handlePaySubmit} className="checkout-form">
            {/* Payment Method Selector */}
            <div className="payment-methods-grid">
              <button
                type="button"
                className={`payment-method-pill ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <IconCreditCard size={18} />
                <span>Humo / Uzcard / Visa</span>
              </button>

              <button
                type="button"
                className={`payment-method-pill ${paymentMethod === 'payme' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('payme')}
              >
                <span className="pay-brand payme">Payme</span>
              </button>

              <button
                type="button"
                className={`payment-method-pill ${paymentMethod === 'click' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('click')}
              >
                <span className="pay-brand click">Click Up</span>
              </button>

              <button
                type="button"
                className={`payment-method-pill ${paymentMethod === 'uzum' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('uzum')}
              >
                <span className="pay-brand uzum">Uzum Bank</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="checkout-fields-container">
              <div className="input-group-row">
                <div className="input-field">
                  <label>{lang === 'UZ' ? 'F.I.SH (Ism va familiya):' : 'Имя и фамилия:'}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="input-field">
                  <label>Email (kurslar yuboriladi):</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <div className="card-input-details">
                  <div className="input-field">
                    <label>{lang === 'UZ' ? 'Karta raqami:' : 'Номер карты:'}</label>
                    <input
                      type="text"
                      maxLength={19}
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="input-group-row">
                    <div className="input-field">
                      <label>{lang === 'UZ' ? 'Muddati (OO/YY):' : 'Срок действия:'}</label>
                      <input
                        type="text"
                        maxLength={5}
                        required
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      />
                    </div>
                    <div className="input-field">
                      <label>CVV / CVC:</label>
                      <input type="password" maxLength={3} defaultValue="888" required />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="phone-pay-box">
                  <div className="input-field">
                    <label>{lang === 'UZ' ? 'Telefon raqamingiz (SMS kod yuboriladi):' : 'Номер телефона:'}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total to pay banner */}
            <div className="checkout-total-banner">
              <div>
                <span className="total-hint">{lang === 'UZ' ? 'To\'lanadigan summa:' : 'Сумма к оплате:'}</span>
                <h3 className="total-value">{formatPrice(total)}</h3>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="submit-checkout-btn"
              >
                {isProcessing ? (
                  <span className="spinner-text">{lang === 'UZ' ? 'To\'lov tekshirilmoqda...' : 'Обработка...'}</span>
                ) : (
                  <span>{lang === 'UZ' ? `${formatPrice(total)} to'lash` : `Оплатить ${formatPrice(total)}`}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
