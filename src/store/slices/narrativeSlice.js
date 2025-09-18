import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStory: null,
  currentChoices: [],
  storyProgress: 0,
  unlockedStories: ['tutorial'],
  completedStories: [],
  storyFlags: {},
  dialogueHistory: [],
  currentSpeaker: null,
  textDisplaySpeed: 'normal',
  autoAdvance: false,
  storyData: {
    chapters: {
      1: {
        title: "The Crown's Burden",
        scenes: [
          {
            id: 'intro',
            title: 'A New Reign Begins',
            text: 'You sit upon the throne, the weight of the crown heavy upon your brow. The courtiers whisper among themselves, waiting for your first decree as the new monarch.',
            choices: [
              { id: 'diplomatic', text: 'Call for a council of advisors', consequence: 'diplomatic_path' },
              { id: 'military', text: 'Inspect the royal guard', consequence: 'military_path' },
              { id: 'economic', text: 'Review the treasury reports', consequence: 'economic_path' },
            ],
            background: 'throne_room',
            music: 'royal_theme',
          },
        ],
      },
    },
  },
};

const narrativeSlice = createSlice({
  name: 'narrative',
  initialState,
  reducers: {
    startStory: (state, action) => {
      const { storyId, chapterId, sceneId } = action.payload;
      state.currentStory = { storyId, chapterId, sceneId };
      state.storyProgress = 0;
    },
    setCurrentChoices: (state, action) => {
      state.currentChoices = action.payload;
    },
    makeChoice: (state, action) => {
      const { choiceId, consequence } = action.payload;
      
      // Add to dialogue history
      state.dialogueHistory.push({
        choiceId,
        consequence,
        timestamp: Date.now(),
      });
      
      // Update story flags based on consequence
      if (consequence) {
        state.storyFlags[consequence] = true;
      }
      
      // Clear current choices
      state.currentChoices = [];
    },
    advanceStory: (state, action) => {
      const { nextSceneId, choices } = action.payload;
      state.currentStory.sceneId = nextSceneId;
      state.storyProgress += 1;
      state.currentChoices = choices || [];
    },
    setCurrentSpeaker: (state, action) => {
      state.currentSpeaker = action.payload;
    },
    addToDialogueHistory: (state, action) => {
      state.dialogueHistory.push({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    unlockStory: (state, action) => {
      const storyId = action.payload;
      if (!state.unlockedStories.includes(storyId)) {
        state.unlockedStories.push(storyId);
      }
    },
    completeStory: (state, action) => {
      const storyId = action.payload;
      if (!state.completedStories.includes(storyId)) {
        state.completedStories.push(storyId);
      }
    },
    setStoryFlag: (state, action) => {
      const { flag, value } = action.payload;
      state.storyFlags[flag] = value;
    },
    updateTextDisplaySpeed: (state, action) => {
      state.textDisplaySpeed = action.payload;
    },
    toggleAutoAdvance: (state) => {
      state.autoAdvance = !state.autoAdvance;
    },
    resetNarrative: (state) => {
      return initialState;
    },
  },
});

export const {
  startStory,
  setCurrentChoices,
  makeChoice,
  advanceStory,
  setCurrentSpeaker,
  addToDialogueHistory,
  unlockStory,
  completeStory,
  setStoryFlag,
  updateTextDisplaySpeed,
  toggleAutoAdvance,
  resetNarrative,
} = narrativeSlice.actions;

export default narrativeSlice.reducer;