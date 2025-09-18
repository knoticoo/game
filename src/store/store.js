import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import narrativeReducer from './slices/narrativeSlice';
import characterReducer from './slices/characterSlice';
import resourceReducer from './slices/resourceSlice';
import combatReducer from './slices/combatSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    narrative: narrativeReducer,
    character: characterReducer,
    resource: resourceReducer,
    combat: combatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});