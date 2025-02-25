import { Howl, HowlOptions } from "howler";
import { ISongMetadata } from "../interface/ISongMetadata";
import { IPlayerManager } from "../interface/IPlayerManager";
import { CoreState } from "../types/enum";
import { IPlayerOptions } from "../interface/IPlayerOptions";
import { ISong } from "../interface/ISong";
import { IPlaylistManager } from "../interface/IPlaylistManager";
import { ILoggerManager } from "../interface/ILoggerManager";
import { ICoreContext } from "../interface/ICoreContext";
import { PlaylistManager } from "./PlaylistManager";
import { ModeType } from "../types/ModeType";


export class PlayerManager implements IPlayerManager {
  state: CoreState;
  playlistManager: IPlaylistManager;
  howler?: Howl;
  howlOptions: IPlayerOptions;
  mode: ModeType;
  song?: ISong;
  volume: number;

  constructor(logger: ILoggerManager, ctx: ICoreContext) {
    this.volume = 60;
    this.playlistManager = new PlaylistManager(logger, ctx);
    this.howlOptions = {
      src: ['']
    };
    this.howler = new Howl(this.howlOptions);
    this.setVolume(this.volume);
    this.mode = ModeType.LOOP;
    this.state = CoreState.STOP;
  }
  play(song?: ISong) {
    if (!song && !this.song) return;
    if (song) {
      this.song = song;
      this.load(song);
    }

    this.state = CoreState.PLAYING;
    this.howler?.play();
  };
  pause() {
    this.state = CoreState.PAUSED;
    this.howler?.pause();
  };
  stop() {
    this.state = CoreState.STOP;
    this.howler?.stop();
  };
  load(song?: ISong) {
    if (!song && !this.song) return;
    if (!song) {
      song = this.song;
    }
    this.howler?.stop();
    this.howler?.unload();
    this.howlOptions.src = [song.url];
    this.howler = new Howl(this.howlOptions);
    this.setVolume(this.volume);
  };
  destroy() {
    this.state = CoreState.STOP;
    this.howler?.stop();
    this.howler?.unload();
    this.howler = undefined;
  };
  seek(number: number) {
    this.howler?.seek(number);
  };
  getSeek() {
    console.log(this.howler?.seek());
    return this.howler?.seek() ?? 0;
  };
  public setMode(mode: ModeType) {
    if (!Object.values(ModeType).includes(mode)) return; 
    if (mode !== this.mode) {
      this.mode = mode;
    }
  }
  public getMode() {
    return this.mode;
  }
  public setVolume(volume: number) {
    if (volume > 100) volume = 100;
    if (volume < 0) volume = 0
    this.volume = volume;
    this.howler?.volume(volume / 100);
  };
  public getVolume() {
    return this.volume;
  };
  public setOptions(howlOptions: IPlayerOptions) {
    this.howlOptions = {
      ...howlOptions,
      ...this.howlOptions
    };
  };
  public getOptions() {
    return this.howlOptions;
  };
  getState() {
    return this.state;
  };

}
