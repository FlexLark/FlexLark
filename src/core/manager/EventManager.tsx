import { IEventManager } from "../interface/IEventManager";
import { ILoggerManager } from "../interface/ILoggerManager";
import { EventType } from "../types/enum";

export class EventManager implements IEventManager {
  private listeners: Map<EventType, Array<Function>> = new Map();
  logger: ILoggerManager;
  
  constructor(logger: ILoggerManager) {
    this.logger = logger;
  }

  public emit(event: EventType, ...args: any[]): void {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.forEach(
        (listener) => {
          try {
            listener(...args)
          } catch (error) {
            this.logger.error(`Error in event listener for event ${event}: ${error}`);
          }
        }
      );
    }
  }

  public on(event: EventType, listener: Function): void {
    this.listeners.set(event, [...(this.listeners.get(event) || []), listener]);
  }
  public off(event: EventType, listener: Function): void {
    this.listeners.set(event, (this.listeners.get(event) || []).filter((l) => l !== listener));
  }
}