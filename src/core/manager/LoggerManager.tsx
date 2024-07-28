import { ILogger } from "../interface/ILoggerManager";

export class LoggerManager implements ILogger {
  private logger: ILogger;
  constructor() {
    this.logger = console;
  }
  public setLogger(logger: ILogger): void {
    this.logger = logger;
  }

  public info(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  public error(message: string, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  public debug(message: string, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  public log(message: string, ...args: any[]): void {
    this.logger.log(message, ...args);
  }
}
