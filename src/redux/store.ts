import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import lists from './slices/listSlice'

export const store = configureStore({
  reducer: { auth, lists }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
