import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../../store/slices/gameSlice';
import { ArrowLeft, Volume2, VolumeX, Settings as SettingsIcon, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.game);

  const handleSettingChange = (setting, value) => {
    dispatch(updateSettings({ [setting]: value }));
  };

  const settingCategories = [
    {
      id: 'audio',
      title: 'Audio Settings',
      icon: <Volume2 className="category-icon" />,
      settings: [
        {
          id: 'musicVolume',
          name: 'Music Volume',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.1,
          value: settings.musicVolume,
        },
        {
          id: 'soundVolume',
          name: 'Sound Effects Volume',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.1,
          value: settings.soundVolume,
        },
      ],
    },
    {
      id: 'gameplay',
      title: 'Gameplay Settings',
      icon: <SettingsIcon className="category-icon" />,
      settings: [
        {
          id: 'autoAdvance',
          name: 'Auto Advance Text',
          type: 'checkbox',
          value: settings.autoAdvance,
        },
        {
          id: 'textSpeed',
          name: 'Text Display Speed',
          type: 'select',
          options: [
            { value: 'slow', label: 'Slow' },
            { value: 'normal', label: 'Normal' },
            { value: 'fast', label: 'Fast' },
          ],
          value: settings.textSpeed,
        },
      ],
    },
  ];

  const handleSaveSettings = () => {
    // Settings are automatically saved to Redux store
    // In a real app, you might want to save to localStorage or send to server
    console.log('Settings saved:', settings);
  };

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button className="btn btn-secondary" onClick={() => navigate('/game')}>
          <ArrowLeft className="btn-icon" />
          Back to Game
        </button>
        <h1>Game Settings</h1>
        <button className="btn btn-primary" onClick={handleSaveSettings}>
          <Save className="btn-icon" />
          Save Settings
        </button>
      </div>

      <div className="settings-content">
        {settingCategories.map((category) => (
          <div key={category.id} className="settings-category">
            <div className="category-header">
              {category.icon}
              <h2>{category.title}</h2>
            </div>
            
            <div className="settings-list">
              {category.settings.map((setting) => (
                <div key={setting.id} className="setting-item">
                  <div className="setting-info">
                    <label htmlFor={setting.id} className="setting-label">
                      {setting.name}
                    </label>
                    {setting.type === 'range' && (
                      <span className="setting-value">
                        {Math.round(setting.value * 100)}%
                      </span>
                    )}
                  </div>
                  
                  <div className="setting-control">
                    {setting.type === 'range' && (
                      <input
                        id={setting.id}
                        type="range"
                        min={setting.min}
                        max={setting.max}
                        step={setting.step}
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.id, parseFloat(e.target.value))}
                        className="range-slider"
                      />
                    )}
                    
                    {setting.type === 'checkbox' && (
                      <label className="checkbox-container">
                        <input
                          id={setting.id}
                          type="checkbox"
                          checked={setting.value}
                          onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    )}
                    
                    {setting.type === 'select' && (
                      <select
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                        className="setting-select"
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="settings-category">
          <div className="category-header">
            <SettingsIcon className="category-icon" />
            <h2>Game Information</h2>
          </div>
          
          <div className="game-info">
            <div className="info-item">
              <span className="info-label">Game Version:</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">PWA Status:</span>
              <span className="info-value">Installed</span>
            </div>
            <div className="info-item">
              <span className="info-label">Platform:</span>
              <span className="info-value">Web Browser</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="settings-category">
          <div className="category-header">
            <SettingsIcon className="category-icon" />
            <h2>Controls</h2>
          </div>
          
          <div className="controls-info">
            <div className="control-item">
              <span className="control-key">Space / Enter</span>
              <span className="control-action">Advance dialogue</span>
            </div>
            <div className="control-item">
              <span className="control-key">Escape</span>
              <span className="control-action">Open menu</span>
            </div>
            <div className="control-item">
              <span className="control-key">Ctrl + S</span>
              <span className="control-action">Save game</span>
            </div>
            <div className="control-item">
              <span className="control-key">Ctrl + L</span>
              <span className="control-action">Load game</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;