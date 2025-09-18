import React from 'react';
import { Crown, Sword, Gem } from 'lucide-react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">
          <Crown className="crown-icon" />
          <Sword className="sword-icon" />
          <Gem className="gem-icon" />
        </div>
        <h1 className="loading-title">King's Choice</h1>
        <p className="loading-subtitle">A Royal Strategy Game</p>
        <div className="loading-spinner"></div>
        <p className="loading-text">Preparing your kingdom...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;