import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import rootReducer from './redux/rootReducer'; // Your root reducer
import { combineReducers } from 'redux';
import itemsReducer from './ItemsSlice'
import CartReducer from './CartSlice'
import AuthReducer from './AuthSlice'
const persistConfig = {
    key: 'root', // Key for the persisted state
    storage, // Storage type, default is localStorage
  };
  const rootReducer = combineReducers({
    auth: AuthReducer, // Example for auth slice
    // Add other slices here
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer:{
        items:itemsReducer,
        cart:CartReducer,
        auth:persistedReducer,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware({
        //       serializableCheck: {
        //         // Ignore these action types
        //         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        //       },
        //     }),
    }
})
const persistor = persistStore(store); // Create a persistor

export { store, persistor };
