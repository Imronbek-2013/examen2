import React from 'react';
import { IconX, IconHeart, IconTrash, IconCart, IconCheck } from './Icons';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  currency,
  lang,
  cart,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenVideo
}) {
  if (!isOpen) return null;

  const formatPrice = (usd) => {
    if (currency === 'UZS') {
      const uzs = Math.round(usd * 12850);
      return `${uzs.toLocaleString('uz-UZ')} so'm`;
    }
    return `${usd.toFixed(2).replace('.', ',')} $`;
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <IconHeart size={20} fill="#ef4444" color="#ef4444" />
            <h3 className="drawer-heading">
              {lang === 'UZ' ? 'Sevimlilar ro\'yxati' : 'Список желаемого'}
            </h3>
            <span className="drawer-badge-count">{wishlist.length}</span>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Yopish">
            <IconX size={20} />
          </button>
        </div>

        {wishlist.length > 0 ? (
          <div className="drawer-body">
            <div className="drawer-items-list">
              {wishlist.map((item) => {
                const isInCart = cart.some(c => c.id === item.id);
                return (
                  <div key={item.id} className="cart-item-card wishlist-item-card">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="cart-item-img cursor-pointer"
                      onClick={() => onOpenVideo(item)}
                    />
                    <div className="cart-item-info">
                      <h4 
                        className="cart-item-title cursor-pointer"
                        onClick={() => onOpenVideo(item)}
                      >
                        {item.title}
                      </h4>
                      <p className="cart-item-instructor">{item.instructor}</p>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">{formatPrice(item.price)}</span>
                      </div>

                      <button
                        type="button"
                        className={`wishlist-move-to-cart-btn ${isInCart ? 'added' : ''}`}
                        onClick={() => onAddToCart(item)}
                      >
                        {isInCart ? (
                          <>
                            <IconCheck size={14} />
                            <span>{lang === 'UZ' ? 'Savatda' : 'В корзине'}</span>
                          </>
                        ) : (
                          <>
                            <IconCart size={14} />
                            <span>{lang === 'UZ' ? 'Savatga solish' : 'В корзину'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-item-remove-btn"
                      onClick={() => onRemoveFromWishlist(item.id)}
                      title={lang === 'UZ' ? 'Sevimlilardan o\'chirish' : 'Удалить из избранного'}
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="drawer-empty-state">
            <div className="empty-cart-icon-wrap heart-bg">
              <IconHeart size={40} fill="none" color="#ef4444" />
            </div>
            <h4>{lang === 'UZ' ? 'Sevimlilar bo\'sh' : 'Список избранного пуст'}</h4>
            <p>
              {lang === 'UZ'
                ? "Kurs kartochkasidagi yurakcha belgisini bosib, yoqqan kurslarni saqlang."
                : "Нажмите на сердечко на карточке курса, чтобы сохранить его сюда."}
            </p>
            <button type="button" className="drawer-explore-btn" onClick={onClose}>
              {lang === 'UZ' ? 'Kurslarni ko\'rish' : 'Смотреть курсы'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
