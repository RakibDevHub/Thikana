import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;