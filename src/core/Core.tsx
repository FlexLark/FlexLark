import { IPlugin } from "./interface/IPlugin";
import { PluginManager } from "./manager/PluginManager";
import { ViewManager } from "./manager/ViewManager";
import { HowlOptions } from "howler";
import { ICoreOptions } from "./interface/ICoreOptions";
import { CoreState } from "./types/enum";
import { ILoggerManager } from "./interface/ILoggerManager";
import { Howl } from "howler";
import { EventManager } from "./manager/EventManager";                       
import { ICoreContext } from "./interface/ICoreContext";
import { PlayerManager } from "./manager/PlayerManager";
import { PlaylistManager } from "./manager/PlaylistManager";
import { IPlayerManager } from "./interface/IPlayerManager";
import { IViewManager } from "./interface/IViewManager";
import { IPlaylistManager } from "./interface/IPlaylistManager";
export default class Core {
  howler?: Howl;
  options?: ICoreOptions;
  howlOptions?: HowlOptions;
  state: CoreState;
  loggerManager: ILoggerManager;
  pluginManager: PluginManager;
  viewManager: ViewManager;
  eventManager: EventManager;
  playlistManager: PlaylistManager;
  playerManager: PlayerManager;
  ctx: ICoreContext;

  constructor() {
    this.howler = new Howl({
      src: [''],
    })
    this.loggerManager = console;
    this.state = CoreState.STOP;

    this.eventManager = new EventManager(this.loggerManager);

    this.ctx = {
      state: this.state,
      logger: this.loggerManager,
      utils: {},
      on: this.eventManager.on,
      off: this.eventManager.off,
      playerManager: {} as IPlayerManager,
      playlistManager:  {} as IPlaylistManager,
      viewManager:  {} as IViewManager,
    }

    this.viewManager = new ViewManager(this.loggerManager, this.ctx);

    this.pluginManager = new PluginManager(this.loggerManager, this.ctx);
    this.playlistManager = new PlaylistManager(this.loggerManager, this.ctx);
    this.playerManager = new PlayerManager(this.loggerManager, this.ctx);

    this.ctx.playerManager = this.playerManager;
    this.ctx.playlistManager = this.playlistManager;
    this.ctx.viewManager = this.viewManager;
  }

  public register(plugin: IPlugin): void {
    try {
      this.pluginManager.register(plugin);
    } catch (error) {
      this.loggerManager.error(`Error during plugin registration: ${error}`);
    }
  }
  
  public destroy():void {
    try {
      this.state = CoreState.STOP;
  
      this.pluginManager.destroy();
  
      this.howler?.stop();
      this.howler?.unload();
      this.howler = undefined;
  
      this.loggerManager.info(`destroy core, state set to STOP`);
    } catch (error) {
      this.loggerManager.error(`Error during core destruction: ${error}`);
    }
  }

  public run(): void {

  }

  public stop(): void {
    this.playerManager.stop();
  }

  public pause(): void {
    this.playerManager.pause();
  }

  public play(): void {
    this.playerManager.play();
  }

  public next(): void {
    this.playlistManager.next();
  }

  public previous(): void {
    this.playlistManager.previous();
  }

  public update(): void {
    if( this?.pluginManager?.update ) {
      this.pluginManager.update();
    }
  }

  public load(): void {
    // TODO
    this.state = CoreState.LOADING;
    this.update();
    this.loggerManager.info(`load core`);
    this.howler?.load();
  }
  public render(): React.ReactNode {
    this.loggerManager.info(`render core`);
    return this.viewManager.render(this);
  }
}