import { Audio } from '../../types/Audio';
import { PlayStatus } from '../../components/Player/types';
import { createSlice } from '@reduxjs/toolkit';

export interface playlistState {
  playlist: Array<Audio>,
  status: PlayStatus,
  index: number
};
const initialState: playlistState = {
  playlist: [],
  status: PlayStatus.Stop,
  index: 0
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
    setIndex: (state, action: { payload: number }) => {
      state.index = action.payload;
    },
    setStatus: (state, action: { payload: PlayStatus }) => { 
      state.status = action.payload;
    },
    next: (state) => {
      state.index++; 
    },
    back: (state) => {
      state.index--;
    },
    play: (state) => { 
      state.status = PlayStatus.Play;
    },
    pause: (state) => { 
      state.status = PlayStatus.Pause;
    },
    stop: (state) => {
      state.status = PlayStatus.Stop;
      state.index = 0;
      state.playlist = [];
    }
  },
});


export const { push, replace,setIndex, setStatus, next, back, play, pause, stop } = playlistSlice.actions;


export default playlistSlice.reducer;

