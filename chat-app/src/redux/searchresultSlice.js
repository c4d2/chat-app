// appSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keyword: 'id',
    content: []
};

const serchresultSlice = createSlice({
    name: 'searchresult',
    initialState,
    reducers: {
        // 管理 searchresult 变量的 reducer 和 action creator
        updateresult(state, action) {
            const updated = action.payload;
            state.keyword = updated.id;
            state.content = updated.content;
        }
    },
});

export const {
    updateresult
} = serchresultSlice.actions;

export default serchresultSlice.reducer;