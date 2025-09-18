import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gold: 1000,
  soldiers: 100,
  influence: 50,
  prestige: 25,
  gems: 0, // Premium currency
  dailyIncome: {
    gold: 100,
    soldiers: 5,
    influence: 2,
    prestige: 1,
  },
  dailyConsumption: {
    gold: 50,
    soldiers: 2,
  },
  buildings: {
    castle: { level: 1, maxLevel: 10, cost: 500 },
    barracks: { level: 1, maxLevel: 8, cost: 300 },
    treasury: { level: 1, maxLevel: 5, cost: 200 },
    court: { level: 1, maxLevel: 6, cost: 400 },
  },
  lastDailyReset: Date.now(),
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    addResource: (state, action) => {
      const { type, amount } = action.payload;
      if (state[type] !== undefined) {
        state[type] = Math.max(0, state[type] + amount);
      }
    },
    spendResource: (state, action) => {
      const { type, amount } = action.payload;
      if (state[type] !== undefined) {
        state[type] = Math.max(0, state[type] - amount);
      }
    },
    setResource: (state, action) => {
      const { type, amount } = action.payload;
      if (state[type] !== undefined) {
        state[type] = Math.max(0, amount);
      }
    },
    upgradeBuilding: (state, action) => {
      const { buildingType, cost } = action.payload;
      const building = state.buildings[buildingType];
      if (building && building.level < building.maxLevel && state.gold >= cost) {
        state.gold -= cost;
        building.level += 1;
        building.cost = Math.floor(building.cost * 1.5);
        
        // Update daily income based on building levels
        state.dailyIncome.gold += buildingType === 'treasury' ? 20 : 0;
        state.dailyIncome.soldiers += buildingType === 'barracks' ? 3 : 0;
        state.dailyIncome.influence += buildingType === 'court' ? 1 : 0;
      }
    },
    processDailyReset: (state) => {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      
      if (now - state.lastDailyReset >= oneDay) {
        // Add daily income
        state.gold += state.dailyIncome.gold;
        state.soldiers += state.dailyIncome.soldiers;
        state.influence += state.dailyIncome.influence;
        state.prestige += state.dailyIncome.prestige;
        
        // Subtract daily consumption
        state.gold = Math.max(0, state.gold - state.dailyConsumption.gold);
        state.soldiers = Math.max(0, state.soldiers - state.dailyConsumption.soldiers);
        
        state.lastDailyReset = now;
      }
    },
    updateDailyIncome: (state, action) => {
      state.dailyIncome = { ...state.dailyIncome, ...action.payload };
    },
    updateDailyConsumption: (state, action) => {
      state.dailyConsumption = { ...state.dailyConsumption, ...action.payload };
    },
    resetResources: (state) => {
      return initialState;
    },
  },
});

export const {
  addResource,
  spendResource,
  setResource,
  upgradeBuilding,
  processDailyReset,
  updateDailyIncome,
  updateDailyConsumption,
  resetResources,
} = resourceSlice.actions;

export default resourceSlice.reducer;