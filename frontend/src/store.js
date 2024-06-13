// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-transform-expire';
import rootReducer from './reducers'; // Import the combined root reducer

// Configure expiration transform
const expireTransform = expireReducer('user', {
    persistedAtKey: '__persisted_at',
    expireSeconds: 7 * 24 * 60 * 60, // 7 days in seconds
});

const persistConfig = {
    key: 'root',
    storage,
    transforms: [expireTransform],
    whitelist: ['user'], // Only persist the user reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and middleware to handle non-serializable values
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
