import "../../../i18n";
import {Howl, Howler} from 'howler';
import { GoStart, PlayOne, GoEnd, Pause, PlayOnce, PlayCycle, ShuffleOne } from "@icon-park/react";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoopMode, PlayStatus } from "./types";
import { formatSecond } from "./tools";

export interface AudioType { 
  name: string,
  duration: number,
  cover?: string,
  path: string,
}
interface propsType {
  playlist: AudioType[],
  status: PlayStatus
}

export default function Player(props: propsType) {
  const { t } = useTranslation();
  const [playStatus, setPlayStatus] = useState(PlayStatus.Pause);
  const [loopMode, setLoopMode] = useState(LoopMode.ListLoop);
  const [progress, setProgress] = useState(0);
  const [playlist, setPlaylist] = useState(props.playlist);
  const [playIndex, setPlayIndex] = useState(0);
  console.log('加载')
  let backSong = new Howl({
    src: [playlist[playIndex === 0?playlist.length - 1:playIndex - 1].path]
  });
  let newSong = new Howl({
    src: [playlist[playIndex].path]
  });
  let nextSong = new Howl({
    src: [playlist[playIndex + 1 < playlist.length ? playIndex + 1 : 0].path]
  })


  const onpause = () => {
    setPlayStatus(PlayStatus.Pause);
    newSong.pause();
  }
  const onplay = () => {
    setPlayStatus(PlayStatus.Play);
    newSong.play();
  }
  const onnext = () => {
    newSong.stop();
    if (playIndex + 1 >= playlist.length) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
    backSong = newSong
    newSong = nextSong
    if (playIndex + 1 >= playlist.length) {
      nextSong = new Howl({
        src: [playlist[playIndex + 1].path]
      })
    } else {
      nextSong = new Howl({
        src: [playlist[0].path]
      })
    }
    if (playStatus === PlayStatus.Play) {
      nextSong.play();
    }
  }
  const onback = () => {
    newSong.stop();
    backSong.play();

    if (playIndex - 1 < 0) {
      setPlayIndex(playlist.length - 1);
      return;
    }
    setPlayIndex(playIndex - 1);
    onplay();
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
  useEffect(() => {

  }, [newSong])
  function formatFileName(fileName: HTMLAudioElement): ReactNode | Iterable<ReactNode> {
    return 
  }

  return (
    <div className="lr-player container mx-auto flex items-center p-4 w-full h-full">
      <div className="join p-2">
        <button className="btn join-item lg:tooltip" title={ t("Back") } onClick={onback}>
          <GoStart theme="outline" size="24" fill="#333"/>
        </button>
        { playStatus === PlayStatus.Play &&
          <button className="btn join-item lg:tooltip" title={t("Pause")} onClick={onpause}>
            <Pause theme="filled" size="24" fill="#333"/>
          </button>
        }
        {playStatus === PlayStatus.Pause &&
          <button className="btn join-item lg:tooltip" title={t("Play")} onClick={onplay}>
            <PlayOne theme="filled" size="24" fill="#333"/>
          </button>
        }
        <button className="btn join-item lg:tooltip" title={ t("Next") } onClick={onnext}>
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
        <h2 className="text-xl text w-48 truncate font-bold leading-20 underline-offset-2 hover:underline">
          {
            playlist.length < 0 ?
              t("Empty Playlist") :
              playlist[playIndex].name
          }
        </h2>
      </div>
      <div className="join p-2 flex-1 flex items-center">
        <input type="range" min="0" max={ playlist[playIndex].duration } value={ progress } className="range range-xs mr-2" onChange={(e) => setProgress(Number(e.target.value)) } />
        <span>{ formatSecond(progress) }</span>
      </div>
      {/* <div className="join p-2">
        <button className="btn btn-ghost btn-sm pop-btn" title={t("Volume {{value}}%", {value: 60}) }>
          <VolumeMute theme="outline" size="24" fill="#333" />
        </button>
      </div> */}
    </div>)
}