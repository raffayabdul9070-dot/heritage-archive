import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const fullText = "Preserving the cultural DNA of the Indus through its 74+ living languages.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-screen">
      {/* BACKGROUND & OVERLAYS */}
      <div className="hero-background-layer">
        <img src="/background-map.jpg" alt="Heritage Map" className="bg-image-content" />
        <div className="overlay-darkener"></div>
        <div className="particle-layer"></div>
      </div>

      {/* CENTER CONTENT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="hero-central-content"
      >
        <span className="hero-badge">Digital Archive 2025</span>
        
        <h1 className="hero-main-title">
          Geolinguistic Survey of <span className="gold-gradient">Pakistan</span>
        </h1>
        
        <p className="hero-tagline">
          {text}<span className="cursor">|</span>
        </p>
        
        <div className="btn-group">
          <button className="btn-gold" onClick={() => navigate('/about')}>
            EXPLORE ARCHIVE
          </button>
          <button className="btn-outline" onClick={() => navigate('/survey')}>
            START SURVEY
          </button>
        </div>
      </motion.div>

      {/* STATS BAR */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="home-stats-bar"
      >
        <div className="stat-item">
          <span className="stat-num">74</span>
          <span className="stat-lab">Languages</span>
        </div>
        <div className="stat-sep"></div>
        <div className="stat-item">
          <span className="stat-num">1.2k+</span>
          <span className="stat-lab">Dialects</span>
        </div>
        <div className="stat-sep"></div>
        <div className="stat-item">
          <span className="stat-num">240M</span>
          <span className="stat-lab">Voices</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;