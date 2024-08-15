import { CoreState } from "../types/enum";
import { IEventManager } from "./IEventManager";
import { ILoggerManager } from "./ILoggerManager";
import { IPlayerManager } from "./IPlayerManager";
import { IPlaylistManager } from "./IPlaylistManager";
import { IUtils } from "./IUtils";
import { IViewManager } from "./IViewManager";

export interface ICoreContext {
  state: CoreState;
  logger: ILoggerManager;
  emit: IEventManager['emit'];
  on: IEventManager['on'];
  off: IEventManager['off'];
  utils: IUtils;
  playerManager: IPlayerManager;
  playlistManager: IPlaylistManager;
  viewManager: IViewManager;
}