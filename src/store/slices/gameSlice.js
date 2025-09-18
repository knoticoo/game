import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentScreen: 'main-menu',
  gameState: 'menu', // 'menu', 'playing', 'paused', 'game-over'
  playerName: '',
  currentChapter: 1,
  currentScene: 0,
  gameStarted: false,
  settings: {
    musicVolume: 0.7,
    soundVolume: 0.8,
    autoAdvance: false,
    textSpeed: 'normal',
  },
  achievements: [],
  statistics: {
    playTime: 0,
    choicesMade: 0,
    charactersMet: 0,
    battlesWon: 0,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setGameState: (state, action) => {
      state.gameState = action.payload;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
    startNewGame: (state, action) => {
      state.gameState = 'playing';
      state.gameStarted = true;
      state.currentChapter = 1;
      state.currentScene = 0;
      state.playerName = action.payload.playerName || 'Your Majesty';
    },
    advanceChapter: (state) => {
      state.currentChapter += 1;
      state.currentScene = 0;
    },
    advanceScene: (state) => {
      state.currentScene += 1;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    addAchievement: (state, action) => {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload);
      }
    },
    updateStatistics: (state, action) => {
      state.statistics = { ...state.statistics, ...action.payload };
    },
    resetGame: (state) => {
      return { ...initialState, settings: state.settings };
    },
  },
});

export const {
  setCurrentScreen,
  setGameState,
  setPlayerName,
  startNewGame,
  advanceChapter,
  advanceScene,
  updateSettings,
  addAchievement,
  updateStatistics,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;