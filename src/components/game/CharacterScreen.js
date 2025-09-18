import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCompanion, updateRelationship, giveGift } from '../../store/slices/characterSlice';
import { ArrowLeft, Heart, Gift, Star, Users, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CharacterScreen.css';

const CharacterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companions, relationships, romanceLevels, gifts } = useSelector((state) => state.character);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Sample companions data (in a real game, this would come from the store or API)
  const availableCompanions = [
    {
      id: 'lady_elena',
      name: 'Lady Elena',
      title: 'Court Diplomat',
      description: 'A skilled diplomat with silver tongue and sharp wit.',
      image: '👩‍💼',
      stats: { diplomacy: 85, intelligence: 90, loyalty: 70 },
      rarity: 'epic',
      recruitmentCost: { gold: 500, influence: 20 },
    },
    {
      id: 'sir_gareth',
      name: 'Sir Gareth',
      title: 'Royal Guard Captain',
      description: 'A veteran warrior with unwavering loyalty to the crown.',
      image: '🛡️',
      stats: { combat: 95, loyalty: 100, leadership: 80 },
      rarity: 'legendary',
      recruitmentCost: { gold: 800, soldiers: 50 },
    },
    {
      id: 'merchant_aldric',
      name: 'Merchant Aldric',
      title: 'Master Trader',
      description: 'A wealthy merchant with connections across the realm.',
      image: '💰',
      stats: { commerce: 90, intelligence: 75, charisma: 85 },
      rarity: 'rare',
      recruitmentCost: { gold: 300, gems: 5 },
    },
  ];

  const handleRecruitCompanion = (companion) => {
    dispatch(addCompanion(companion));
  };

  const handleGiveGift = (companionId, giftType) => {
    const affectionGain = Math.floor(Math.random() * 10) + 5;
    dispatch(giveGift({ companionId, giftType, affectionGain }));
    setShowGiftModal(false);
  };

  const getRelationshipStatus = (relationship) => {
    if (relationship >= 80) return { text: 'Devoted', color: '#FF69B4' };
    if (relationship >= 60) return { text: 'Friendly', color: '#00AA00' };
    if (relationship >= 40) return { text: 'Neutral', color: '#FFA500' };
    if (relationship >= 20) return { text: 'Cold', color: '#C0C0C0' };
    return { text: 'Hostile', color: '#AA0000' };
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#C0C0C0';
      case 'rare': return '#00AA00';
      case 'epic': return '#9370DB';
      case 'legendary': return '#FFD700';
      default: return '#C0C0C0';
    }
  };

  return (
    <div className="character-screen">
      <div className="character-header">
        <button className="btn btn-secondary" onClick={() => navigate('/game')}>
          <ArrowLeft className="btn-icon" />
          Back to Game
        </button>
        <h1>Court & Companions</h1>
        <div className="header-stats">
          <span className="stat-item">
            <Users className="stat-icon" />
            {companions.length} Companions
          </span>
        </div>
      </div>

      <div className="character-content">
        <div className="companions-section">
          <h2>Your Companions</h2>
          {companions.length === 0 ? (
            <div className="empty-state">
              <Crown className="empty-icon" />
              <p>No companions yet. Recruit some to strengthen your court!</p>
            </div>
          ) : (
            <div className="companions-grid">
              {companions.map((companion) => {
                const relationship = relationships[companion.id] || 0;
                const romance = romanceLevels[companion.id] || 0;
                const relationshipStatus = getRelationshipStatus(relationship);
                
                return (
                  <div key={companion.id} className="companion-card">
                    <div className="companion-header">
                      <div className="companion-avatar">
                        <span className="avatar-emoji">👤</span>
                      </div>
                      <div className="companion-info">
                        <h3>{companion.name}</h3>
                        <p className="companion-title">Level {companion.level}</p>
                        <div className="relationship-bar">
                          <div className="relationship-fill" style={{ width: `${Math.abs(relationship)}%` }}></div>
                          <span className="relationship-text" style={{ color: relationshipStatus.color }}>
                            {relationshipStatus.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="companion-stats">
                      <div className="stat">
                        <Heart className="stat-icon" />
                        <span>Affection: {companion.affection}</span>
                      </div>
                      <div className="stat">
                        <Star className="stat-icon" />
                        <span>Romance: {romance}%</span>
                      </div>
                    </div>
                    
                    <div className="companion-actions">
                      <button 
                        className="btn btn-primary btn-small"
                        onClick={() => setSelectedCompanion(companion)}
                      >
                        Interact
                      </button>
                      <button 
                        className="btn btn-secondary btn-small"
                        onClick={() => setShowGiftModal(companion.id)}
                      >
                        <Gift className="btn-icon" />
                        Gift
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="recruitment-section">
          <h2>Available Recruits</h2>
          <div className="recruits-grid">
            {availableCompanions.map((companion) => (
              <div key={companion.id} className="recruit-card">
                <div className="recruit-header">
                  <div className="recruit-avatar">
                    <span className="avatar-emoji">{companion.image}</span>
                  </div>
                  <div className="recruit-info">
                    <h3>{companion.name}</h3>
                    <p className="recruit-title">{companion.title}</p>
                    <div 
                      className="rarity-badge"
                      style={{ backgroundColor: getRarityColor(companion.rarity) }}
                    >
                      {companion.rarity.toUpperCase()}
                    </div>
                  </div>
                </div>
                
                <p className="recruit-description">{companion.description}</p>
                
                <div className="recruit-stats">
                  {Object.entries(companion.stats).map(([stat, value]) => (
                    <div key={stat} className="stat-bar">
                      <span className="stat-name">{stat}</span>
                      <div className="stat-progress">
                        <div 
                          className="stat-fill" 
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="stat-value">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="recruit-cost">
                  <span>Recruitment Cost:</span>
                  <div className="cost-items">
                    {Object.entries(companion.recruitmentCost).map(([resource, amount]) => (
                      <span key={resource} className="cost-item">
                        {amount} {resource}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary"
                  onClick={() => handleRecruitCompanion(companion)}
                >
                  Recruit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showGiftModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Give a Gift</h3>
            <div className="gifts-grid">
              {Object.entries(gifts).map(([giftType, amount]) => (
                <button
                  key={giftType}
                  className={`gift-item ${amount === 0 ? 'disabled' : ''}`}
                  onClick={() => handleGiveGift(showGiftModal, giftType)}
                  disabled={amount === 0}
                >
                  <Gift className="gift-icon" />
                  <span>{giftType}</span>
                  <span className="gift-amount">x{amount}</span>
                </button>
              ))}
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowGiftModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterScreen;