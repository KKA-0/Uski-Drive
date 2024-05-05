import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./../features/userSlice"
import folderSlice from "./../features/folderSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        folders: folderSlice
    },
})