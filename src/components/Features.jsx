import React from 'react';
import { IconAward, IconShield, IconSparkles, IconBook } from './Icons';
import { FeaturesSkeleton } from './Skeletons';

export default function Features({ lang, isLoading = false }) {
  const features = [
    {
      icon: <IconSparkles size={24} />,
      title: lang === 'UZ' ? 'Odam narxi va halol ta\'lim' : 'Честные и доступные цены',
      desc: lang === 'UZ' 
        ? "Sun'iy shishirilgan qimmat narxlarsiz, har bir o'rganuvchi hamyoniga mos 19,99$ dan boshlanuvchi haqiqiy narxlar." 
        : "Без завышенных ценников. Курсы от 19,99 $ доступны каждому желающему расти в IT."
    },
    {
      icon: <IconAward size={24} />,
      title: lang === 'UZ' ? '20 yillik stajli ekspertlar' : 'Эксперты с 20-летним опытом',
      desc: lang === 'UZ'
        ? "Har bir kurs sohaning yetakchi arxitektorlari va amaliyotchilari tomonidan tayyorlangan."
        : "Каждый курс создан практикующими сеньор-разработчиками и архитекторами."
    },
    {
      icon: <IconBook size={24} />,
      title: lang === 'UZ' ? '100% Amaliy video darslar' : '100% Практические видео-уроки',
      desc: lang === 'UZ'
        ? "Ortiqcha quruq nazariyasiz, har darsda real kod yoziladi va GitHub-ga yuklanadi."
        : "Только актуальный код, реальные кейсы и разбор архитектуры проектов."
    },
    {
      icon: <IconShield size={24} />,
      title: lang === 'UZ' ? '14 kunlik kafolat va sertifikat' : 'Гарантия 14 дней и сертификат',
      desc: lang === 'UZ'
        ? "Agar kurs sizga ma'qul kelmasa, 14 kun ichida mablag'ingiz to'liq qaytariladi."
        : "100% возврат средств в течение 14 дней, если программа вам не подойдет."
    }
  ];

  return (
    <section className="features-section">
      <div className="section-container">
        <div className="features-header-center">
          <span className="features-badge-tag">
            <IconShield size={14} />
            {lang === 'UZ' ? 'Nega bizni tanlashadi?' : 'Почему выбирают нас?'}
          </span>
          <h2 className="section-main-title">
            {lang === 'UZ' 
              ? 'Sifatli IT ta\'lim hamma uchun qulay bo\'lishi shart' 
              : 'Качественное IT-образование должно быть доступным'}
          </h2>
          <p className="section-subtitle centered">
            {lang === 'UZ'
              ? "Minglab talabalar nega aynan bizning video darslarimiz orqali yuqori maoshli mutaxassisga aylandi?"
              : "Тысячи выпускников уже работают в международных IT компаниях благодаря нашим курсам."}
          </p>
        </div>

        {isLoading ? (
          <FeaturesSkeleton />
        ) : (
          <div className="features-grid">
            {features.map((feat, index) => (
              <div key={index} className="feature-card-box">
                <div className="feature-icon-circle">
                  {feat.icon}
                </div>
                <h3 className="feature-card-title">{feat.title}</h3>
                <p className="feature-card-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
