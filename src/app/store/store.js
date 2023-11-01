import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import notificationReducer from '../features/NotificationSlice';

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        notification: notificationReducer,
    }
});

export default store