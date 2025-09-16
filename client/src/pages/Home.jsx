import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token every time component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // convert to boolean
  }, []);

  return (
    <div>
      <Navbar />
      <Header />

      {/* Only show Get Started if NOT logged in */}
      {!isLoggedIn && (
        <div className="text-center mt-8">
          <a
            href="/auth"
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Get Started
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
