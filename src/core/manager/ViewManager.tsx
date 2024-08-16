import { ReactNode, useEffect, useState } from "react";
import { ILoggerManager } from "../interface/ILoggerManager";
import { LoggerManager } from "./LoggerManager";
import { ICoreContext } from "../interface/ICoreContext";
import { ISong } from "../interface/ISong";
import { IViewManager } from "../interface/IViewManager";
import Core from "../Core";
import { EventType } from "../types/enum";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Aside from "../../components/Aside/components";
import { IndexPage } from "../../pages/Index/pages";
import Player from "../../components/Player/component";
import { ListPage } from "../../pages/List/pages";
import TrainPage from "../../pages/Train/pages";

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
    const [playIndex, setPlayIndex] = useState<number>(core.playlistManager.getPlayIndex());
    const [status, setStatus] = useState<string>(core.state);

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
      <Router>
        <div className="flex flex-col w-screen h-screen overflow-hidden">
          <div className="w-full flex flex-1" style={{
            height: "calc(100vh - 5rem)"
          }}>
            <Aside />
            <main className="flex-auto h-full bg-base-100 overflow-y-auto">
              <Routes>
                < Route path="/" element={<IndexPage />} />
                < Route path="/list" element={<ListPage />} />
                < Route path="/train" element={<TrainPage />} />
                {/* < Route path="/table" element={<Table />} /> */}
              </Routes>
              
            </main>
          </div>
          <div className="w-full h-20 mx-auto flex-none bg-base-100 z-50 shadow-inner">
            <Player playlist={ playlist } index={ playIndex } status={status}/>
          </div>
        </div>
      </Router>
    </>);
  }
}
