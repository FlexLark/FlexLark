import { ICoreContext } from "./ICoreContext";
import { IPlugin } from "./IPlugin";

export interface IPluginManager {
  register: (plugin: IPlugin) =>void;
  destroy: (ctx: ICoreContext) => void;
  update: (ctx: ICoreContext) => void;
}