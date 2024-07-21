// counterSlice.ts 文件

import { createSlice } from '@reduxjs/toolkit';
import { Audio } from '../../types/Audio';

export interface playlistState {
  playlist: Array<Audio>
}
const initialState: playlistState = {
  playlist: []
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    push: (state, action: {payload: Audio}) => {
      state.playlist.push(action.payload);
    },
    replace: (state, action: { payload: Array<Audio> }) => {
      state.playlist = action.payload;
    },
  },
});


export const { push, replace } = playlistSlice.actions;


export default playlistSlice.reducer;

