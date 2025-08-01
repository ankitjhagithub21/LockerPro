import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'



export interface authState {
  user: User | null
}

const initialState: authState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})


export const { setUser } = authSlice.actions

export default authSlice.reducer