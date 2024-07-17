import "../../../i18n";
import { GoStart, PlayOne, GoEnd, Pause, PlayOnce, PlayCycle, ShuffleOne } from "@icon-park/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoopMode, PlayStatus } from "./types";
import { formatSecond } from "./tools";

export default function Player () {
  const { t } = useTranslation();
  const [playStatus, setPlayStatus] = useState(PlayStatus.Pause);
  const [loopMode, setLoopMode] = useState(LoopMode.ListLoop);
  const [progress, setProgress] = useState(0); 

  const onpause = () => {
    setPlayStatus(PlayStatus.Pause);
  }
  const onplay = () => {
    setPlayStatus(PlayStatus.Play);
  }
  const changeLoopModeOneLoop = () => {
    setLoopMode(LoopMode.OneLoop);
  }
  const changeLoopModeListLoop = () => {
    setLoopMode(LoopMode.ListLoop);
  }
  const changeLoopModeShuffleLoop = () => {
    setLoopMode(LoopMode.ShuffleLoop);
  }

  return (
    <div className="lr-player container mx-auto flex items-center p-4 w-full h-20">
      <div className="join p-2">
        <button className="btn join-item lg:tooltip" title={ t("Back") }>
          <GoStart theme="outline" size="24" fill="#333"/>
        </button>
        { playStatus === PlayStatus.Play &&
          <button className="btn join-item lg:tooltip" title={t("Pause")} onClick={onpause}>
            <Pause theme="outline" size="24" fill="#333"/>
          </button>
        }
        {playStatus === PlayStatus.Pause &&
          <button className="btn join-item lg:tooltip" title={t("Play")} onClick={onplay}>
            <PlayOne theme="outline" size="24" fill="#333"/>
          </button>
        }
        <button className="btn join-item lg:tooltip" title={ t("Next") }>
          <GoEnd theme="outline" size="24" fill="#333"/>
        </button>
      </div>
      <div className="join p-2">
        {
          loopMode === LoopMode.OneLoop &&
          <button className="btn btn-ghost btn-sm" data-tip="hello" onClick={changeLoopModeListLoop}>
            <PlayOnce theme="outline" size="24" fill="#333"/>
          </button>
        }
        {
          loopMode === LoopMode.ListLoop &&
          <button className="btn btn-ghost btn-sm" data-tip="hello" onClick={changeLoopModeShuffleLoop}>
            <PlayCycle theme="outline" size="24" fill="#333"/>
          </button>
        }
        {
          loopMode === LoopMode.ShuffleLoop &&
          <button className="btn btn-ghost btn-sm" data-tip="hello" onClick={changeLoopModeOneLoop}>
            <ShuffleOne theme="outline" size="24" fill="#333"/>
          </button>
        }
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="join p-2">
        <div className="avatar">
          <div className="w-16 h-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
      <div className="join p-2">
        <h2 className="text-xl text font-bold leading-20 underline-offset-2 hover:underline">
          {
            t("Empty Playlist")
          }
        </h2>
      </div>
      <div className="join p-2 flex-1 flex items-center">
        <input type="range" min="0" max="0" value={ progress } className="range range-xs mr-2" onChange={(e) => setProgress(Number(e.target.value)) } />
        <span>{ formatSecond(progress) }</span>
      </div>
      {/* <div className="join p-2">
        <button className="btn btn-ghost btn-sm pop-btn" title={t("Volume {{value}}%", {value: 60}) }>
          <VolumeMute theme="outline" size="24" fill="#333" />
        </button>
      </div> */}
    </div>)
}