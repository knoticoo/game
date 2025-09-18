import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startNewGame, setCurrentScreen } from '../../store/slices/gameSlice';
import { Crown, Play, Settings, Trophy, BookOpen, Users, Sword } from 'lucide-react';
import './MainMenu.css';

const MainMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameStarted, playerName } = useSelector((state) => state.game);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(playerName || '');

  const handleNewGame = () => {
    if (newPlayerName.trim()) {
      dispatch(startNewGame({ playerName: newPlayerName.trim() }));
      dispatch(setCurrentScreen('game'));
      navigate('/game');
    }
  };

  const handleContinueGame = () => {
    if (gameStarted) {
      dispatch(setCurrentScreen('game'));
      navigate('/game');
    }
  };

  const menuItems = [
    {
      id: 'new-game',
      title: 'New Game',
      icon: <Play className="menu-icon" />,
      action: () => setShowNewGameModal(true),
      available: true,
    },
    {
      id: 'continue',
      title: 'Continue',
      icon: <BookOpen className="menu-icon" />,
      action: handleContinueGame,
      available: gameStarted,
    },
    {
      id: 'characters',
      title: 'Characters',
      icon: <Users className="menu-icon" />,
      action: () => navigate('/characters'),
      available: gameStarted,
    },
    {
      id: 'combat',
      title: 'Combat',
      icon: <Sword className="menu-icon" />,
      action: () => navigate('/combat'),
      available: gameStarted,
    },
    {
      id: 'achievements',
      title: 'Achievements',
      icon: <Trophy className="menu-icon" />,
      action: () => console.log('Achievements'),
      available: true,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings className="menu-icon" />,
      action: () => navigate('/settings'),
      available: true,
    },
  ];

  return (
    <div className="main-menu">
      <div className="menu-background">
        <div className="royal-pattern"></div>
      </div>
      
      <div className="menu-content">
        <div className="game-title">
          <Crown className="title-crown" />
          <h1>King's Choice</h1>
          <p className="game-subtitle">A Royal Strategy Game</p>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${!item.available ? 'disabled' : ''}`}
              onClick={item.action}
              disabled={!item.available}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {gameStarted && (
          <div className="game-info">
            <p>Welcome back, <span className="player-name">{playerName}</span>!</p>
          </div>
        )}
      </div>

      {showNewGameModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Start New Game</h2>
            <div className="input-group">
              <label htmlFor="playerName">Your Royal Name:</label>
              <input
                id="playerName"
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Enter your name..."
                maxLength={20}
                onKeyPress={(e) => e.key === 'Enter' && handleNewGame()}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowNewGameModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleNewGame}
                disabled={!newPlayerName.trim()}
              >
                Begin Reign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;