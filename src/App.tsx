import "./App.css";
import "../i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import Player from "./components/Player/component";

function App() {
  // const { t } = useTranslation();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <aside className=""></aside>
      <main className=""></main>
      <div className="w-full mx-auto absolute bottom-0">
        <Player />
      </div>
    </div>
  );
}

export default App;
