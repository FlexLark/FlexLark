import "./App.css";
import "../i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import Player from "./components/Player/component";
import Aside from "./components/Aside/components";
import Table from "./components/Table/component";
import Playlist from "./components/Playlist/components";

function App() {
  // const { t } = useTranslation();

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
        <Player />
      </div>
    </div>
  );
}

export default App;
