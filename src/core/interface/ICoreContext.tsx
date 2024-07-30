import { CoreState } from "../types/enum";
import { IEventManager } from "./IEventManager";
import { ILoggerManager } from "./ILoggerManager";
import { IUtils } from "./IUtils";

export interface ICoreContext {
  state: CoreState;
  logger: ILoggerManager;
  on: IEventManager['on'];
  off: IEventManager['off'];
  utils: IUtils;
}