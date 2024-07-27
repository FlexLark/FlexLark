import "./App.css";
import "../i18n";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Player from "./components/Player/component";
import Aside from "./components/Aside/components";
import { useState } from "react";
import { PlayStatus } from "./components/Player/types";
import { ListPage } from "./pages/List/pages";
import { useSelector } from "react-redux";
import { IndexPage } from "./pages/Index/pages";
import TrainPage from "./pages/Train/pages";

function App() {
  const [playStatus, setPlayStatus] = useState(PlayStatus.Pause);
  const { status, playlist, index } = useSelector((store) => store.playStatus);

  return (
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
          <Player playlist={ playlist } index={ index } status={status}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
