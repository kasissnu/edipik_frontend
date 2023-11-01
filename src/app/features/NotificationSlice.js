import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    message: '',
    severity: ''
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    clearNotification: (state) => {
      state.open = false;
      state.message = '';
      state.severity = '';
    },
  },
});

export const { setNotification, clearNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
