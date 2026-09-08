import { createSlice } from '@reduxjs/toolkit';

interface FocusState {
  isFocusMode: boolean;
  currentStepIndex: number;
}

const initialState: FocusState = {
  isFocusMode: false,
  currentStepIndex: 0,
};

const focusSlice = createSlice({
  name: 'focus',
  initialState,

  reducers: {
    enterFocusMode(state) {
      state.isFocusMode = true;
    },

    exitFocusMode(state) {
      state.isFocusMode = false;
      state.currentStepIndex = 0;
    },

    setCurrentStepIndex(
      state,
      action: {
        payload: number;
        type: string;
      },
    ) {
      state.currentStepIndex = action.payload;
    },

    nextStep(state) {
      state.currentStepIndex += 1;
    },

    resetFocus(state) {
      state.isFocusMode = false;
      state.currentStepIndex = 0;
    },
  },
});

export const {
  enterFocusMode,
  exitFocusMode,
  setCurrentStepIndex,
  nextStep,
  resetFocus,
} = focusSlice.actions;

export default focusSlice.reducer;