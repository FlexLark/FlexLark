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
export default class Core {
  howler?: Howl;
  options?: ICoreOptions;
  howlOptions?: HowlOptions;
  state: CoreState;
  loggerManager: ILoggerManager;
  pluginManager: PluginManager;
  viewManager: ViewManager;
  eventManager: EventManager;
  ctx: ICoreContext; 

  constructor() {
    this.howler = new Howl({
      src: [''],
    })
    this.loggerManager = console;
    this.viewManager = new ViewManager(this.loggerManager, this);
    this.eventManager = new EventManager(this.loggerManager);
    this.state = CoreState.STOP;
    this.ctx = {
      state: this.state,
      on: this.eventManager.on.bind(this.eventManager),
      off: this.eventManager.off.bind(this.eventManager),
    } as ICoreContext;

    this.pluginManager = new PluginManager(this.loggerManager, this.ctx);
  }

  public register(plugin: IPlugin): void {
    this.pluginManager.register(plugin);
  }
  
  public destroy():void {
    this.state = CoreState.STOP;
    this.pluginManager.destroy();
    this.loggerManager.info(`destroy core`);
    this.howler?.stop();
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
}