import { IMetadata, ISongMetadata } from "../interface/IMetadata";
import { IMetadataManager } from "../interface/IMetadataManager";
import { IStorageManager } from "../interface/IStorageManager";

export class MetaManager implements IMetadataManager {
  storage: IStorageManager;
  constructor (storage: IStorageManager) {
    this.storage = storage;
  }
  async getMetadataById<T extends IMetadata>(type: "song" | "album" | "artist" | "playlist" | "category", id: string): Promise<T> {
    return await this.storage.get(type, id);
  }
  getMetadataByIds<T extends IMetadata>(type: "song" | "album" | "artist" | "playlist" | "category", ids: string[]): Promise<T[]> {
    return Promise.all(ids.map(id => this.storage.get<T>(type, id)));
  }
  setMetadataById<T extends IMetadata>(type: "song" | "album" | "artist" | "playlist" | "category", id: string, metadata: T): Promise<void> {
    return this.storage.set(type, id, metadata);
  }
  deleteMetadataById(type: "song" | "album" | "artist" | "playlist" | "category", id: string): Promise<void> {
    return this.storage.delete(type, id);
  }
  deleteMetadataByIds(type: "song" | "album" | "artist" | "playlist" | "category", ids: string[]): Promise<void[]> {
    return Promise.all(ids.map(id => this.storage.delete(type, id)));
  }
  getSongMetadataByAlbumId(id: string): Promise<ISongMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getSongMetadataByArtistId(id: string): Promise<ISongMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getSongMetadataByPlaylistId(id: string): Promise<ISongMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getSongMetadataByCategoryId(id: string): Promise<ISongMetadata[]> {
    throw new Error("Method not implemented.");
  }
  deleteSongMetadataByAlbumId(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSongMetadataByArtistId(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSongMetadataByPlaylistId(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSongMetadataByCategoryId(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  searchMetadata(query: string, type: "song" | "album" | "artist" | "playlist" | "category", limit?: number, offset?: number): Promise<IMetadata[]> {
    return this.storage.search(query, type, limit, offset);
  }
}