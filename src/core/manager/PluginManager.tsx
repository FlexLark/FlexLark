import { DEFAULT_PRIORITY } from "..";
import { ILoggerManager } from "../interface/ILoggerManager";
import { LoggerManager } from "./LoggerManager";
import { IPlugin } from "../interface/IPlugin";
import { ICoreContext } from "../interface/ICoreContext";
import { IPluginManager } from "../interface/IPluginManager";


export class PluginManager implements IPluginManager {
  plugins: IPlugin[] = [];
  pluginMap: Map<string, IPlugin> = new Map();
  LoggerManager: ILoggerManager = new LoggerManager();
  ctx: any;

  constructor(logger: ILoggerManager, ctx: ICoreContext) {
    this.LoggerManager = logger;
    this.ctx = ctx;
  }
  public register(plugin: IPlugin): void {
    const { ctx, plugins, pluginMap, LoggerManager } = this;

    this.ctx = plugin.install(ctx);

    plugins.push(plugin);
    
    this.plugins = plugins.sort((a, b) => {
      const aPriority = a.priority ?? DEFAULT_PRIORITY;
      const bPriority = b.priority ?? DEFAULT_PRIORITY;
    
      return aPriority - bPriority;
    });
    
    pluginMap.set(plugin.name, plugin);
    LoggerManager.info(`register plugin ${plugin.name}`);
  }

  public destroy(): void {
    const { ctx, plugins, LoggerManager } = this;

    plugins.forEach(plugin => {
      if (typeof plugin?.destroy === 'function') {
        try {
          this.ctx = plugin?.destroy(ctx);
          LoggerManager.info(`destroy plugin ${plugin.name}`);
        } catch (error) {
          LoggerManager.error(`update plugin ${plugin.name} error`, error);
          if (plugin && typeof plugin.error === 'function') {
            plugin?.error(error);
          }
        }
      }
    });

    LoggerManager.info(`destroy core`);
    this.plugins = [];
    this.pluginMap.clear();
  }

  public update(): void {
    const { ctx, plugins, LoggerManager } = this;

    plugins.forEach(plugin => {
      try {
        if (typeof plugin?.update === 'function') {
          plugin?.update(ctx);
        }
      } catch (error) {
        LoggerManager.error(`update plugin ${plugin.name} error`, error);
        if (plugin && typeof plugin.error === 'function') {
          plugin?.error(error);
        }
      }
    });
  }
}
