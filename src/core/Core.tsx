import { IPlugin } from "./interface/IPluginManager";
import { PluginManager } from "./manager/PluginManager";
import { ViewManager } from "./manager/ViewManager";
import { HowlOptions } from "howler";
import { ICoreOptions } from "./interface/ICoreOptions";
import { CoreState } from "./types/enum";
import { ILogger } from "./interface/ILogger";
import { Howl } from "howler";
export default class Core {
  howler?: Howl;
  options?: ICoreOptions = {};
  howlOptions?: HowlOptions;
  state: CoreState = CoreState.STOP;
  loggerManager: ILogger;
  pluginManager: PluginManager;
  viewManager: ViewManager;

  ctx: Core = this; // TODO 修改 ctx 传递值以及安全性处理

  constructor() {
    this.loggerManager = console;
    this.pluginManager = new PluginManager(this.loggerManager, this);
    this.viewManager = new ViewManager(this.loggerManager, this);
    this.howler = new Howl({
      src: [''],
    })
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