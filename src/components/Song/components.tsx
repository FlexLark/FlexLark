import { PlayOne } from "@icon-park/react";
import { SingerMetadata, SongMetadata } from "../../types/Metadata";
import { useTranslation } from "react-i18next";

export interface SongProps {
  title?: string,
  songs: SongMetadata[],
  onPlay: (song: SongMetadata) => void
}

export interface SongItemProps {
  song: SongMetadata,
  onPlay: (song: SongMetadata) => void 
}

export function SongItem({ song, onPlay }: SongItemProps) {
  const formatSinger = (singers: SingerMetadata[]) => singers.map(singer => singer.name);
  const { t } = useTranslation();
  return (
    <div className="w-36">
      <div className="overflow-hidden relative">
        <div className="avatar placeholder">
          <div className="w-36 rounded-xl">
            {
              song.cover &&
              <img src={song.cover} />
            }
            {
              !song.cover && 
              <div className="bg-base-100 text-neutral-content w-full h-full">
                <span className="text-xl">{ song.name }</span>
              </div>
            }
          </div>
        </div>
        <div className="flex hover:opacity-100 opacity-0 absolute top-0 left-0 items-center justify-center inset-0">
          <button
            onClick={() => onPlay(song)}
            className="btn transition-all backdrop-blur-sm hover:backdrop-blur-md border-none hover:bg-white/30 bg-white/30 btn-circle z-10">
            <PlayOne theme="filled" size="24" fill="#fff"/>
          </button>
        </div>
      </div>
      <div className="mt-2 text-ellipsis overflow-hidden w-full">
        <span className="text-lg font-bold">{song.name}</span>
      </div>
    </div>
  )
}
export default function Song({ title, songs, onPlay }: SongProps) {
  return (<div>
    <h3 className="text-3xl font-bold mb-4">
      <span className="text-3xl font-bold">{ title }</span>
    </h3>
    <div className="flex flex-row flex-wrap gap-6">
      {songs.map(song => <SongItem key={song.id} song={song} onPlay={onPlay} />)}
    </div>
  </div>);
}