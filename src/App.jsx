import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularCoursesCarousel from './components/PopularCoursesCarousel';
import CoursesGrid from './components/CoursesGrid';
import VideoModal from './components/VideoModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { COURSES_DATA } from './data/coursesData';

export default function App() {
  const [courses] = useState(COURSES_DATA);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState('USD'); // USD or UZS
  const [lang, setLang] = useState('RU'); // RU by default to match user's screenshot, with 1-click toggle to UZ!
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideoCourse, setActiveVideoCourse] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initial skeleton load animation on page startup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 850);
  };

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('apex_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('apex_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Handle dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (toastObj) => {
    const text = toastObj.message
      ? `${toastObj.title ? toastObj.title + ': ' : ''}${toastObj.message}`
      : toastObj.title;

    switch (toastObj.type) {
      case 'cart':
        toast.success(text, { icon: '🛒' });
        break;
      case 'wishlist':
        toast.info(text, { icon: '❤️' });
        break;
      case 'promo':
        toast.success(text, { icon: '✨' });
        break;
      case 'success':
        toast.success(text);
        break;
      default:
        toast.info(text);
        break;
    }
  };

  const handleAddToCart = (course) => {
    const exists = cart.some(item => item.id === course.id);
    if (exists) {
      setCart(cart.filter(item => item.id !== course.id));
      showToast({
        type: 'info',
        title: lang === 'UZ' ? 'Savatdan olib tashlandi' : 'Удалено из корзины',
        message: course.title
      });
    } else {
      setCart([...cart, course]);
      showToast({
        type: 'cart',
        title: lang === 'UZ' ? 'Savatga muvaffaqiyatli qo\'shildi' : 'Курс добавлен в корзину',
        message: `${course.title} (${course.price} $)`
      });
    }
  };

  const handleRemoveFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
    showToast({
      type: 'info',
      title: lang === 'UZ' ? 'O\'chirildi' : 'Удалено',
      message: lang === 'UZ' ? 'Kurs savatdan olib tashlandi' : 'Курс удален из корзины'
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleFavorite = (course) => {
    const exists = wishlist.some(item => item.id === course.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== course.id));
      showToast({
        type: 'info',
        title: lang === 'UZ' ? 'Sevimlilardan olindi' : 'Удалено из избранного',
        message: course.title
      });
    } else {
      setWishlist([...wishlist, course]);
      showToast({
        type: 'wishlist',
        title: lang === 'UZ' ? 'Sevimlilarga saqlandi' : 'Добавлено в избранное',
        message: course.title
      });
    }
  };

  const handleApplyPromo = (code, percent) => {
    setAppliedPromo(code);
    setDiscountPercent(percent);
    showToast({
      type: 'promo',
      title: lang === 'UZ' ? 'Promokod tasdiqlandi!' : 'Промокод применен!',
      message: lang === 'UZ' ? `Sizga -${percent}% chegirma taqdim etildi` : `Скидка -${percent}% активирована`
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = Math.max(0, cartTotal - (cartTotal * discountPercent) / 100);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSuccessfulPayment = () => {
    setCart([]);
    showToast({
      type: 'success',
      title: lang === 'UZ' ? 'Xarid tasdiqlandi!' : 'Заказ успешно оформлен!',
      message: lang === 'UZ' ? 'Barcha video darslar kabinetingizda ochildi' : 'Все курсы активированы в личном кабинете'
    });
  };

  const handleScrollToCourses = () => {
    const el = document.getElementById('all-courses-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchPlatformTrailer = () => {
    setActiveVideoCourse(courses[0]);
  };

  return (
    <div className="app-root">
      {/* React-Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "colored"}
      />

      {/* Modern Header & Navbar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currency={currency}
        onCurrencyChange={setCurrency}
        lang={lang}
        onLangChange={setLang}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        cartCount={cart.length}
        cartTotal={discountedTotal}
        wishlistCount={wishlist.length}
        isLoading={isLoading}
        onSimulateLoading={handleSimulateLoading}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          lang={lang}
          isLoading={isLoading}
          onExploreClick={handleScrollToCourses}
          onWatchTrailerClick={handleWatchPlatformTrailer}
        />

        {/* User's Exact Image Section: Popular Courses Carousel */}
        <PopularCoursesCarousel
          courses={courses}
          currency={currency}
          lang={lang}
          cart={cart}
          wishlist={wishlist}
          isLoading={isLoading}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          onOpenVideo={setActiveVideoCourse}
        />

        {/* Why Choose Us & Trust Badges */}
        <Features lang={lang} isLoading={isLoading} />

        {/* All Courses Directory Grid with filters & search */}
        <CoursesGrid
          courses={courses}
          currency={currency}
          lang={lang}
          cart={cart}
          wishlist={wishlist}
          searchTerm={searchTerm}
          isLoading={isLoading}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          onOpenVideo={setActiveVideoCourse}
        />

        {/* Student Testimonials ("20 yillik stajli dizayner ham VAAUUU deydi") */}
        <Testimonials lang={lang} isLoading={isLoading} />
      </main>

      {/* Interactive Video Learning Player Modal */}
      {activeVideoCourse && (
        <VideoModal
          course={activeVideoCourse}
          currency={currency}
          lang={lang}
          isInCart={cart.some(item => item.id === activeVideoCourse.id)}
          onClose={() => setActiveVideoCourse(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        lang={lang}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCheckout}
        discountPercent={discountPercent}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        lang={lang}
        cart={cart}
        onRemoveFromWishlist={(id) => setWishlist(wishlist.filter(w => w.id !== id))}
        onAddToCart={handleAddToCart}
        onOpenVideo={setActiveVideoCourse}
      />

      {/* Realistic Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={discountedTotal}
        currency={currency}
        lang={lang}
        onSuccessfulPayment={handleSuccessfulPayment}
      />

      {/* Footer */}
      <Footer lang={lang} onShowToast={showToast} />
    </div>
  );
}
