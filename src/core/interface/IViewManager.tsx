import { ReactNode } from "react";
import Core from "../Core";

export interface IViewManager {
  render: (core: Core) => ReactNode;
}