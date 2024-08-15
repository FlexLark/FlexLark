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

  constructor() {
    this.howler = new Howl({
      src: [''],
    })
    this.loggerManager = console;
    this.state = CoreState.STOP;
    this.eventManager = new EventManager(this.loggerManager);
    this.viewManager = new ViewManager(this.loggerManager, this);

    this.pluginManager = new PluginManager(this.loggerManager, this as unknown as ICoreContext);
    this.playlistManager = new PlaylistManager(this.loggerManager, this as unknown as ICoreContext);
    this.playerManager = new PlayerManager(this.loggerManager, this as unknown as ICoreContext);
  }

  private getCtx(): ICoreContext {
    return {
      state: this.state,
      logger: this.loggerManager,
      utils: {},
      on: this.eventManager.on,
      off: this.eventManager.off,
      playerManager: this.playerManager,
      playlistManager: this.playlistManager,
    }
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
    const { howler, update, loggerManager } = this;

    this.state = CoreState.STOP;
    
    loggerManager.info(`stop core`);
    update();
    howler?.stop();
  }

  public pause(): void {
    const { howler, update, loggerManager } = this;

    this.state = CoreState.PAUSED;

    loggerManager.info(`pause core`);
    update();
    howler?.pause();
  }

  public play(): void {
    const { howler, update, loggerManager } = this;

    this.state = CoreState.PLAYING;

    update();
    loggerManager.info(`play core`);
    howler?.play();
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
    return this.viewManager.render();
  }
}