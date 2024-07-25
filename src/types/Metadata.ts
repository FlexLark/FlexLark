export interface SongMetadata {
  id: string;
  name: string;
  singer?: string | string[] | SingerMetadata | SingerMetadata[]; // singer ids
  album?: string | AlbumMetadata; // album id
  duration: number; // in seconds
  size?: number; // in bytes
  path: string;
  cover?: string; // cover image path
  category?: string | string[] | CategoryMetadata | CategoryMetadata[]; // category ids
}
export interface PlaylistMetadata {
  id: string;
  name: string;
  songs: string[] | SongMetadata[]; // song ids
  description?: string;
  cover?: string; // cover image path
}
export interface AlbumMetadata {
  id: string;
  name: string;
  singer?: string | SingerMetadata;
  songs?: string[] | SongMetadata[]; // song ids
  cover?: string; // cover image path
}
export interface SingerMetadata {
  id: string;
  name: string;
  description?: string;
  cover?: string; // cover image path
}

export interface CategoryMetadata {
  id: string;
  name: string;
  description?: string;
  cover?: string; // cover image path
}