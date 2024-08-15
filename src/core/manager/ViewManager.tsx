import { ReactNode, useEffect, useState } from "react";
import { ILoggerManager } from "../interface/ILoggerManager";
import { LoggerManager } from "./LoggerManager";
import { ICoreContext } from "../interface/ICoreContext";
import { ISong } from "../interface/ISong";
import { IViewManager } from "../interface/IViewManager";
import Core from "../Core";
import { EventType } from "../types/enum";

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
    const [playlist, setPlaylist] = useState<ISong[]>(core.playlistManager.getPlaylist());
      console.log(typeof core.eventManager.on);

    // // 当 playlistManager 发生变化时，更新播放列表
    useEffect(() => {
      // 初始化 playlist
      setPlaylist(core.playlistManager.getPlaylist());
    
      // 如果 playlistManager 有事件监听 API，可以在此处添加事件监听器
      const handlePlaylistChange = () => {
        setPlaylist(core.playlistManager.getPlaylist());
      };
      console.log(typeof core.eventManager.on);
      core.eventManager.on(EventType.CHANGE_PLAYLIST, handlePlaylistChange);
    
      // 清理事件监听器
      return () => {
        core.eventManager.off(EventType.CHANGE_PLAYLIST, handlePlaylistChange);
      };
    }, [core]);
    
    const song: ISong = {
      title: "song01",
      id: '1',
      url: "http://127.0.0.1:8080/song04.wav",
    } as ISong;
    
    return (<>
      <div>
        <h1>FlexLark</h1>
        <div>
          <button onClick={() => core.playlistManager.addSong(song)}>添加歌曲</button>
          <button onClick={() => core.playlistManager.getPlaylist()}>获取播放列表</button>
          <button onClick={() => core.play()}>播放</button>
          <button onClick={() => core.pause()} >暂停</button>
          <button onClick={() => core.stop()}>停止</button>
          <button onClick={() => core.next()}>下一首</button>
          <button onClick={() => core.previous()}>上一首</button>
        </div>
        <div>
          {
            playlist.map((item, index) => (<>
              <li key={index}>{ item.title }</li>
            </>))
          }
        </div>
      </div>
    </>);
  }
}
