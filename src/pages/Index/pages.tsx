
import Playlist from "../../components/Playlist/components";
import { useSelector, useDispatch } from 'react-redux';
import { replace, setIndex, setStatus } from "../../store/festures/playStatusSlice";
import { Audio } from "../../types/Audio";
import { useState } from "react";
import { PlayStatus } from "../../components/Player/types";

export function IndexPage() {
  const [playlist, setPlaylist] = useState<Audio[]>([
    {
      name: '光阴的故事',
      author: ['罗大佑', '罗贯中'],
      duration: 204,
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Video221/v4/ca/fd/49/cafd491c-73cb-1c69-725d-fc403e5c38df/Jobbaeb4dfc-eb87-49f1-9599-4197d57bd431-171758844-PreviewImage_Preview_Image_Intermediate_nonvideo_sdr_334495459_1832019866-Time1720824456709.png/316x316bb.webp",
      path: "http://127.0.0.1:8080/%E5%85%89%E9%98%B4%E7%9A%84%E6%95%85%E4%BA%8B-%E7%BD%97%E5%A4%A7%E4%BD%91.mp3"
    },
    {
      name: '安和桥',
      author: ['宋冬野'],
      duration: 204,
      path: "http://127.0.0.1:8080/F000000ky4wc42VVij.flac"
    },
    {
      name: '偏爱',
      author: ['张芸京'],
      duration: 204,
      path: "http://127.0.0.1:8080/F000000UA33L3tgRFz.flac"
    },
    {
      name: '稻香',
      author: ['周杰伦'],
      duration: 204,
      path: "http://127.0.0.1:8080/F0000020wJDo3cx0j3.flac"
    },
    {
      name: '张芸京',
      author: ['周杰伦'],
      duration: 204,
      path: "http://127.0.0.1:8080/F000004UlK9x0jeuow.flac"
    },
    {
      name: '可不可以',
      author: ['张紫豪'],
      duration: 204,
      path: "http://127.0.0.1:8080/M500001hQx2H29zdN9.mp3"
    },
    {
      name: '一路向北',
      author: ['周杰伦'],
      duration: 204,
      path: "http://127.0.0.1:8080/M800004cZvLj1qDq4A.mp3"
    },
  ]);
  const dispatch = useDispatch();
  const onChangeIndex = (index: number) => {
    dispatch(replace(playlist));
    dispatch(setIndex(index));
    dispatch(setStatus(PlayStatus.Play));
  }
  const onChangeList = (playlist: Audio[]) => {
    dispatch(replace(playlist));
    dispatch(setStatus(PlayStatus.Play));
  };
  return (
    <Playlist playlist={playlist} onClick={onChangeIndex} onPlay={ onChangeList } />
  )
}