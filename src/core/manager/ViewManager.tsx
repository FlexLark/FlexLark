import { ReactNode } from "react";
import { ILoggerManager } from "../interface/ILoggerManager";

export class ViewManager {
  constructor(logger: ILoggerManager, ctx: any) { }
  public render(): ReactNode {
    return <div>hello world</div>;
  }
}
