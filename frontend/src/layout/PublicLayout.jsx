import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import BackToTop from '../components/common/BackToTop';

const PublicLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(80);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Create a ResizeObserver to watch for header size changes
    const observer = new ResizeObserver(updateHeaderHeight);
    const header = document.querySelector('header');
    if (header) {
      observer.observe(header);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (header) {
        observer.unobserve(header);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header headerHeight={headerHeight} />
      <main style={{ paddingTop: `${headerHeight}px` }}>
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default PublicLayout;