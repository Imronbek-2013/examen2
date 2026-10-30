import React from 'react';

// Reusable Shimmer Box
export const SkeletonBox = ({ className = '', style = {} }) => (
  <div className={`skeleton-box ${className}`} style={style}>
    <div className="skeleton-shimmer"></div>
  </div>
);

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="hero-content">
      {/* Pill Badge Skeleton */}
      <SkeletonBox className="skeleton-pill" style={{ width: '280px', height: '32px', borderRadius: '100px' }} />

      {/* Headline Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
        <SkeletonBox style={{ width: '85%', height: '46px', borderRadius: '8px' }} />
        <SkeletonBox style={{ width: '68%', height: '46px', borderRadius: '8px' }} />
      </div>

      {/* Subtitle Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        <SkeletonBox style={{ width: '95%', height: '16px', borderRadius: '4px' }} />
        <SkeletonBox style={{ width: '90%', height: '16px', borderRadius: '4px' }} />
        <SkeletonBox style={{ width: '60%', height: '16px', borderRadius: '4px' }} />
      </div>

      {/* Buttons Skeleton */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
        <SkeletonBox style={{ width: '180px', height: '52px', borderRadius: '14px' }} />
        <SkeletonBox style={{ width: '210px', height: '52px', borderRadius: '14px' }} />
      </div>

      {/* Stats Bar Skeleton */}
      <div className="hero-stats-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="hero-stat-card">
            <SkeletonBox style={{ width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <SkeletonBox style={{ width: '80px', height: '18px', borderRadius: '4px' }} />
              <SkeletonBox style={{ width: '110px', height: '12px', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero Visual Media Skeleton
export function HeroMediaSkeleton() {
  return (
    <div className="hero-feature-preview-card skeleton-card" style={{ cursor: 'default' }}>
      <div className="preview-media-container skeleton-box" style={{ width: '100%', height: '100%', minHeight: '360px' }}>
        <div className="skeleton-shimmer"></div>
        <div className="preview-play-pulse-btn" style={{ background: 'rgba(255,255,255,0.25)', animation: 'none' }}>
          <SkeletonBox style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  );
}

// Features Section Skeleton (4 cards)
export function FeaturesSkeleton() {
  return (
    <div className="features-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="feature-card-box skeleton-card">
          <SkeletonBox style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '16px' }} />
          <SkeletonBox style={{ width: '70%', height: '20px', borderRadius: '6px', marginBottom: '12px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonBox style={{ width: '100%', height: '14px', borderRadius: '4px' }} />
            <SkeletonBox style={{ width: '92%', height: '14px', borderRadius: '4px' }} />
            <SkeletonBox style={{ width: '65%', height: '14px', borderRadius: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Testimonials Section Skeleton (3 cards)
export function TestimonialsSkeleton() {
  return (
    <div className="testimonials-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="testimonial-card skeleton-card">
          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <SkeletonBox key={s} style={{ width: '16px', height: '16px', borderRadius: '3px' }} />
            ))}
          </div>

          {/* Quote text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
            <SkeletonBox style={{ width: '98%', height: '15px', borderRadius: '4px' }} />
            <SkeletonBox style={{ width: '92%', height: '15px', borderRadius: '4px' }} />
            <SkeletonBox style={{ width: '75%', height: '15px', borderRadius: '4px' }} />
          </div>

          {/* Author */}
          <div className="testimonial-author-row">
            <SkeletonBox style={{ width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <SkeletonBox style={{ width: '120px', height: '16px', borderRadius: '4px' }} />
              <SkeletonBox style={{ width: '160px', height: '12px', borderRadius: '4px' }} />
            </div>
          </div>

          {/* Verified tag */}
          <SkeletonBox style={{ width: '170px', height: '22px', borderRadius: '4px', marginTop: '4px' }} />
        </div>
      ))}
    </div>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton() {
  return (
    <div className="cart-item-card skeleton-card">
      <SkeletonBox style={{ width: '80px', height: '54px', borderRadius: '8px', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
        <SkeletonBox style={{ width: '85%', height: '14px', borderRadius: '4px' }} />
        <SkeletonBox style={{ width: '50%', height: '12px', borderRadius: '4px' }} />
        <SkeletonBox style={{ width: '60px', height: '16px', borderRadius: '4px' }} />
      </div>
      <SkeletonBox style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
    </div>
  );
}
