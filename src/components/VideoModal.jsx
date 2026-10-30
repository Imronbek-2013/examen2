import React, { useState, useRef, useEffect } from 'react';
import {
  IconX,
  IconPlay,
  IconPause,
  IconVolume,
  IconVolumeMute,
  IconMaximize,
  IconCheck,
  IconClock,
  IconBook,
  IconStar,
  IconCart,
  IconAward,
  IconUsers
} from './Icons';

export default function VideoModal({
  course,
  currency,
  lang,
  isInCart,
  onClose,
  onAddToCart
}) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('syllabus'); // syllabus | overview | instructor
  const [isBuffering, setIsBuffering] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBuffering(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeLessonIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const currentLesson = course.syllabus?.[activeLessonIndex] || {
    title: course.title,
    duration: "15:00",
    isFree: true
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatPrice = (usdPrice) => {
    if (currency === 'UZS') {
      const uzs = Math.round(usdPrice * 12850);
      return `${uzs.toLocaleString('uz-UZ')} so'm`;
    }
    return `${usdPrice.toFixed(2).replace('.', ',')} $`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <span className="badge-sales-leader">
              {course.badge || 'Лидер продаж'}
            </span>
            <h2 className="modal-course-title">{course.title}</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose} aria-label="Yopish">
            <IconX size={22} />
          </button>
        </div>

        {/* Modal Main Grid (Player + Lessons) */}
        <div className="modal-content-grid">
          {/* Left Column: Player & Active Lesson Info */}
          <div className="modal-player-column">
            <div className="video-player-container">
              {isBuffering && (
                <div className="video-player-skeleton-overlay">
                  <div className="skeleton-shimmer"></div>
                  <div className="video-skeleton-loader-chip">
                    <div className="sound-wave-bars">
                      <span className="wave-bar"></span>
                      <span className="wave-bar"></span>
                      <span className="wave-bar"></span>
                    </div>
                    <span>{lang === 'UZ' ? 'Dars yuklanmoqda...' : 'Загрузка видео-урока...'}</span>
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                src={course.videoUrl}
                poster={course.image}
                className="main-html5-video"
                autoPlay
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
              />

              {/* Custom floating mini bar */}
              <div className="custom-player-control-strip">
                <div className="controls-left">
                  <button type="button" className="ctrl-btn" onClick={handlePlayPause}>
                    {isPlaying ? <IconPause size={18} /> : <IconPlay size={18} fill="#ffffff" />}
                  </button>
                  <button type="button" className="ctrl-btn" onClick={handleMute}>
                    {isMuted ? <IconVolumeMute size={18} /> : <IconVolume size={18} />}
                  </button>
                  <span className="current-playing-title">
                    {currentLesson.title}
                  </span>
                </div>

                <div className="controls-right">
                  {/* Speed Selector */}
                  <div className="speed-pills-group">
                    {[1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`speed-pill ${playbackSpeed === s ? 'active' : ''}`}
                        onClick={() => handleSpeedChange(s)}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <button type="button" className="ctrl-btn" onClick={handleFullScreen} title="To'liq ekran">
                    <IconMaximize size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Lesson Description & Stats */}
            <div className="lesson-details-box">
              <div className="lesson-stats-bar">
                <div className="stat-item">
                  <IconClock size={16} />
                  <span>Davomiyligi: {course.duration}</span>
                </div>
                <div className="stat-item">
                  <IconBook size={16} />
                  <span>{course.totalLessons} ta dars</span>
                </div>
                <div className="stat-item">
                  <IconUsers size={16} />
                  <span>{course.studentsCount} o'quvchi</span>
                </div>
                <div className="stat-item">
                  <IconStar size={16} fill="#f59e0b" color="#f59e0b" />
                  <span>{course.rating} ({course.reviewsCount} baho)</span>
                </div>
              </div>

              <p className="course-lead-desc">{course.description}</p>
            </div>
          </div>

          {/* Right Column: Interactive Curriculum / Syllabus */}
          <div className="modal-sidebar-column">
            {/* Tabs */}
            <div className="sidebar-tabs-bar">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
                onClick={() => setActiveTab('syllabus')}
              >
                {lang === 'UZ' ? 'Darslar' : 'Уроки'} ({course.syllabus?.length || 5})
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                {lang === 'UZ' ? 'Imkoniyatlar' : 'О курсе'}
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'instructor' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructor')}
              >
                {lang === 'UZ' ? 'Spiker' : 'Автор'}
              </button>
            </div>

            {/* Tab: Syllabus List */}
            {activeTab === 'syllabus' && (
              <div className="lessons-playlist-wrap">
                <div className="playlist-header">
                  <span className="playlist-label">
                    {lang === 'UZ' ? 'Ochiq darslar ro\'yxati:' : 'Список уроков программы:'}
                  </span>
                  <span className="playlist-tag">HD 1080p</span>
                </div>

                <div className="lessons-list">
                  {course.syllabus?.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className={`lesson-item-row ${activeLessonIndex === idx ? 'active-lesson' : ''}`}
                      onClick={() => {
                        setIsBuffering(true);
                        setActiveLessonIndex(idx);
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play();
                        }
                      }}
                    >
                      <div className="lesson-left">
                        <span className="lesson-play-icon">
                          {activeLessonIndex === idx && isPlaying ? (
                            <span className="sound-wave-bars">
                              <span className="wave-bar"></span>
                              <span className="wave-bar"></span>
                              <span className="wave-bar"></span>
                            </span>
                          ) : (
                            <IconPlay size={14} fill={activeLessonIndex === idx ? '#7c3aed' : '#94a3b8'} color={activeLessonIndex === idx ? '#7c3aed' : '#94a3b8'} />
                          )}
                        </span>
                        <div className="lesson-text-meta">
                          <span className="lesson-title-text">{lesson.title}</span>
                          <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                      </div>

                      <div className="lesson-right">
                        {lesson.isFree ? (
                          <span className="free-preview-pill">{lang === 'UZ' ? 'Bepul' : 'Бесплатно'}</span>
                        ) : (
                          <span className="locked-pill">{lang === 'UZ' ? '🔒 To\'liq' : '🔒 Полный'}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="overview-tab-content">
                <h4 className="tab-section-title">
                  {lang === 'UZ' ? 'Kurs nimani o\'rgatadi?' : 'Чему вы научитесь?'}
                </h4>
                <ul className="features-checklist">
                  {course.features?.map((feat, i) => (
                    <li key={i} className="feature-check-item">
                      <span className="check-bullet"><IconCheck size={14} /></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="certificate-promo-card">
                  <IconAward size={24} className="cert-icon" />
                  <div>
                    <h5>{lang === 'UZ' ? 'Xalqaro sertifikat' : 'Сертификат об окончании'}</h5>
                    <p>
                      {lang === 'UZ' 
                        ? 'Kursni tugatgach portfolio va LinkedIn uchun tasdiqlangan QR-kodli sertifikat beriladi.'
                        : 'После прохождения выдается верифицированный сертификат с QR-кодом для резюме.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Instructor */}
            {activeTab === 'instructor' && (
              <div className="instructor-tab-content">
                <div className="instructor-profile-card">
                  <div className="inst-avatar-wrap">
                    <img src={course.image} alt={course.instructor} className="inst-img" />
                  </div>
                  <div>
                    <h4 className="inst-name">{course.instructor}</h4>
                    <p className="inst-role">{course.instructorRole}</p>
                    <div className="inst-stats">
                      <span>⭐ {course.rating}</span>
                      <span>•</span>
                      <span>{course.studentsCount} {lang === 'UZ' ? 'talaba' : 'студентов'}</span>
                    </div>
                  </div>
                </div>
                <p className="inst-bio">
                  {lang === 'UZ'
                    ? "20 yildan ortiq dasturiy ta'minot, AI arxitekturasi va korporativ texnologiyalar bo'yicha boy amaliy tajribaga ega ekspert."
                    : "Эксперт с опытом более 20 лет в архитектуре ПО, AI и enterprise-системах. Выпускники работают в ведущих компаниях."}
                </p>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="modal-cta-box">
              <div className="modal-price-strip">
                <span className="label">{lang === 'UZ' ? 'Kurs narxi:' : 'Цена курса:'}</span>
                <span className="modal-bold-price">{formatPrice(course.price)}</span>
                {course.originalPrice && (
                  <span className="modal-strikethrough-price">{formatPrice(course.originalPrice)}</span>
                )}
              </div>

              <button
                type="button"
                className={`modal-buy-btn ${isInCart ? 'already-in' : ''}`}
                onClick={() => onAddToCart(course)}
              >
                {isInCart ? (
                  <>
                    <IconCheck size={18} />
                    <span>{lang === 'UZ' ? 'Savatda' : 'В корзине'}</span>
                  </>
                ) : (
                  <>
                    <IconCart size={18} />
                    <span>{lang === 'UZ' ? 'Savatga qo\'shish' : 'Добавить в корзину'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
