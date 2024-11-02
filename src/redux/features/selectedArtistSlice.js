import { createSlice } from '@reduxjs/toolkit'

const initState = {
    id: "",
    name: "",
    img: "",
    followers: 0,
    popularity: 0
}

export const selectedArtistSlice = createSlice({
  name: 'selectedArtist',
  initialState: initState,
  reducers: {
    setSelectedArtist: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It uses the Immer library
      state = {
        id: action.payload?.id,
        name: action.payload?.name,
        img: action.payload?.img,
        followers: action.payload?.followers,
        popularity: action.payload?.popularity
      }
    },
  }
})

export const { setSelectedArtist} = selectedArtistSlice.actions

export default selectedArtistSlice.reducer