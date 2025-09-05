import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id?: number
  email: string
  password: string
  name: string
  surname: string
  cell: string
}

type AuthState = {
  user: (User & {username?: string}) | null
}
const initialState: AuthState = { user: null }

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setUser(state, action: PayloadAction<AuthState['user']>){
      state.user = action.payload
    },
    logout(state){
      state.user = null
    }
  }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
