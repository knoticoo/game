import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companions: [],
  currentCompanion: null,
  relationships: {},
  romanceLevels: {},
  gifts: {
    flowers: 5,
    jewelry: 2,
    books: 3,
    weapons: 1,
  },
  companionStats: {
    totalRecruited: 0,
    maxLevel: 1,
    totalAffection: 0,
  },
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    addCompanion: (state, action) => {
      const companion = action.payload;
      const existingIndex = state.companions.findIndex(c => c.id === companion.id);
      
      if (existingIndex === -1) {
        state.companions.push({
          ...companion,
          level: 1,
          experience: 0,
          affection: 0,
          recruited: true,
          recruitedAt: Date.now(),
        });
        state.relationships[companion.id] = 0;
        state.romanceLevels[companion.id] = 0;
        state.companionStats.totalRecruited += 1;
      }
    },
    removeCompanion: (state, action) => {
      const companionId = action.payload;
      state.companions = state.companions.filter(c => c.id !== companionId);
      delete state.relationships[companionId];
      delete state.romanceLevels[companionId];
    },
    updateCompanionLevel: (state, action) => {
      const { companionId, experience, level } = action.payload;
      const companion = state.companions.find(c => c.id === companionId);
      if (companion) {
        companion.experience = experience;
        companion.level = level;
        state.companionStats.maxLevel = Math.max(state.companionStats.maxLevel, level);
      }
    },
    updateRelationship: (state, action) => {
      const { companionId, change } = action.payload;
      if (state.relationships[companionId] !== undefined) {
        state.relationships[companionId] = Math.max(-100, 
          Math.min(100, state.relationships[companionId] + change));
      }
    },
    updateRomanceLevel: (state, action) => {
      const { companionId, change } = action.payload;
      if (state.romanceLevels[companionId] !== undefined) {
        state.romanceLevels[companionId] = Math.max(0, 
          Math.min(100, state.romanceLevels[companionId] + change));
      }
    },
    giveGift: (state, action) => {
      const { companionId, giftType, affectionGain } = action.payload;
      if (state.gifts[giftType] > 0) {
        state.gifts[giftType] -= 1;
        const companion = state.companions.find(c => c.id === companionId);
        if (companion) {
          companion.affection += affectionGain;
          state.romanceLevels[companionId] = Math.max(0, 
            Math.min(100, state.romanceLevels[companionId] + affectionGain));
        }
      }
    },
    addGift: (state, action) => {
      const { giftType, amount } = action.payload;
      if (state.gifts[giftType] !== undefined) {
        state.gifts[giftType] += amount;
      }
    },
    setCurrentCompanion: (state, action) => {
      state.currentCompanion = action.payload;
    },
    updateCompanionStats: (state, action) => {
      state.companionStats = { ...state.companionStats, ...action.payload };
    },
    resetCharacters: (state) => {
      return initialState;
    },
  },
});

export const {
  addCompanion,
  removeCompanion,
  updateCompanionLevel,
  updateRelationship,
  updateRomanceLevel,
  giveGift,
  addGift,
  setCurrentCompanion,
  updateCompanionStats,
  resetCharacters,
} = characterSlice.actions;

export default characterSlice.reducer;