import React from 'react';
import { IconSparkles, IconPlay, IconAward, IconUsers, IconShield, IconArrowRight } from './Icons';
import { HeroSkeleton, HeroMediaSkeleton } from './Skeletons';

export default function Hero({ lang, isLoading = false, onExploreClick, onWatchTrailerClick }) {
  return (
    <section className="hero-section">
      <div className="hero-glow-blob top-left"></div>
      <div className="hero-glow-blob bottom-right"></div>

      <div className="section-container hero-inner-container">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <div className="hero-content">
            {/* Top Badge */}
            <div className="hero-pill-badge">
              <span className="badge-sparkle-dot"></span>
              <IconSparkles size={14} />
              <span>
                {lang === 'UZ' 
                  ? "2026-yilning eng samarali IT & AI ta'lim platformasi" 
                  : "Передовая образовательная платформа по IT & AI 2026"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="hero-headline">
              {lang === 'UZ' ? (
                <>
                  Kelajak kasblarini <br />
                  <span className="gradient-text">20 yillik tajribaga ega</span> ekspertlar bilan o'rganing
                </>
              ) : (
                <>
                  Освойте IT и AI технологии <br />
                  с <span className="gradient-text">экспертами мирового уровня</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtext">
              {lang === 'UZ'
                ? "Sun'iy intellekt agentlari, Python, React, Kiberxavfsizlik va zamonaviy backend. Odam narxidagi kurslar, amaliy video darslar va xalqaro sertifikat."
                : "AI-агенты, Python, React, Кибербезопасность и облачный backend. Доступные честные цены, видео-практика и признанные сертификаты."}
            </p>

            {/* Action Buttons */}
            <div className="hero-actions-group">
              <button
                type="button"
                className="hero-primary-btn"
                onClick={onExploreClick}
              >
                <span>{lang === 'UZ' ? 'Kurslarni ko\'rish' : 'Смотреть курсы'}</span>
                <IconArrowRight size={18} />
              </button>

              <button
                type="button"
                className="hero-secondary-btn"
                onClick={onWatchTrailerClick}
              >
                <div className="play-icon-circle">
                  <IconPlay size={14} fill="#7c3aed" color="#7c3aed" />
                </div>
                <span>{lang === 'UZ' ? 'Platforma treyleri (HD)' : 'Видео-превью платформы'}</span>
              </button>
            </div>

            {/* Floating Trust Stats Bar */}
            <div className="hero-stats-grid">
              <div className="hero-stat-card">
                <div className="stat-icon-wrap"><IconUsers size={20} /></div>
                <div>
                  <h4 className="stat-number">45,000+</h4>
                  <p className="stat-label">{lang === 'UZ' ? 'Muvaffaqiyatli talabalar' : 'Студентов'}</p>
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="stat-icon-wrap"><IconAward size={20} /></div>
                <div>
                  <h4 className="stat-number">4.9 / 5</h4>
                  <p className="stat-label">{lang === 'UZ' ? 'O\'rtacha talaba bahosi' : 'Средняя оценка'}</p>
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="stat-icon-wrap"><IconShield size={20} /></div>
                <div>
                  <h4 className="stat-number">100%</h4>
                  <p className="stat-label">{lang === 'UZ' ? 'Amaliy ko\'nikmalar' : 'Практика и код'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Interactive Media Card */}
        <div className="hero-visual-card-wrap">
          {isLoading ? (
            <HeroMediaSkeleton />
          ) : (
            <div className="hero-feature-preview-card" onClick={onWatchTrailerClick}>
              <div className="preview-media-container">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Interactive Tech Courses"
                  className="preview-media-img"
                />
                <div className="preview-play-pulse-btn">
                  <IconPlay size={24} fill="#ffffff" color="#ffffff" />
                </div>
                <div className="preview-floating-badge top-badge">
                  <span className="live-dot"></span>
                  <span>Interaktiv video darslar</span>
                </div>
                <div className="preview-floating-badge bottom-badge">
                  <span className="price-tag-value">19,99 $ dan boshlab</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
