/*
redux最核心的管理对象: store
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import resultSlice from './searchresultSlice';

const store = configureStore({
    reducer: {
        users: userReducer,
        result: resultSlice
    },
});

export default store;