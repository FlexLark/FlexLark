import { EventType } from "../types/enum";
import { ILoggerManager } from "./ILoggerManager";

export interface IEventManager {
  logger: ILoggerManager;
  on(event: EventType, listener: (...args: any[]) => void): void;
  emit(event: EventType, ...args: any[]): void;
  off(event: EventType, listener: (...args: any[]) => void): void;
}
