import React, { useRef, useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import CourseCardSkeleton from './CourseCardSkeleton';
import { IconChevronLeft, IconChevronRight, IconSparkles } from './Icons';

export default function PopularCoursesCarousel({
  courses,
  currency,
  lang,
  cart,
  wishlist,
  isLoading = false,
  onAddToCart,
  onToggleFavorite,
  onOpenVideo
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [tabLoading, setTabLoading] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [courses, tabLoading, isLoading]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 320;
      const scrollAmount = direction === 'next' ? cardWidth * 2 : -cardWidth * 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeFilter) return;
    setTabLoading(true);
    setActiveFilter(tabId);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    setTimeout(() => {
      setTabLoading(false);
    }, 400);
  };

  // Filter courses if user clicks quick tags
  const filteredCourses = activeFilter === 'all'
    ? courses
    : courses.filter(c => c.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: lang === 'UZ' ? 'Hammasi' : 'Все' },
    { id: 'ai', label: 'AI & Neyrotarmoqlar' },
    { id: 'python', label: 'Python' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const showSkeleton = isLoading || tabLoading;

  return (
    <section className="popular-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="popular-header">
          <div className="popular-title-wrap">
            <h2 className="section-main-title">
              {lang === 'UZ' ? 'Mashhur kurslar' : 'Популярные курсы'}
            </h2>
            <span className="section-subtitle-tag">
              <IconSparkles size={14} />
              {lang === 'UZ' ? 'Eng ko\'p tavsiya etilgan' : 'Выбор студентов 2026'}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="carousel-filter-pills">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`filter-pill-btn ${activeFilter === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container with Arrows */}
        <div className="carousel-track-wrapper">
          {/* Left Arrow Button */}
          {canScrollLeft && !showSkeleton && (
            <button
              type="button"
              className="carousel-nav-btn prev"
              onClick={() => handleScroll('prev')}
              aria-label="Oldingi kurslar"
            >
              <IconChevronLeft size={22} />
            </button>
          )}

          {/* Cards Scrollable Strip */}
          <div
            className="carousel-track"
            ref={scrollRef}
            onScroll={checkScroll}
          >
            {showSkeleton ? (
              // 4 Skeleton Cards shimmer while loading
              [...Array(4)].map((_, idx) => (
                <CourseCardSkeleton key={idx} />
              ))
            ) : (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  currency={currency}
                  lang={lang}
                  isInCart={cart.some(item => item.id === course.id)}
                  isFavorite={wishlist.some(item => item.id === course.id)}
                  onAddToCart={onAddToCart}
                  onToggleFavorite={onToggleFavorite}
                  onOpenVideo={onOpenVideo}
                />
              ))
            )}
          </div>

          {/* Right Arrow Button - Exactly like in user's image */}
          {canScrollRight && !showSkeleton && (
            <button
              type="button"
              className="carousel-nav-btn next"
              onClick={() => handleScroll('next')}
              aria-label="Keyingi kurslar"
            >
              <IconChevronRight size={22} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
