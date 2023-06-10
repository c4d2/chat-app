// appSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    products: [],
    orders: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // 管理 users 变量的 reducer 和 action creator
        updateUsers(state, action) {
            const updatedUsers = action.payload;
            state.users = updatedUsers;
        },
        addUser(state, action) {
            const newUser = action.payload;
            state.users.push(newUser);
        },
        deleteUser(state, action) {  
            const userId = action.payload;
            state.users = state.users.filter((user) => user.id !== userId);
        },

        // 管理 products 变量的 reducer 和 action creator
        updateProducts(state, action) {
            const updatedProducts = action.payload;
            state.products = updatedProducts;
        },
        addProduct(state, action) {
            const newProduct = action.payload;
            state.products.push(newProduct);
        },
        deleteProduct(state, action) {
            const productId = action.payload;
            state.products = state.products.filter((product) => product.id !== productId);
        },

        // 管理 orders 变量的 reducer 和 action creator
        updateOrders(state, action) {
            const updatedOrders = action.payload;
            state.orders = updatedOrders;
        },
        addOrder(state, action) {
            const newOrder = action.payload;
            state.orders.push(newOrder);
        },
        deleteOrder(state, action) {
            const orderId = action.payload;
            state.orders = state.orders.filter((order) => order.id !== orderId);
        },
    },
});

export const {
    updateUsers,
    addUser,
    deleteUser,
    updateProducts,
    addProduct,
    deleteProduct,
    updateOrders,
    addOrder,
    deleteOrder,
} = appSlice.actions;

export default appSlice.reducer;