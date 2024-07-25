import BaseStore from "./BaseStore";
import { SongMetadata, PlaylistMetadata, AlbumMetadata, SingerMetadata } from "../types/Metadata";

export default class MetadataStore extends BaseStore {
  protected static instance: MetadataStore | null;
  protected getInitSql(): string {
    return `
    CREATE TABLE IF NOT EXISTS song_metadata (

    );
    CREATE UNIQUE INDEX IF NOT EXISTS singer_metadata (

    );
    CREATE UNIQUE INDEX IF NOT EXISTS album_metadata (

    );
    CREATE UNIQUE INDEX IF NOT EXISTS playlist_metadata (

    );
    CREATE UNIQUE INDEX IF NOT EXISTS catgory_metadata (

    );
    `;
  }
  protected getDbPath(): string {
    return "metadata";
  }

  public static getInstance(): MetadataStore {
    if(MetadataStore.instance) {
      return MetadataStore.instance;
    }
    MetadataStore.instance = new MetadataStore();
    return MetadataStore.instance;
  }

  
  public async getSongMetadata(): Promise<SongMetadata> { }
  public async getSongMetadataById(id: string): Promise<SongMetadata> { }
  public async setSongMetadataById(id: string, metadata: SongMetadata): Promise<void> { }
  public async deleteSongMetadataByIds(id: string): Promise<void> { }
  public async getSongMetadataBySinger(id: string): Promise<SongMetadata[]> { }
  public async getSongMetadataByAlbum(id: string): Promise<SongMetadata[]> { }
  public async getSongMetadataByPlaylist(id: string): Promise<SongMetadata[]> { }
  public async getSongMetadataByCategory(id: string): Promise<SongMetadata[]> { }

  public async getPlaylistMetadata(id: string): Promise<PlaylistMetadata> { }
  public async setPlaylistMetadata(id: string, metadata: PlaylistMetadata): Promise<void> { }
  public async deletePlaylistMetadataByIds(id: string): Promise<void> { }

  public async getAlbumMetadata(id: string): Promise<AlbumMetadata> { }
  public async setAlbumMetadata(id: string, metadata: AlbumMetadata): Promise<void> { }
  public async deleteAlbumMetadataByIds(id: string): Promise<void> { }
  public async getAlbumMetadataBySinger(id: string): Promise<AlbumMetadata[]> { }


  public async getSingerMetadata(id: string): Promise<SingerMetadata> { }
  public async setSingerMetadata(id: string, metadata: SingerMetadata): Promise<void> { }
  public async deleteSingerMetadataByIds(id: string): Promise<void> { }

  public async getCategoryMetadata(id: string): Promise<CategoryMetadata> { }
  public async setCategoryMetadata(id: string, metadata: CategoryMetadata): Promise<void> { }
  public async deleteCategoryMetadataByIds(id: string): Promise<void> { }
}

