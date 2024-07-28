import { ReactNode } from "react";
import Core from "..";

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
  install: (core: Core) => Core;
  destroy?: (core: Core) => Core;
  render?: (views: ReactNode) => ReactNode; // UI 渲染库肯定有问题 暂时先这样把
  update?: (core: Core) => void;
  error?: (error: unknown) => void;
}