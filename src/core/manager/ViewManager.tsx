import { ReactNode } from "react";
import { ILoggerManager } from "../interface/ILoggerManager";
import { LoggerManager } from "./LoggerManager";
import { ICoreContext } from "../interface/ICoreContext";
import { ISong } from "../interface/ISong";
import { IViewManager } from "../interface/IViewManager";
import Core from "../Core";

export class ViewManager implements IViewManager {
  logger: LoggerManager;
  ctx: ICoreContext;
  constructor(logger: ILoggerManager, ctx: any) {
    this.logger = logger as LoggerManager;
    this.ctx = ctx;
    this.logger.log("ViewManager init");
    this.logger.log("ctx", this.ctx.playerManager);
  }
  public render(core: Core): ReactNode {
    
    const song: ISong = {
      title: "song01",
      id: '1',
      url: "http://127.0.0.1:8080/song04.wav",
    } as ISong;
    
    return (<>
      <button onClick={() => core.playlistManager.addSong(song)}>添加歌曲</button>
      <button onClick={() => core.playlistManager.getPlaylist()}>获取播放列表</button>
      <button onClick={() => core.play()}>播放</button>
      <button onClick={() => core.pause()} >暂停</button>
      <button onClick={() => core.stop()}>停止</button>
      <button onClick={() => core.next()}>下一首</button>
      <button onClick={() => core.previous()}>上一首</button>
    </>);
  }
}
