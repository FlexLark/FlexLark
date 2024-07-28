import { HowlOptions } from "howler";
import { SongMetadata } from ".";
import { CoreState } from "./enum";


export interface IPlayerManager {
  playlist: SongMetadata[];
  current: SongMetadata;
  currentIndex: number;
  howler: Howl;
  state: CoreState;
  play: (song?: SongMetadata) => void;
  pause: () => void;
  stop: () => void;
  load: (song?: SongMetadata) => void;
  update: () => void;
  destroy: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  onStateChange: (newState: CoreState) => void;
  shuffle: () => void;
  repeat: (mode: 'none' | 'one' | 'all') => void;
  setVolume: (volume: number) => void;
  setOptions: (howlOptions: HowlOptions) => void;
}
