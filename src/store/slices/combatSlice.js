import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBattle: null,
  battleState: 'idle', // 'idle', 'preparing', 'active', 'victory', 'defeat'
  playerUnits: [],
  enemyUnits: [],
  battleLog: [],
  turnOrder: [],
  currentTurn: 0,
  battleRewards: {
    experience: 0,
    gold: 0,
    items: [],
  },
  battleStatistics: {
    battlesWon: 0,
    battlesLost: 0,
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    unitsLost: 0,
  },
  autoBattle: false,
  battleSpeed: 'normal',
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    startBattle: (state, action) => {
      const { playerUnits, enemyUnits, battleType } = action.payload;
      state.currentBattle = {
        id: Date.now(),
        type: battleType,
        startTime: Date.now(),
      };
      state.playerUnits = playerUnits.map(unit => ({
        ...unit,
        currentHealth: unit.maxHealth,
        statusEffects: [],
        isAlive: true,
      }));
      state.enemyUnits = enemyUnits.map(unit => ({
        ...unit,
        currentHealth: unit.maxHealth,
        statusEffects: [],
        isAlive: true,
      }));
      state.battleState = 'preparing';
      state.battleLog = [];
      state.turnOrder = [...playerUnits, ...enemyUnits].sort((a, b) => b.speed - a.speed);
      state.currentTurn = 0;
    },
    endBattle: (state, action) => {
      const { result, rewards } = action.payload;
      state.battleState = result; // 'victory' or 'defeat'
      state.battleRewards = rewards || { experience: 0, gold: 0, items: [] };
      
      if (result === 'victory') {
        state.battleStatistics.battlesWon += 1;
      } else {
        state.battleStatistics.battlesLost += 1;
      }
      
      // Clear battle data after a delay
      setTimeout(() => {
        state.currentBattle = null;
        state.battleState = 'idle';
        state.playerUnits = [];
        state.enemyUnits = [];
        state.battleLog = [];
      }, 3000);
    },
    performAction: (state, action) => {
      const { unitId, actionType, targetId, damage, effects } = action.payload;
      const unit = [...state.playerUnits, ...state.enemyUnits].find(u => u.id === unitId);
      const target = [...state.playerUnits, ...state.enemyUnits].find(u => u.id === targetId);
      
      if (unit && target) {
        // Apply damage
        if (damage > 0) {
          target.currentHealth = Math.max(0, target.currentHealth - damage);
          if (target.currentHealth === 0) {
            target.isAlive = false;
          }
        }
        
        // Apply status effects
        if (effects) {
          target.statusEffects.push(...effects);
        }
        
        // Add to battle log
        state.battleLog.push({
          unitId,
          targetId,
          actionType,
          damage,
          effects,
          timestamp: Date.now(),
        });
        
        // Update statistics
        if (state.playerUnits.some(u => u.id === unitId)) {
          state.battleStatistics.totalDamageDealt += damage;
        } else {
          state.battleStatistics.totalDamageTaken += damage;
        }
      }
    },
    nextTurn: (state) => {
      state.currentTurn = (state.currentTurn + 1) % state.turnOrder.length;
    },
    addBattleLog: (state, action) => {
      state.battleLog.push({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    toggleAutoBattle: (state) => {
      state.autoBattle = !state.autoBattle;
    },
    setBattleSpeed: (state, action) => {
      state.battleSpeed = action.payload;
    },
    updateBattleStatistics: (state, action) => {
      state.battleStatistics = { ...state.battleStatistics, ...action.payload };
    },
    resetCombat: (state) => {
      return initialState;
    },
  },
});

export const {
  startBattle,
  endBattle,
  performAction,
  nextTurn,
  addBattleLog,
  toggleAutoBattle,
  setBattleSpeed,
  updateBattleStatistics,
  resetCombat,
} = combatSlice.actions;

export default combatSlice.reducer;