import { configureStore } from '@reduxjs/toolkit'
import playStatusSlice from './festures/playStatusSlice'


const store = configureStore({
  reducer: {
    playStatus: playStatusSlice
  }
})

export default store