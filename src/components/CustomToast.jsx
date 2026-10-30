import React, { useEffect } from 'react';
import { IconCheck, IconHeart, IconCart, IconSparkles, IconX } from './Icons';

export default function CustomToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <div className="toast-icon-wrap cart"><IconCart size={18} /></div>;
      case 'wishlist':
        return <div className="toast-icon-wrap heart"><IconHeart size={18} fill="#ef4444" color="#ef4444" /></div>;
      case 'success':
        return <div className="toast-icon-wrap success"><IconCheck size={18} /></div>;
      case 'promo':
        return <div className="toast-icon-wrap promo"><IconSparkles size={18} /></div>;
      default:
        return <div className="toast-icon-wrap success"><IconCheck size={18} /></div>;
    }
  };

  return (
    <div className="custom-toast-container">
      <div className={`custom-toast slide-in-top ${toast.type || ''}`}>
        {getIcon()}
        <div className="toast-content">
          <p className="toast-title">{toast.title || 'Muvaffaqiyatli'}</p>
          <p className="toast-message">{toast.message}</p>
        </div>
        <button type="button" className="toast-close-btn" onClick={onClose} aria-label="Yopish">
          <IconX size={16} />
        </button>
      </div>
    </div>
  );
}
