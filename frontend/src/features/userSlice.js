import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      userData: (state, action) => {
        const { user_id } = action.payload
        state.user_id = user_id
      },
    },
  })
  
  export const { userData } = userSlice.actions
  export default userSlice.reducer