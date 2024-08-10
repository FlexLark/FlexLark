import { IMetadata, ISongMetadata } from "./IMetadata";
export interface IMetadataManager {
  getMetadataById<T extends IMetadata>(type: 'song' | 'album' | 'artist' | 'playlist' | 'category', id: string): Promise<T>;
  getMetadataByIds<T extends IMetadata>(type: 'song' | 'album' | 'artist' | 'playlist' | 'category', ids: string[]): Promise<T[]>;
  setMetadataById<T extends IMetadata>(type: 'song' | 'album' | 'artist' | 'playlist' | 'category', id: string, metadata: T): Promise<void>;
  deleteMetadataById(type: 'song' | 'album' | 'artist' | 'playlist' | 'category', id: string): Promise<void>;
  deleteMetadataByIds(type: 'song' | 'album' | 'artist' | 'playlist' | 'category', ids: string[]): Promise<void[]>;

  getSongMetadataByAlbumId(id: string): Promise<ISongMetadata[]>;
  getSongMetadataByArtistId(id: string): Promise<ISongMetadata[]>;
  getSongMetadataByPlaylistId(id: string): Promise<ISongMetadata[]>;
  getSongMetadataByCategoryId(id: string): Promise<ISongMetadata[]>;

  deleteSongMetadataByAlbumId(id: string): Promise<void>;
  deleteSongMetadataByArtistId(id: string): Promise<void>;
  deleteSongMetadataByPlaylistId(id: string): Promise<void>;
  deleteSongMetadataByCategoryId(id: string): Promise<void>;

  searchMetadata(
    type: 'song' | 'album' | 'artist' | 'playlist' | 'category',
    query: string,
    limit?: number,
    offset?: number
  ): Promise<IMetadata[]>;
}
