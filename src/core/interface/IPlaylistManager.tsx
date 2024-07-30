import { ISong } from "./ISong";

export interface IPlaylistManager {
  getPlaylist(): ISong[] | undefined;
  setPlaylist(playlist: ISong[]): void;
  getPlayIndex(): number;
  setPlayIndex(index: number): void;
  next(): void;
  previous(): void;

  getSong(songId: string): ISong | undefined;
  addSong(song: ISong): void;
  removeSong(songId: string): void;
  clear(): void;
  shuffle(): void;
  unshuffle(): void;
  isShuffled(): boolean;
}
