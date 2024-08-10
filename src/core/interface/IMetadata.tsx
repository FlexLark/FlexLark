export interface IMetadata {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
}
export interface ISongMetadata extends IMetadata {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  duration: number;
  artist: IArtistMetadata;
  album: IAlbumMetadata;
}
export interface IPlaylistMetadata extends IMetadata  {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  songs: ISongMetadata[];
}

export interface IAlbumMetadata extends IMetadata  {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  songs: ISongMetadata[];
}

export interface IArtistMetadata extends IMetadata  {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  albums: IAlbumMetadata[];
  songs: ISongMetadata[];
}

export interface ICategoryMetadata extends IMetadata  {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
}
