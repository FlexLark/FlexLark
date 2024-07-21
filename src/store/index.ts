import { configureStore } from '@reduxjs/toolkit'
import playlistSlice from './festures/playlistSlice'

const store = configureStore({
  reducer: {
    playlist: playlistSlice
  }
})

export default store