import "./App.css";
import "../i18n";
// import React from "react";
// import { useTranslation } from "react-i18next";
import Player, { AudioType } from "./components/Player/component";
import Aside from "./components/Aside/components";
// import Table from "./components/Table/component";
import Playlist from "./components/Playlist/components";
import { useState } from "react";

function App() {
  // const { t } = useTranslation();
  const [playlist, setPlaylist] = useState<AudioType[]>([
    {
      name: 'test 1',
      duration: 20000,
      path: "http://127.0.0.1:8080/%E5%85%89%E9%98%B4%E7%9A%84%E6%95%85%E4%BA%8B-%E7%BD%97%E5%A4%A7%E4%BD%91.mp3"
    },
    {
      name: 'test 2',
      duration: 20000,
      path: "http://127.0.0.1:8080/F000000ky4wc42VVij.flac"
    },
    {
      name: 'test 3',
      duration: 20000,
      path: "http://127.0.0.1:8080/F000000UA33L3tgRFz.flac"
    },
    {
      name: 'test 4',
      duration: 20000,
      path: "http://127.0.0.1:8080/F0000020wJDo3cx0j3.flac"
    },
    {
      name: 'test 5',
      duration: 20000,
      path: "http://127.0.0.1:8080/F000004UlK9x0jeuow.flac"
    },
    {
      name: 'test 6',
      duration: 20000,
      path: "http://127.0.0.1:8080/M500001hQx2H29zdN9.mp3"
    },
    {
      name: 'test 7',
      duration: 20000,
      path: "http://127.0.0.1:8080/M800004cZvLj1qDq4A.mp3"
    },
  ]);
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="w-full flex flex-1" style={{
        height: "calc(100vh - 5rem)"
      }}>
        <Aside />
        <main className="flex-auto h-full bg-base-100 overflow-y-auto">
          {/* <Table /> */}
          <Playlist />
        </main>
      </div>
      <div className="w-full h-20 mx-auto flex-none bg-base-100 z-50 shadow-inner">
        <Player playlist={ playlist } />
      </div>
    </div>
  );
}

export default App;
