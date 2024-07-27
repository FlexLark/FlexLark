import { useState } from "react";
import Song from "../../components/Song/components";
import { SongMetadata } from "../../types/Metadata";

export default function TrainPage() {
  const onplay = (song: SongMetadata) => console.log('play: ', song);
  const [songs, setSongs] = useState<SongMetadata[]>([
    {
      id: '1',
      name: '光阴的故事',
      singer: [
        { name: '罗大佑', id: '1' },
        { name: '罗大佑', id: '2' },
        { name: '罗大佑', id: '3' },
      ],
      duration: 204,
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Video221/v4/ca/fd/49/cafd491c-73cb-1c69-725d-fc403e5c38df/Jobbaeb4dfc-eb87-49f1-9599-4197d57bd431-171758844-PreviewImage_Preview_Image_Intermediate_nonvideo_sdr_334495459_1832019866-Time1720824456709.png/316x316bb.webp",
      path: "http://127.0.0.1:8080/%E5%85%89%E9%98%B4%E7%9A%84%E6%95%85%E4%BA%8B-%E7%BD%97%E5%A4%A7%E4%BD%91.mp3"
    },
    {
      id: '2',
      name: '安和桥',
      singer: [
        { name: '宋冬野', id: '1' },
      ],
      duration: 204,
      path: "http://127.0.0.1:8080/F000000ky4wc42VVij.flac",
      cover: "http://p1.music.126.net/PwwgQoOeILQbWi4O2kqhJg==/109951169775041084.jpg?param=130y130"
    },
    {
      id: '3',
      name: '偏爱',
      singer: [
        { name: '张芸京', id: '1' },
      ],
      duration: 204,
      cover: "https://p1.music.126.net/Fs0DjAvcAAyAZa1dgXzFfQ==/109951163571833739.jpg",
      path: "http://127.0.0.1:8080/F000000UA33L3tgRFz.flac"
    },
    {
      id: '4',
      name: '稻香',
      singer: [
        {
          name: '周杰伦',
          id: '1'
        }
      ],
      duration: 204,
      cover: "https://p1.music.126.net/JsxPsRVAwH_kYB_sarmWXg==/109951166283221642.jpg",
      path: "http://127.0.0.1:8080/F0000020wJDo3cx0j3.flac"
    },
    {
      id: '5',
      name: '张芸京',
      singer: [
        { name: '张芸京', id: '1' },
      ],
      duration: 204,
      cover: "https://p1.music.126.net/whuiVDHL3a-OE8q4mcj5xA==/109951169484809780.jpg",
      path: "http://127.0.0.1:8080/F000004UlK9x0jeuow.flac"
    },
    {
      id: '6',
      name: '可不可以',
      singer: [
        { name: '张紫豪', id: '1' },
      ],
      duration: 204,
      cover: "https://p1.music.126.net/VFd5cboNTbnYsWZ5DBn9bg==/18953381440004340.jpg",
      path: "http://127.0.0.1:8080/M500001hQx2H29zdN9.mp3"
    },
    {
      id: '7',
      name: '一路向北超级长超级长超级长超级长超级长超级长超级长超级长超级长',
      singer: [
        { name: '周杰伦', id: '1' },
      ],
      duration: 204,
      cover: "https://p1.music.126.net/6wq2s3Rtm8aJYvAoHKmgyA==/109951163202408350.jpg?param=200y200",
      path: "http://127.0.0.1:8080/M800004cZvLj1qDq4A.mp3"
    },
  ]);
  return (
    <div className="pages">
      <h1>Train Page</h1>
      <div className="container bg-slate-300 p-4">
        <Song title="今日推荐" songs={songs} onPlay={onplay} />
      </div>
    </div>
  );
}