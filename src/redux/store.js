import { configureStore } from '@reduxjs/toolkit'
import selectedArtistSlice from './features/selectedArtistSlice'

export default configureStore({
  reducer: {
    artist: selectedArtistSlice
  }
})