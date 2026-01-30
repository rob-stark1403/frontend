import { useState, useContext, useEffect } from "react";
import { CTASection, FeaturesGrid, Footer, HeroSection, StatsSection } from "../components/homepagecompo";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import MediChainChatbot from "../components/chatbot";
import React from "react";

function Homepage() {
  const [userType, setUserType] = useState('patient');
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if (user && user.usertype) {
      setUserType(user.usertype.toLowerCase());
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Floating Chatbot */}
      <MediChainChatbot />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-20 md:pt-24 pb-16">
          <HeroSection userType={userType} />
        </section>

        {/* Decorative Divider */}
        <div className="relative h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 max-w-5xl mx-auto" />

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white/50 backdrop-blur-sm">
          <FeaturesGrid userType={userType} />
        </section>

        {/* Decorative Divider */}
        <div className="relative h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 max-w-5xl mx-auto" />

        {/* Stats Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <StatsSection userType={userType} />
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="relative h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20 max-w-5xl mx-auto" />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700" />
          
          {/* Animated Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative z-10">
            <CTASection userType={userType} />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
          <Footer />
        </footer>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8 z-50
            p-4 
            bg-gradient-to-br from-blue-600 to-purple-600
            text-white
            rounded-full
            shadow-2xl shadow-blue-500/30
            hover:shadow-blue-500/50
            hover:scale-110
            active:scale-95
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            group
          "
          aria-label="Scroll to top"
        >
          {/* Arrow Icon */}
          <svg 
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={3}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>

          {/* Pulsing Background Effect */}
          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
        </button>
      )}
    </>
  );
};

export default Homepage;