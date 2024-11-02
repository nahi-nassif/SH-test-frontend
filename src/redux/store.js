import { configureStore } from '@reduxjs/toolkit'
import selectedArtistSlice from '../features/selectedArtist'

export default configureStore({
  reducer: {
    artist: selectedArtistSlice
  }
})