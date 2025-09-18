import React from 'react';
import { useSelector } from 'react-redux';
import { Coins, Shield, Star, Gem, TrendingUp } from 'lucide-react';
import './ResourcePanel.css';

const ResourcePanel = () => {
  const { gold, soldiers, influence, prestige, gems } = useSelector((state) => state.resource);
  const { dailyIncome, dailyConsumption } = useSelector((state) => state.resource);

  const resources = [
    {
      id: 'gold',
      name: 'Gold',
      value: gold,
      icon: <Coins className="resource-icon" />,
      color: '#FFD700',
      income: dailyIncome.gold,
      consumption: dailyConsumption.gold,
    },
    {
      id: 'soldiers',
      name: 'Soldiers',
      value: soldiers,
      icon: <Shield className="resource-icon" />,
      color: '#C0C0C0',
      income: dailyIncome.soldiers,
      consumption: dailyConsumption.soldiers,
    },
    {
      id: 'influence',
      name: 'Influence',
      value: influence,
      icon: <Star className="resource-icon" />,
      color: '#FF69B4',
      income: dailyIncome.influence,
      consumption: 0,
    },
    {
      id: 'prestige',
      name: 'Prestige',
      value: prestige,
      icon: <TrendingUp className="resource-icon" />,
      color: '#9370DB',
      income: dailyIncome.prestige,
      consumption: 0,
    },
    {
      id: 'gems',
      name: 'Gems',
      value: gems,
      icon: <Gem className="resource-icon" />,
      color: '#00CED1',
      income: 0,
      consumption: 0,
    },
  ];

  return (
    <div className="resource-panel">
      <h3 className="panel-title">Kingdom Resources</h3>
      
      <div className="resources-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <div className="resource-header">
              <div className="resource-icon-container" style={{ color: resource.color }}>
                {resource.icon}
              </div>
              <div className="resource-info">
                <span className="resource-name">{resource.name}</span>
                <span className="resource-value">{resource.value.toLocaleString()}</span>
              </div>
            </div>
            
            {(resource.income > 0 || resource.consumption > 0) && (
              <div className="resource-daily">
                {resource.income > 0 && (
                  <span className="daily-income">
                    +{resource.income}/day
                  </span>
                )}
                {resource.consumption > 0 && (
                  <span className="daily-consumption">
                    -{resource.consumption}/day
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="resource-summary">
        <div className="summary-item">
          <span className="summary-label">Daily Net Gold:</span>
          <span className={`summary-value ${dailyIncome.gold - dailyConsumption.gold >= 0 ? 'positive' : 'negative'}`}>
            {dailyIncome.gold - dailyConsumption.gold >= 0 ? '+' : ''}
            {dailyIncome.gold - dailyConsumption.gold}/day
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Power:</span>
          <span className="summary-value">
            {Math.floor((soldiers + influence + prestige) / 3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResourcePanel;