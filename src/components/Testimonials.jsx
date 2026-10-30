import React from 'react';
import { TESTIMONIALS } from '../data/coursesData';
import { IconStar, IconCheck, IconSparkles } from './Icons';
import { TestimonialsSkeleton } from './Skeletons';

export default function Testimonials({ lang, isLoading = false }) {
  return (
    <section className="testimonials-section">
      <div className="section-container">
        <div className="features-header-center">
          <span className="features-badge-tag">
            <IconSparkles size={14} />
            {lang === 'UZ' ? 'Talabalarimiz fikri' : 'Отзывы студентов'}
          </span>
          <h2 className="section-main-title">
            {lang === 'UZ' 
              ? 'Hatto 20 yillik stajga ega dizaynerlar ham "VAAAAUUUUU!" demoqda' 
              : 'Даже дизайнеры с 20-летним стажем говорят "ВАУУУУ!"'}
          </h2>
          <p className="section-subtitle centered">
            {lang === 'UZ'
              ? "Platformamizdagi real talabalarning tasdiqlangan fikrlari va taassurotlari"
              : "Реальные отзывы наших студентов и профессионалов индустрии"}
          </p>
        </div>

        {isLoading ? (
          <TestimonialsSkeleton />
        ) : (
          <div className="testimonials-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="testimonial-card">
                <div className="test-stars-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <IconStar key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p className="testimonial-quote">"{item.text}"</p>

                <div className="testimonial-author-row">
                  <img src={item.avatar} alt={item.name} className="author-avatar-img" />
                  <div>
                    <h4 className="author-name-text">{item.name}</h4>
                    <p className="author-role-text">{item.role}</p>
                  </div>
                </div>

                <div className="verified-course-tag">
                  <IconCheck size={12} />
                  <span>{item.course}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
