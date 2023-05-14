import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import { appReducer } from "./app.slice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
const appConfig = {
    key: "app",
    storage,
}
const rootReducer = combineReducers({
    app: persistReducer(appConfig, appReducer),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
