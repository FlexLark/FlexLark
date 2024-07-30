import { ISong } from "./ISong";

export interface IPlaylist {
  songs: ISong[];
  playIndex: number;
  isShuffled: boolean;
}
