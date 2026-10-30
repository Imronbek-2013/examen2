import React, { useState, useMemo } from 'react';
import CourseCard from './CourseCard';
import CourseCardSkeleton from './CourseCardSkeleton';
import { CATEGORIES } from '../data/coursesData';
import { IconSearch, IconX } from './Icons';

export default function CoursesGrid({
  courses,
  currency,
  lang,
  cart,
  wishlist,
  searchTerm,
  isLoading = false,
  onAddToCart,
  onToggleFavorite,
  onOpenVideo
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // popular | rating | price-asc | price-desc
  const [levelFilter, setLevelFilter] = useState('all');
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const handleCategorySelect = (catId) => {
    if (catId === selectedCategory) return;
    setIsCategoryLoading(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsCategoryLoading(false);
    }, 350);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

      // Search filter
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchTerm ||
        course.title.toLowerCase().includes(searchLower) ||
        (course.uzTitle && course.uzTitle.toLowerCase().includes(searchLower)) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower);

      // Level filter
      const matchesLevel = levelFilter === 'all' || 
        (levelFilter === 'beginner' && (course.level.includes("Boshlang'ich") || course.level.includes("Barcha"))) ||
        (levelFilter === 'pro' && (course.level.includes("Professional") || course.level.includes("Yuqori")));

      return matchesCategory && matchesSearch && matchesLevel;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: popular (reviews count desc)
      return b.reviewsCount - a.reviewsCount;
    });
  }, [courses, selectedCategory, searchTerm, levelFilter, sortBy]);

  const showSkeleton = isLoading || isCategoryLoading;

  return (
    <section className="courses-grid-section" id="all-courses-section">
      <div className="section-container">
        {/* Section Title */}
        <div className="grid-header-wrap">
          <div>
            <h2 className="section-main-title">
              {lang === 'UZ' ? 'Barcha Kurslar Katalogi' : 'Каталог всех курсов'}
            </h2>
            <p className="section-subtitle">
              {lang === 'UZ' 
                ? "O'zingizga mos sohani tanlang va hoziroq o'rganishni boshlang" 
                : "Выберите интересующее направление и начните обучение"}
            </p>
          </div>

          {/* Sort Control */}
          <div className="sort-dropdown-wrap">
            <label htmlFor="sort-select" className="sort-label">
              {lang === 'UZ' ? 'Saralash:' : 'Сортировка:'}
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select-input"
            >
              <option value="popular">{lang === 'UZ' ? 'Eng ommabop' : 'По популярности'}</option>
              <option value="rating">{lang === 'UZ' ? 'Eng yuqori reyting' : 'По рейтингу'}</option>
              <option value="price-asc">{lang === 'UZ' ? 'Narx: Arzondan qimmatga' : 'Сначала дешевле'}</option>
              <option value="price-desc">{lang === 'UZ' ? 'Narx: Qimmatdan arzonga' : 'Сначала дороже'}</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="category-tabs-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`cat-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <span>{lang === 'UZ' ? cat.name : cat.ruName}</span>
              {cat.id !== 'all' && (
                <span className="cat-count-badge">
                  {courses.filter(c => c.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Counter & Active Filters Bar */}
        <div className="results-status-bar">
          <span className="results-count">
            {showSkeleton ? (
              lang === 'UZ' ? 'Kurslar yuklanmoqda...' : 'Загрузка курсов...'
            ) : (
              lang === 'UZ' 
                ? `Jami ${filteredCourses.length} ta kurs topildi` 
                : `Найдено курсов: ${filteredCourses.length}`
            )}
          </span>

          {(selectedCategory !== 'all' || searchTerm) && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setLevelFilter('all');
              }}
            >
              <IconX size={14} />
              <span>{lang === 'UZ' ? 'Filtrlarni bekor qilish' : 'Сбросить фильтры'}</span>
            </button>
          )}
        </div>

        {/* Courses Grid / Skeleton */}
        {showSkeleton ? (
          <div className="courses-cards-grid">
            {[...Array(8)].map((_, idx) => (
              <CourseCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="courses-cards-grid">
            {filteredCourses.map((course) => (
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
            ))}
          </div>
        ) : (
          <div className="empty-results-box">
            <div className="empty-icon-circle">
              <IconSearch size={32} />
            </div>
            <h3>{lang === 'UZ' ? 'Kurslar topilmadi' : 'Курсы не найдены'}</h3>
            <p>
              {lang === 'UZ' 
                ? "Qidiruv so'zini o'zgartirib ko'ring yoki boshqa toifani tanlang." 
                : "Попробуйте изменить поисковый запрос или выбрать другую категорию."}
            </p>
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setSelectedCategory('all');
              }}
            >
              {lang === 'UZ' ? 'Barcha kurslarni ko\'rsatish' : 'Показать все курсы'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
