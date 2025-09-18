import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startBattle, endBattle, performAction, toggleAutoBattle } from '../../store/slices/combatSlice';
import { ArrowLeft, Sword, Shield, Zap, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CombatScreen.css';

const CombatScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    currentBattle, 
    battleState, 
    playerUnits, 
    enemyUnits, 
    battleLog, 
    autoBattle,
    battleStatistics 
  } = useSelector((state) => state.combat);

  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  // Sample battle data
  const samplePlayerUnits = [
    { id: 'player_1', name: 'Royal Guard', maxHealth: 100, currentHealth: 100, attack: 25, defense: 15, speed: 10, isAlive: true },
    { id: 'player_2', name: 'Knight', maxHealth: 80, currentHealth: 80, attack: 30, defense: 10, speed: 12, isAlive: true },
  ];

  const sampleEnemyUnits = [
    { id: 'enemy_1', name: 'Bandit', maxHealth: 60, currentHealth: 60, attack: 20, defense: 8, speed: 15, isAlive: true },
    { id: 'enemy_2', name: 'Mercenary', maxHealth: 70, currentHealth: 70, attack: 22, defense: 12, speed: 11, isAlive: true },
  ];

  const handleStartBattle = () => {
    dispatch(startBattle({
      playerUnits: samplePlayerUnits,
      enemyUnits: sampleEnemyUnits,
      battleType: 'skirmish'
    }));
  };

  const handleEndBattle = (result) => {
    dispatch(endBattle({
      result,
      rewards: {
        experience: 100,
        gold: 50,
        items: []
      }
    }));
  };

  const handleAction = (actionType) => {
    if (!selectedTarget) return;
    
    const damage = Math.floor(Math.random() * 20) + 10;
    dispatch(performAction({
      unitId: 'player_1',
      actionType,
      targetId: selectedTarget,
      damage,
      effects: []
    }));
    
    setSelectedAction(null);
    setSelectedTarget(null);
  };

  const getHealthPercentage = (unit) => {
    return (unit.currentHealth / unit.maxHealth) * 100;
  };

  const getHealthColor = (percentage) => {
    if (percentage > 60) return '#00AA00';
    if (percentage > 30) return '#FFA500';
    return '#AA0000';
  };

  const battleActions = [
    { id: 'attack', name: 'Attack', icon: <Sword className="action-icon" />, color: '#AA0000' },
    { id: 'defend', name: 'Defend', icon: <Shield className="action-icon" />, color: '#0066CC' },
    { id: 'special', name: 'Special', icon: <Zap className="action-icon" />, color: '#FFD700' },
  ];

  return (
    <div className="combat-screen">
      <div className="combat-header">
        <button className="btn btn-secondary" onClick={() => navigate('/game')}>
          <ArrowLeft className="btn-icon" />
          Back to Game
        </button>
        <h1>Combat Arena</h1>
        <div className="header-controls">
          <button 
            className={`btn ${autoBattle ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(toggleAutoBattle())}
          >
            {autoBattle ? <Pause className="btn-icon" /> : <Play className="btn-icon" />}
            {autoBattle ? 'Auto' : 'Manual'}
          </button>
        </div>
      </div>

      <div className="combat-content">
        {battleState === 'idle' ? (
          <div className="battle-setup">
            <div className="setup-card">
              <h2>Prepare for Battle</h2>
              <p>Test your strategic skills in combat scenarios</p>
              
              <div className="battle-info">
                <h3>Battle Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Battles Won:</span>
                    <span className="stat-value">{battleStatistics.battlesWon}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Battles Lost:</span>
                    <span className="stat-value">{battleStatistics.battlesLost}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Damage Dealt:</span>
                    <span className="stat-value">{battleStatistics.totalDamageDealt}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Units Lost:</span>
                    <span className="stat-value">{battleStatistics.unitsLost}</span>
                  </div>
                </div>
              </div>

              <div className="battle-options">
                <h3>Available Battles</h3>
                <div className="battle-types">
                  <div className="battle-type">
                    <h4>Skirmish</h4>
                    <p>Quick battle against bandits</p>
                    <div className="battle-rewards">
                      <span>Rewards: 50 Gold, 100 XP</span>
                    </div>
                    <button className="btn btn-primary" onClick={handleStartBattle}>
                      Start Battle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="battle-interface">
            <div className="battlefield">
              <div className="battle-area">
                <div className="player-side">
                  <h3>Your Forces</h3>
                  <div className="units-container">
                    {playerUnits.map((unit) => (
                      <div key={unit.id} className="unit-card player-unit">
                        <div className="unit-header">
                          <span className="unit-name">{unit.name}</span>
                          <span className="unit-health">{unit.currentHealth}/{unit.maxHealth}</span>
                        </div>
                        <div className="health-bar">
                          <div 
                            className="health-fill"
                            style={{ 
                              width: `${getHealthPercentage(unit)}%`,
                              backgroundColor: getHealthColor(getHealthPercentage(unit))
                            }}
                          ></div>
                        </div>
                        <div className="unit-stats">
                          <span>ATK: {unit.attack}</span>
                          <span>DEF: {unit.defense}</span>
                          <span>SPD: {unit.speed}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="vs-divider">
                  <span>VS</span>
                </div>

                <div className="enemy-side">
                  <h3>Enemy Forces</h3>
                  <div className="units-container">
                    {enemyUnits.map((unit) => (
                      <div 
                        key={unit.id} 
                        className={`unit-card enemy-unit ${selectedTarget === unit.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTarget(unit.id)}
                      >
                        <div className="unit-header">
                          <span className="unit-name">{unit.name}</span>
                          <span className="unit-health">{unit.currentHealth}/{unit.maxHealth}</span>
                        </div>
                        <div className="health-bar">
                          <div 
                            className="health-fill"
                            style={{ 
                              width: `${getHealthPercentage(unit)}%`,
                              backgroundColor: getHealthColor(getHealthPercentage(unit))
                            }}
                          ></div>
                        </div>
                        <div className="unit-stats">
                          <span>ATK: {unit.attack}</span>
                          <span>DEF: {unit.defense}</span>
                          <span>SPD: {unit.speed}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="battle-controls">
              <div className="action-buttons">
                {battleActions.map((action) => (
                  <button
                    key={action.id}
                    className={`action-btn ${selectedAction === action.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAction(action.id)}
                    style={{ borderColor: action.color }}
                  >
                    {action.icon}
                    <span>{action.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="target-info">
                {selectedTarget && (
                  <p>Target selected: {enemyUnits.find(u => u.id === selectedTarget)?.name}</p>
                )}
              </div>

              <div className="battle-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAction(selectedAction)}
                  disabled={!selectedAction || !selectedTarget}
                >
                  Execute Action
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleEndBattle('defeat')}
                >
                  Retreat
                </button>
              </div>
            </div>

            <div className="battle-log">
              <h4>Battle Log</h4>
              <div className="log-content">
                {battleLog.length === 0 ? (
                  <p>Battle begins...</p>
                ) : (
                  battleLog.map((entry, index) => (
                    <div key={index} className="log-entry">
                      <span className="log-time">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                      <span className="log-text">
                        {entry.actionType} for {entry.damage} damage
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombatScreen;