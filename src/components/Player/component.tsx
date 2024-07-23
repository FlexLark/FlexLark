import "../../../i18n";
import { Howl } from 'howler';
import { GoStart, PlayOne, GoEnd, Pause, PlayOnce, PlayCycle, ShuffleOne, Acoustic } from "@icon-park/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoopMode, PlayStatus } from "./types";
import { formatSecond } from "./tools";
import { Audio } from "../../types/Audio";

interface propsType {
  playlist: Audio[],
  status: PlayStatus,
  index: number
}

const HowlConfig = (path: string) => {
  return {
    src: [path],
    html5: true
  }
}

export default function Player(props: propsType) {
  const { status, index } = props;
  const { t } = useTranslation();
  const [playStatus, setPlayStatus] = useState(status || PlayStatus.Pause);
  const [loading, setLoading] = useState(false);
  const [loopMode, setLoopMode] = useState(LoopMode.ListLoop);
  const [progress, setProgress] = useState(0);
  const [playlist, setPlaylist] = useState(props.playlist);
  const [playingPlaylist, setPlayingPlaylist] = useState(playlist);
  const [playIndex, setPlayIndex] = useState(index || 0);

  let [newSong, setNewSong] = useState<null | Howl>(null);
  const [playerTimer, setPlayTimer] = useState<number | undefined>(undefined);

  const onpause = () => {
    setPlayStatus(PlayStatus.Pause);
  }
  const onplay = () => {
    setPlayStatus(PlayStatus.Play);
  }
  const onnext = () => {
    if (playIndex + 1 >= playingPlaylist.length) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  }
  const onback = () => {
    if (playIndex - 1 < 0) {
      setPlayIndex(playingPlaylist.length - 1);
      return;
    }
    setPlayIndex(playIndex - 1);
  }
  const onprogress = (e) => {
    if (!newSong) return;
    newSong.seek(e?.target.value);
    setProgress(e?.target.value);
  }

  const changeLoopModeOneLoop = () => {
    setLoopMode(LoopMode.OneLoop);
    const newPlaylist = [playingPlaylist[playIndex]];
    setPlayingPlaylist(newPlaylist);
    setPlayIndex(0);
  }
  const changeLoopModeListLoop = () => {
    setLoopMode(LoopMode.ListLoop);
    setPlayingPlaylist(playlist);
  }
  const changeLoopModeShuffleLoop = () => {
    setLoopMode(LoopMode.ShuffleLoop);
    const newPlaylist = shuffleList(playlist)
    setPlayingPlaylist(newPlaylist);
  }

  useEffect(() => {
    newSong?.unload();
    if (playingPlaylist.length < 0 || playingPlaylist.length < playIndex - 1) return;
    setNewSong(new Howl(HowlConfig(playingPlaylist[playIndex]?.path)));
  }, [playIndex]);
  
  useEffect(() => {
    setProgress(0);
    if (!newSong) return;
    if (newSong.state() === 'loading') setLoading(true);
    newSong.on('load', () => setLoading(false));
    newSong.on('end', () => onnext());
    if (playStatus === PlayStatus.Play) {
      newSong.play(); 
    }
  }, [newSong])

  useEffect(() => { 
    if (playStatus === PlayStatus.Pause) {
      if (!newSong) return
      newSong.pause();
    } else if (playStatus === PlayStatus.Play) {
      if (!newSong) return
      newSong.play();
    }
  }, [playStatus])
  useEffect(() => {
    if (playerTimer) { 
      clearInterval(playerTimer);
      setPlayTimer(undefined);
    }
    if (playStatus === PlayStatus.Play) {
      setPlayTimer(setInterval(() => {
        if (!newSong) {
          setProgress(0);
          return;
        }
        setProgress(newSong.seek());
      }, 1000));
    } else {
      clearInterval(playerTimer);
      setPlayTimer(undefined);
    }
  }, [playIndex, playStatus, playingPlaylist, newSong])
  useEffect(() => {  
    // 当 playlist 变化时  
    setPlaylist(props.playlist);  
    setPlayingPlaylist(props.playlist);  
  }, [props.playlist]);  
    
  useEffect(() => {  
    // 当 index 变化时  
    setPlayIndex(index);  
  }, [index]);  
    
  useEffect(() => {  
    // 当 status 变化时  
    setTimeout(() => {
      setPlayStatus(status);  
    }, 200);
  }, [status]);
  return (
    <div className="lr-player container mx-auto flex items-center p-4 w-full h-full">
      <div className="join p-2">
        <button className="btn btn-square join-item" title={ t("Back") } onClick={onback}>
          <GoStart theme="outline" size="24" fill="#333"/>
        </button>
        { playStatus === PlayStatus.Play &&
          <button className="btn btn-square join-item" title={t("Pause")} onClick={onpause}>
            {
              loading && <span className="loading loading-spinner"></span>
            }
            {
              !loading && <Pause theme="filled" size="24" fill="#333"/>
            }
          </button>
        }
        {(playStatus === PlayStatus.Pause || playStatus === PlayStatus.Stop) &&
          <button className="btn btn-square join-item" title={t("Play")} onClick={onplay}>
            {
              loading && <span className="loading loading-spinner"></span>
            }
            {
              !loading && <PlayOne theme="filled" size="24" fill="#333"/>
            }
          </button>
        }
        <button className="btn btn-square join-item" title={ t("Next") } onClick={onnext}>
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
        {
          playingPlaylist[playIndex]?.cover &&
          <div className="w-14 rounded-lg mr-4 overflow-hidden">
            <img src={playingPlaylist[playIndex]?.cover} />
          </div>
        }
        {
          !playingPlaylist[playIndex]?.cover &&
          <div className="w-14 h-14 flex items-center justify-center bg-base-200 rounded-lg mr-4 overflow-hidden">
              <Acoustic theme="filled" size="24" fill="#333"/>
          </div>
        }
      </div>
      <div className="join p-2">
        <h2 className="text-xl text max-w-48 truncate font-bold leading-20 underline-offset-2 hover:underline">
          {
            playingPlaylist.length === 0 ?
              t("Empty Playlist") :
              playingPlaylist[playIndex].name
          }
        </h2>
      </div>
      <div className="join p-2 flex-1 flex items-center">
        <input
          type="range"
          min="0"
          max={
            playingPlaylist.length === 0 ? 0 :
            playingPlaylist[playIndex].duration
          }
          value={progress}
          className="range range-xs mr-4"
          onChange={onprogress}
        />
        <span className="flex-none">
          {formatSecond(progress)}
          /
          {formatSecond(
            playingPlaylist.length === 0 ? 0 :
            playingPlaylist[playIndex].duration
          )}
        </span>
      </div>
      {/* <div className="join p-2">
        <button className="btn btn-ghost btn-sm pop-btn" title={t("Volume {{value}}%", {value: 60}) }>
          <VolumeMute theme="outline" size="24" fill="#333" />
        </button>
      </div> */}
    </div>)
}

function shuffleList(playlist: Audio[]): import("react").SetStateAction<Audio[]> {
  for (let i = playlist.length - 1; i > 0; i--) {  
      const j = Math.floor(Math.random() * (i + 1));  
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]]; // 数组解构赋值  
  }  
  return playlist;  
}
