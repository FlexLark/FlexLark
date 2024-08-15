import { ICoreContext } from "../interface/ICoreContext";
import { ILoggerManager } from "../interface/ILoggerManager";
import { IPlaylist } from "../interface/IPlaylist";
import { IPlaylistManager } from "../interface/IPlaylistManager";
import { ISong } from "../interface/ISong";

export class PlaylistManager implements IPlaylistManager {
  private _songMap: Map<string, ISong>;
  private _playlistByMapKey: string[];
  private _playIndex: number;
  private _isShuffled: boolean;
  private _playinglistByMapKey: string[];
  private _logger: ILoggerManager;
  private _ctx: ICoreContext;

  constructor(logger: ILoggerManager, ctx: ICoreContext) {
    this._ctx = ctx;
    this._songMap = new Map<string, ISong>();
    this._playlistByMapKey = [];
    this._playIndex = 0;
    this._isShuffled = false;
    this._playinglistByMapKey = [];
    this._logger = logger;
  }
  getPlaylist() {
    const playlist = this._playlistByMapKey.map((key) => this._songMap.get(key));
    
    this._logger.log('Get Playlist - Context:', this._ctx);
    this._logger.log('Get Playlist - This:', this);
    this._logger.log('Playlist:', playlist);
    return playlist.filter((song) => song !== undefined);
  }
  setPlaylist(playlist: ISong[]): void {
    this._playlistByMapKey = playlist.map((song) => song.id);
    this._songMap = new Map<string, ISong>(playlist.map((song) => [song.id, song]));
    this._playIndex = 0;
    this._isShuffled = false;
    this._playinglistByMapKey = this._playlistByMapKey.slice();
  }
  getPlayIndex(): number {
    console.log(this);
    return this._playIndex;
  }
  setPlayIndex(index: number): void {
    if (index >= 0 && index < this._playlistByMapKey.length) {
      this._playIndex = index;
    } else if (index < 0) {
      this._playIndex = 0;
    } else if (index >= this._playlistByMapKey.length) {
      this._playIndex = this._playlistByMapKey.length - 1;
    }
  }
  next(): void {
    this._playIndex = this._playIndex + 1;
    if (this._playIndex >= this._playlistByMapKey.length) {
      this._playIndex = 0;
    }
  }
  previous(): void {
    this._playIndex = this._playIndex - 1;
    if (this._playIndex < 0) {
      this._playIndex = this._playlistByMapKey.length - 1;
    }
  }
  getSong(songId: string) {
    return this._songMap.get(songId);
  }
  addSong(song: ISong): void {
    this._songMap.set(song.id, song);
    this._playlistByMapKey.push(song.id);
    this._playinglistByMapKey.push(song.id);
    this._logger.log('Add Song - Context:', this._ctx);
    this._logger.log('Add Song - This:', this);
    this._logger.log('Song Map:', Array.from(this._songMap.entries()));
    this._logger.log('Playlist By Map Key:', this._playlistByMapKey);
  }
  removeSong(songId: string): void {
    this._songMap.delete(songId);
    this._playlistByMapKey = this._playlistByMapKey.filter((id) => id !== songId);
    this._playinglistByMapKey = this._playinglistByMapKey.filter((id) => id !== songId);
  }
  clear(): void {
    this._songMap.clear();
    this._playlistByMapKey = [];
    this._playIndex = 0;
    this._isShuffled = false;
    this._playinglistByMapKey = [];
  }
  shuffle(): void {
    if (!this._isShuffled) {
      this._isShuffled = true;
      if (this._ctx.utils?.shuffle && this._ctx.utils.shuffle instanceof Function) {
        this._playinglistByMapKey = this._ctx.utils.shuffle(this._playlistByMapKey);
      } else {
        this._playinglistByMapKey = this._playlistByMapKey.slice();
      }
    }
  }
  unshuffle(): void {
    if (this._isShuffled) {
      this._isShuffled = false;
      this._playinglistByMapKey = this._playlistByMapKey.slice();
    }
  }
  isShuffled(): boolean {
    return this._isShuffled;
  }
}