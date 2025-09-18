import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { processDailyReset } from './store/slices/resourceSlice';
import MainMenu from './components/game/MainMenu';
import GameScreen from './components/game/GameScreen';
import CharacterScreen from './components/game/CharacterScreen';
import ResourceScreen from './components/game/ResourceScreen';
import CombatScreen from './components/game/CombatScreen';
import SettingsScreen from './components/game/SettingsScreen';
import NarrativeScreen from './components/narrative/NarrativeScreen';
import LoadingScreen from './components/ui/LoadingScreen';
import './styles/App.css';

function App() {
  const dispatch = useDispatch();
  const { currentScreen, gameState } = useSelector((state) => state.game);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize game on mount
  useEffect(() => {
    // Process daily reset for resources
    dispatch(processDailyReset());
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Service Worker registration for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/characters" element={<CharacterScreen />} />
        <Route path="/resources" element={<ResourceScreen />} />
        <Route path="/combat" element={<CombatScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/narrative" element={<NarrativeScreen />} />
      </Routes>
    </div>
  );
}

export default App;