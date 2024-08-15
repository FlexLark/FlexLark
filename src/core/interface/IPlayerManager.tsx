import { ISong } from "../interface/ISong";
import { CoreState } from "../types/enum";
import { ModeType } from "../types/ModeType";
import { IPlayerOptions } from "./IPlayerOptions";
import { IPlaylistManager } from "./IPlaylistManager";

export interface IPlayerManager {
  play: (song?: ISong) => void;
  pause: () => void;
  stop: () => void;
  load: (song?: ISong) => void;
  destroy: () => void;
  seek: (time: number) => void;
  getSeek: () => number;
  setMode: (mode: ModeType) => void;
  getMode: () => ModeType;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  setOptions: (howlOptions: IPlayerOptions) => void;
  getOptions: () => IPlayerOptions;
  getState: () => CoreState;
}
