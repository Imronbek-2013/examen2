import React from 'react';
import { IconStar, IconPlay, IconHeart, IconCheck, IconClock } from './Icons';

export default function CourseCard({
  course,
  currency = 'USD',
  lang = 'RU', // RU or UZ
  isInCart = false,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
  onOpenVideo
}) {
  // Format price
  const formatPrice = (usdPrice) => {
    if (currency === 'UZS') {
      const uzs = Math.round(usdPrice * 12850);
      return `${uzs.toLocaleString('uz-UZ')} so'm`;
    }
    // Russian format in user's screenshot uses comma: "19,99 $"
    const formatted = usdPrice.toFixed(2).replace('.', ',');
    return `${formatted} $`;
  };

  const badgeText = course.badge || (lang === 'UZ' ? 'Xit Kurs' : 'Лидер продаж');
  const cartBtnText = isInCart 
    ? (lang === 'UZ' ? 'Savatda' : 'В корзине') 
    : (lang === 'UZ' ? 'Savatga qo\'shish' : 'Добавить в корзину');
  
  const reviewsText = lang === 'UZ' 
    ? `${course.reviewsCount} baho` 
    : `${course.reviewsCount} оценки`;

  return (
    <div className="course-card-wrapper">
      <div className="course-card">
        {/* Thumbnail container */}
        <div className="card-thumb-area" onClick={() => onOpenVideo(course)}>
          <img 
            src={course.image} 
            alt={course.title} 
            className="card-thumb-img" 
            loading="lazy"
          />
          <div className="card-thumb-overlay">
            <button 
              type="button" 
              className="play-preview-pill"
              onClick={(e) => {
                e.stopPropagation();
                onOpenVideo(course);
              }}
            >
              <IconPlay size={15} fill="#ffffff" color="#ffffff" />
              <span>{lang === 'UZ' ? 'Videoni ko\'rish' : 'Смотреть превью'}</span>
            </button>
          </div>

          {/* Quick info duration tag */}
          <div className="thumb-duration-tag">
            <IconClock size={12} />
            <span>{course.duration}</span>
          </div>

          {/* Favorite heart button */}
          <button
            type="button"
            className={`wishlist-heart-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(course);
            }}
            aria-label="Sevimlilarga saqlash"
            title="Sevimlilarga saqlash"
          >
            <IconHeart 
              size={17} 
              fill={isFavorite ? '#ef4444' : 'none'} 
              color={isFavorite ? '#ef4444' : '#ffffff'} 
            />
          </button>
        </div>

        {/* Card Body */}
        <div className="card-body">
          {/* Title */}
          <h3 
            className="card-title" 
            title={course.title}
            onClick={() => onOpenVideo(course)}
          >
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="card-instructor">
            {course.instructor}
          </p>

          {/* Badges Row - Exactly like user's photo */}
          <div className="card-badges-row">
            <span className="badge-sales-leader">
              {badgeText}
            </span>

            <div className="badge-rating-group">
              <span className="star-icon">
                <IconStar size={13} fill="#f59e0b" color="#f59e0b" />
              </span>
              <span className="rating-value">
                {course.rating.toString().replace('.', ',')}
              </span>
            </div>

            <span className="badge-reviews-count">
              {reviewsText}
            </span>
          </div>

          {/* Card Footer - Price & Action Button */}
          <div className="card-footer-row">
            <div className="price-column">
              <span className="current-price">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="original-price">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>

            <button
              type="button"
              className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={() => onAddToCart(course)}
            >
              {isInCart ? (
                <>
                  <IconCheck size={15} />
                  <span>{cartBtnText}</span>
                </>
              ) : (
                <span>{cartBtnText}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
