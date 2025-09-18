import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upgradeBuilding, addResource } from '../../store/slices/resourceSlice';
import { ArrowLeft, Building, TrendingUp, Coins, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ResourceScreen.css';

const ResourceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gold, soldiers, influence, prestige, buildings, dailyIncome, dailyConsumption } = useSelector((state) => state.resource);

  const handleUpgradeBuilding = (buildingType) => {
    const building = buildings[buildingType];
    if (building && building.level < building.maxLevel && gold >= building.cost) {
      dispatch(upgradeBuilding({ buildingType, cost: building.cost }));
    }
  };

  const handleAddResource = (type, amount) => {
    dispatch(addResource({ type, amount }));
  };

  const buildingData = [
    {
      id: 'castle',
      name: 'Royal Castle',
      icon: <Building className="building-icon" />,
      description: 'The heart of your kingdom. Increases prestige and unlocks new features.',
      benefits: ['+20 Prestige', '+10 Gold/day', 'Unlocks new areas'],
      color: '#FFD700',
    },
    {
      id: 'barracks',
      name: 'Military Barracks',
      icon: <Shield className="building-icon" />,
      description: 'Train and house your soldiers. Essential for defense and expansion.',
      benefits: ['+3 Soldiers/day', '+5 Gold/day', 'Better unit training'],
      color: '#C0C0C0',
    },
    {
      id: 'treasury',
      name: 'Royal Treasury',
      icon: <Coins className="building-icon" />,
      description: 'Manage your kingdom\'s finances and increase gold production.',
      benefits: ['+20 Gold/day', '+5% Gold efficiency', 'Better trade deals'],
      color: '#FFD700',
    },
    {
      id: 'court',
      name: 'Royal Court',
      icon: <Star className="building-icon" />,
      description: 'Where nobles gather. Increases influence and diplomatic power.',
      benefits: ['+1 Influence/day', '+10 Prestige', 'Better diplomacy'],
      color: '#9370DB',
    },
  ];

  const resourceActions = [
    {
      type: 'gold',
      name: 'Gold',
      icon: <Coins className="action-icon" />,
      color: '#FFD700',
      actions: [
        { name: 'Collect Taxes', amount: 100, cost: 0 },
        { name: 'Trade Deal', amount: 250, cost: 50 },
        { name: 'Mining Expedition', amount: 500, cost: 100 },
      ],
    },
    {
      type: 'soldiers',
      name: 'Soldiers',
      icon: <Shield className="action-icon" />,
      color: '#C0C0C0',
      actions: [
        { name: 'Recruit Locals', amount: 10, cost: 50 },
        { name: 'Mercenary Contract', amount: 25, cost: 200 },
        { name: 'Elite Training', amount: 50, cost: 500 },
      ],
    },
    {
      type: 'influence',
      name: 'Influence',
      icon: <Star className="action-icon" />,
      color: '#FF69B4',
      actions: [
        { name: 'Public Speech', amount: 5, cost: 0 },
        { name: 'Diplomatic Mission', amount: 15, cost: 100 },
        { name: 'Grand Feast', amount: 30, cost: 300 },
      ],
    },
  ];

  return (
    <div className="resource-screen">
      <div className="resource-header">
        <button className="btn btn-secondary" onClick={() => navigate('/game')}>
          <ArrowLeft className="btn-icon" />
          Back to Game
        </button>
        <h1>Kingdom Management</h1>
        <div className="header-stats">
          <span className="stat-item">
            <TrendingUp className="stat-icon" />
            Daily Net: +{dailyIncome.gold - dailyConsumption.gold} Gold
          </span>
        </div>
      </div>

      <div className="resource-content">
        <div className="buildings-section">
          <h2>Buildings & Infrastructure</h2>
          <div className="buildings-grid">
            {buildingData.map((building) => {
              const buildingInfo = buildings[building.id];
              const canUpgrade = buildingInfo.level < buildingInfo.maxLevel && gold >= buildingInfo.cost;
              
              return (
                <div key={building.id} className="building-card">
                  <div className="building-header">
                    <div className="building-icon-container" style={{ color: building.color }}>
                      {building.icon}
                    </div>
                    <div className="building-info">
                      <h3>{building.name}</h3>
                      <p className="building-level">Level {buildingInfo.level}/{buildingInfo.maxLevel}</p>
                    </div>
                  </div>
                  
                  <p className="building-description">{building.description}</p>
                  
                  <div className="building-benefits">
                    {building.benefits.map((benefit, index) => (
                      <span key={index} className="benefit-item">{benefit}</span>
                    ))}
                  </div>
                  
                  <div className="building-upgrade">
                    <div className="upgrade-cost">
                      <span>Upgrade Cost: {buildingInfo.cost} Gold</span>
                    </div>
                    <button
                      className={`btn ${canUpgrade ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleUpgradeBuilding(building.id)}
                      disabled={!canUpgrade}
                    >
                      {buildingInfo.level >= buildingInfo.maxLevel ? 'Max Level' : 'Upgrade'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="actions-section">
          <h2>Resource Actions</h2>
          <div className="actions-grid">
            {resourceActions.map((resource) => (
              <div key={resource.type} className="action-group">
                <div className="action-header">
                  <div className="action-icon-container" style={{ color: resource.color }}>
                    {resource.icon}
                  </div>
                  <h3>{resource.name}</h3>
                  <span className="current-amount">
                    {resource.type === 'gold' ? gold : 
                     resource.type === 'soldiers' ? soldiers :
                     resource.type === 'influence' ? influence : 0}
                  </span>
                </div>
                
                <div className="action-list">
                  {resource.actions.map((action, index) => (
                    <div key={index} className="action-item">
                      <div className="action-info">
                        <span className="action-name">{action.name}</span>
                        <span className="action-amount">+{action.amount}</span>
                      </div>
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => handleAddResource(resource.type, action.amount)}
                        disabled={action.cost > gold}
                      >
                        {action.cost > 0 ? `${action.cost} Gold` : 'Free'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="economy-section">
          <h2>Kingdom Economy</h2>
          <div className="economy-stats">
            <div className="economy-item">
              <h4>Daily Income</h4>
              <div className="economy-details">
                <span>Gold: +{dailyIncome.gold}/day</span>
                <span>Soldiers: +{dailyIncome.soldiers}/day</span>
                <span>Influence: +{dailyIncome.influence}/day</span>
                <span>Prestige: +{dailyIncome.prestige}/day</span>
              </div>
            </div>
            
            <div className="economy-item">
              <h4>Daily Expenses</h4>
              <div className="economy-details">
                <span>Gold: -{dailyConsumption.gold}/day</span>
                <span>Soldiers: -{dailyConsumption.soldiers}/day</span>
              </div>
            </div>
            
            <div className="economy-item">
              <h4>Net Daily Change</h4>
              <div className="economy-details">
                <span className={dailyIncome.gold - dailyConsumption.gold >= 0 ? 'positive' : 'negative'}>
                  Gold: {dailyIncome.gold - dailyConsumption.gold >= 0 ? '+' : ''}
                  {dailyIncome.gold - dailyConsumption.gold}/day
                </span>
                <span className="positive">
                  Soldiers: +{dailyIncome.soldiers - dailyConsumption.soldiers}/day
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceScreen;