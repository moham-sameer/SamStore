import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import itemsReducer from './ItemsSlice'
import CartReducer from './CartSlice'
import AuthReducer from './AuthSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // Only persist auth
};

const rootReducer = combineReducers({
    items: itemsReducer,
    cart: CartReducer,
    auth: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          },
        }),
})

const persistor = persistStore(store);

export { store, persistor };