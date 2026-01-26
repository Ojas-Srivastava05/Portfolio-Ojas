import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import CodingStats from "./sections/CodingStats";
import { Navbar } from "./components/Navbar";  // Use named import if it's a named export
import About from "./sections/About";
import Toolkit from "./sections/Toolkit";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

import Experience from "./sections/Experience";
import ScrollProgress from "./components/ScrollProgress";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      <ScrollProgress />
      <CustomCursor />
      <Background />

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-[5] bg-gradient-radial from-transparent via-transparent to-black/60" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <CodingStats />
          <Toolkit />
          <Contact />
        </main>
        <Footer />

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-red-600/90 text-white shadow-lg shadow-red-500/30 hover:bg-red-500 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-red-400"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
