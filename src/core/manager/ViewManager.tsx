import { ReactNode } from "react";
import { ILogger } from "../interface/ILoggerManager";

export class ViewManager {
  constructor(logger: ILogger, ctx: any) { }
  public render(): ReactNode {
    return <div>hello world</div>;
  }
}
