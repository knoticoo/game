import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Crown, Users, Coins, Sword, BookOpen, Settings, Home } from 'lucide-react';
import ResourcePanel from '../ui/ResourcePanel';
import QuickActions from '../ui/QuickActions';
import './GameScreen.css';

const GameScreen = () => {
  const navigate = useNavigate();
  const { playerName, currentChapter } = useSelector((state) => state.game);
  const { gold, soldiers, influence, prestige } = useSelector((state) => state.resource);

  const quickActions = [
    {
      id: 'narrative',
      title: 'Continue Story',
      icon: <BookOpen className="action-icon" />,
      action: () => navigate('/narrative'),
      description: 'Continue your royal journey',
    },
    {
      id: 'characters',
      title: 'Court & Companions',
      icon: <Users className="action-icon" />,
      action: () => navigate('/characters'),
      description: 'Manage your relationships',
    },
    {
      id: 'combat',
      title: 'Battles & Challenges',
      icon: <Sword className="action-icon" />,
      action: () => navigate('/combat'),
      description: 'Face your enemies',
    },
    {
      id: 'resources',
      title: 'Kingdom Management',
      icon: <Coins className="action-icon" />,
      action: () => navigate('/resources'),
      description: 'Manage your resources',
    },
  ];

  return (
    <div className="game-screen">
      <div className="game-header">
        <div className="header-left">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            <Home className="btn-icon" />
            Main Menu
          </button>
        </div>
        
        <div className="header-center">
          <h1>Welcome, {playerName}</h1>
          <p>Chapter {currentChapter} - The Royal Court</p>
        </div>
        
        <div className="header-right">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/settings')}
          >
            <Settings className="btn-icon" />
            Settings
          </button>
        </div>
      </div>

      <div className="game-content">
        <div className="resource-panel">
          <ResourcePanel />
        </div>

        <div className="main-content">
          <div className="welcome-section">
            <div className="royal-banner">
              <Crown className="banner-crown" />
              <h2>Your Kingdom Awaits</h2>
              <p>Make choices that will shape your legacy as a ruler</p>
            </div>

            <div className="quick-actions-grid">
              {quickActions.map((action) => (
                <div
                  key={action.id}
                  className="quick-action-card"
                  onClick={action.action}
                >
                  <div className="action-icon-container">
                    {action.icon}
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="kingdom-status">
            <h3>Kingdom Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Treasury:</span>
                <span className="status-value">{gold.toLocaleString()} Gold</span>
              </div>
              <div className="status-item">
                <span className="status-label">Army:</span>
                <span className="status-value">{soldiers} Soldiers</span>
              </div>
              <div className="status-item">
                <span className="status-label">Influence:</span>
                <span className="status-value">{influence}%</span>
              </div>
              <div className="status-item">
                <span className="status-label">Prestige:</span>
                <span className="status-value">{prestige}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="game-footer">
        <p>Choose your path wisely, Your Majesty</p>
      </div>
    </div>
  );
};

export default GameScreen;