import { HowlOptions } from "howler";
import { ISongMetadata } from "../interface/ISongMetadata";
import { IPlayerManager } from "../interface/IPlayerManager";
import { CoreState } from "../types/enum";


export class PlayerManager implements IPlayerManager {
  playlist: ISongMetadata[];
  current: ISongMetadata;
  currentIndex: number;
  howler: Howl;
  state: CoreState;
  howlOptions: HowlOptions;
  constructor(state: CoreState) {
    this.state = state;
    this.playlist = [];
    this.current = {} as ISongMetadata;
    this.currentIndex = 0;
    this.howlOptions = {
      html5: true,
      src: [],
    };
    this.howler = new Howl(this.howlOptions);
  }
  play(song?: ISongMetadata) {
    if (song) {
      this.current = song;
      this?.load(this.current);
      this.howler?.unload();
      this.howler?.stop();
      this.howler?.load();
    }
    this.state = CoreState.PLAYING;
    this.update();
    this.howler?.play();
  };
  pause() {
    this.state = CoreState.PAUSED;
    this.update();
    this.howler?.pause();
  };
  stop() {
    this.state = CoreState.STOP;
    this.update();
    this.howler?.stop();
  };
  load(song?: ISongMetadata) {
    if (song) {
      this.current = song;
      this.howler?.load();
    }
    this.state = CoreState.LOADING;
    this.update();
    this.howler?.load();
  };
  update() {
  };
  destroy() {
    this.howler?.unload();
    this.howler?.stop();
  };
  next() { };
  previous() { };
  seek(time: number) { };
  onStateChange() { };
  shuffle() { };
  repeat(mode: 'none' | 'one' | 'all') { };
  setVolume(volume: number) { };
  setOptions(howlOptions: HowlOptions) { };
}
