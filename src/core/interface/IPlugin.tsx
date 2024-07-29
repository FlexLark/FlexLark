import { ReactNode } from "react";
import Core from "..";
import { ICoreContext } from "./ICoreContext";

export interface IPlugin {
  /**
   * @default 5
   */
  id: string;
  priority?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  name: string;
  author: string;
  description: string;
  version: string;
  install: (core: ICoreContext) => ICoreContext;
  destroy?: (core: ICoreContext) => ICoreContext;
  render?: (views: ReactNode) => ReactNode;
  update?: (core: ICoreContext) => void;
  error?: (error: unknown) => void;
}