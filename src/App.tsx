import "./App.css";
import "../i18n";
// import React from "react";
// import { useTranslation } from "react-i18next";
import Player from "./components/Player/component";
import { Audio } from "./types/Audio";
import Aside from "./components/Aside/components";
// import Table from "./components/Table/component";
import Playlist from "./components/Playlist/components";
import { useState } from "react";
import { PlayStatus } from "./components/Player/types";

function App() {
  // const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [playStatus, setPlayStatus] = useState(PlayStatus.Pause);
  const [playlist, setPlaylist] = useState<Audio[]>([
    {
      name: '光阴的故事',
      author: ['罗大佑'],
      path: "http://127.0.0.1:8080/%E5%85%89%E9%98%B4%E7%9A%84%E6%95%85%E4%BA%8B-%E7%BD%97%E5%A4%A7%E4%BD%91.mp3"
    },
    {
      name: '安和桥',
      author: ['宋冬野'],
      path: "http://127.0.0.1:8080/F000000ky4wc42VVij.flac"
    },
    {
      name: '偏爱',
      author: ['张芸京'],
      path: "http://127.0.0.1:8080/F000000UA33L3tgRFz.flac"
    },
    {
      name: '稻香',
      author: ['周杰伦'],
      path: "http://127.0.0.1:8080/F0000020wJDo3cx0j3.flac"
    },
    {
      name: '张芸京',
      author: ['周杰伦'],
      path: "http://127.0.0.1:8080/F000004UlK9x0jeuow.flac"
    },
    {
      name: '可不可以',
      author: ['张紫豪'],
      path: "http://127.0.0.1:8080/M500001hQx2H29zdN9.mp3"
    },
    {
      name: '一路向北',
      author: ['周杰伦'],
      path: "http://127.0.0.1:8080/M800004cZvLj1qDq4A.mp3"
    },
  ]);
  const onChangeIndex = (index: number) => {
    setPlaylist(playlist);
    setIndex(index);
    setPlayStatus(PlayStatus.Play);
  }
  const onChangeList = (playlist: Audio[]) => {
    setPlaylist(playlist);
    setPlayStatus(PlayStatus.Play);
  }
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="w-full flex flex-1" style={{
        height: "calc(100vh - 5rem)"
      }}>
        <Aside />
        <main className="flex-auto h-full bg-base-100 overflow-y-auto">
          {/* <Table /> */}
          <Playlist playlist={playlist} onClick={onChangeIndex} onPlay={ onChangeList } />
        </main>
      </div>
      <div className="w-full h-20 mx-auto flex-none bg-base-100 z-50 shadow-inner">
        <Player playlist={ playlist } index={ index } status={playStatus}/>
      </div>
    </div>
  );
}

export default App;
