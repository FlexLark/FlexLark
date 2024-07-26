import BaseStore from "./BaseStore";
import { SongMetadata, PlaylistMetadata, AlbumMetadata, SingerMetadata, CategoryMetadata, AnyMetadata } from "../types/Metadata";

export default class MetadataStore extends BaseStore {
  protected static instance: MetadataStore | null;
  protected getInitSql(): string {
    return `
-- 创建歌手表  
CREATE TABLE IF NOT EXISTS singer_metadata (  
    id VARCHAR(255) PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    description TEXT,  
    cover VARCHAR(255)  
);  
  
-- 创建分类表  
CREATE TABLE IF NOT EXISTS category_metadata (  
    id VARCHAR(255) PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    description TEXT,  
    cover VARCHAR(255)  
);  
  
-- 创建专辑表  
CREATE TABLE IF NOT EXISTS album_metadata (  
    id VARCHAR(255) PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    singer_id VARCHAR(255),  
    cover VARCHAR(255),  
    FOREIGN KEY (singer_id) REFERENCES singer_metadata(id)  
);  
  
-- 创建歌曲表  
CREATE TABLE IF NOT EXISTS song_metadata (  
    id VARCHAR(255) PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    singer_id VARCHAR(255),  
    album_id VARCHAR(255),  
    duration INT NOT NULL,  
    size BIGINT,  
    path VARCHAR(255) NOT NULL,  
    cover VARCHAR(255),  
    category_id VARCHAR(255),  
    FOREIGN KEY (singer_id) REFERENCES singer_metadata(id),  
    FOREIGN KEY (album_id) REFERENCES album_metadata(id),  
    FOREIGN KEY (category_id) REFERENCES category_metadata(id)  
);  
  
-- 创建播放列表表  
CREATE TABLE IF NOT EXISTS playlist_metadata (  
    id VARCHAR(255) PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    description TEXT,  
    cover VARCHAR(255),  
    -- 注意：这里我们不直接在播放列表表中存储歌曲数据，而是使用关联表  
    -- 如果需要，可以创建一个 playlist_songs 关联表来存储播放列表和歌曲之间的关系  
);  
  
-- 创建索引（根据需要）  
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_singer_id ON singer_metadata(id);  
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_category_id ON category_metadata(id);  
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_album_id ON album_metadata(id);  
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_song_id ON song_metadata(id);  
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_playlist_id ON playlist_metadata(id);  
  
-- 创建索引以优化查询（非唯一）  
CREATE INDEX IF NOT EXISTS idx_song_singer ON song_metadata(singer_id);  
CREATE INDEX IF NOT EXISTS idx_song_album ON song_metadata(album_id);  
CREATE INDEX IF NOT EXISTS idx_song_category ON song_metadata(category_id);  
  
-- 如果需要，创建播放列表和歌曲之间的关联表  
CREATE TABLE IF NOT EXISTS playlist_songs (  
    playlist_id VARCHAR(255),  
    song_id VARCHAR(255),  
    PRIMARY KEY (playlist_id, song_id),  
    FOREIGN KEY (playlist_id) REFERENCES playlist_metadata(id),  
    FOREIGN KEY (song_id) REFERENCES song_metadata(id)  
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
  
  public async getSongMetadata(): Promise<Array<SongMetadata>> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<SongMetadata>>(`SELECT * FROM song_metadata`);
      return result as Array<SongMetadata>;
    } catch (error) {
      console.error(`Error getting song metadata:`, error);
      throw error;
    }
  }

  public async getSongMetadataById(id: string): Promise<SongMetadata | null> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<SongMetadata>>(`SELECT * FROM song_metadata WHERE id = ?`, [id]);
      if (!result || result.length === 0) {
        return null;
      }
      return result[0] as SongMetadata;
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    }
  }

  public async setSongMetadataById(id: string, metadata: SongMetadata): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`INSERT INTO song_metadata (id, name, singer_id, album_id, duration, size, path, cover, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        id,
        metadata.name,
        metadata.singer,
        metadata.album,
        metadata.duration,
        metadata.size,
        metadata.path,
        metadata.cover,
        metadata.category,
      ]);
    } catch (error) {
      console.error(`Error setting song metadata:`, error);
      throw error;
    }
  }

  public async deleteSongMetadataByIds(ids: Array<string>): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`DELETE FROM song_metadata WHERE id IN (?)`, [ids]);
    } catch (error) {
      console.error(`Error deleting ids "${ids}":`, error);
      throw error;
    }
  }

  public async getSongMetadataBySinger(singerId: string): Promise<SongMetadata[]> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<SongMetadata>>(`SELECT * FROM song_metadata WHERE singer_id = ?`, [singerId]);
      return result as Array<SongMetadata>;
    } catch (error) {
      console.error(`Error getting song metadata:`, error);
      throw error;
    }
  }

  public async getSongMetadataByAlbum(albumId: string): Promise<SongMetadata[]> { 
    const db = await this.db;
    try {
      const result = await db?.select<Array<SongMetadata>>(`SELECT * FROM song_metadata WHERE album_id = ?`, [albumId]);
      return result as Array<SongMetadata>;
    } catch (error) {
      console.error(`Error getting song metadata:`, error);
      throw error;
    }
  }

  public async getSongMetadataByPlaylist(id: string): Promise<SongMetadata[]> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<SongMetadata>>(`SELECT * FROM song_metadata WHERE id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)`, [id]);
      return result as Array<SongMetadata>;
    } catch (error) {
      console.error(`Error getting song metadata:`, error);
      throw error;
    }
  }

  public async getSongMetadataByCategory(id: string): Promise<SongMetadata[]> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<SongMetadata>>(`SELECT * FROM song_metadata WHERE category_id = ?`, [id]);
      return result as Array<SongMetadata>;
    } catch (error) {
      console.error(`Error getting song metadata:`, error);
      throw error;
    }
  }

  public async getPlaylistMetadata(id: string): Promise<PlaylistMetadata | null> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<PlaylistMetadata>>(`SELECT * FROM playlist_metadata WHERE id = ?`, [id]);
      if (!result || result.length === 0) {
        return null;
      }
      return result[0] as PlaylistMetadata;
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    } 
  }

  public async setPlaylistMetadata(id: string, metadata: PlaylistMetadata): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`INSERT INTO playlist_metadata (id, name, description, cover, category_id) VALUES (?, ?, ?, ?, ?)`, [
        id,
        metadata.name,
        metadata.description,
        metadata.cover,
        metadata.category,
      ]);
    } catch (error) {
      console.error(`Error setting playlist metadata:`, error);
      throw error;
    }
  }

  public async deletePlaylistMetadataByIds(id: string): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`DELETE FROM playlist_metadata WHERE id = ?`, [id]);
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    }
  }

  public async getAlbumMetadata(id: string): Promise<AlbumMetadata | null> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<AlbumMetadata>>(`SELECT * FROM album_metadata WHERE id = ?`, [id]);
      if (!result || result.length === 0) {
        return null;
      }
      return result[0] as AlbumMetadata;
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    }
  }

  public async setAlbumMetadata(id: string, metadata: AlbumMetadata): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`INSERT INTO album_metadata (id, name, description, cover, singer_id) VALUES (?, ?, ?, ?, ?)`, [
        id,
        metadata.name,
        metadata.description,
        metadata.cover,
        metadata.singer,
      ]);
    } catch (error) {
      console.error(`Error setting album metadata:`, error);
      throw error;
    }
  }

  public async deleteAlbumMetadataByIds(id: string): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`DELETE FROM album_metadata WHERE id = ?`, [id]);
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    }
  }

  public async getAlbumMetadataBySinger(id: string): Promise<AlbumMetadata[]> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<AlbumMetadata>>(`SELECT * FROM album_metadata WHERE singer_id = ?`, [id]);
      return result as Array<AlbumMetadata>;
    } catch (error) {
      console.error(`Error getting album metadata:`, error);
      throw error;
    }
  }

  public async getSingerMetadata(id: string): Promise<SingerMetadata> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<SingerMetadata>>(`SELECT * FROM singer_metadata WHERE id = ?`, [id]);
      if (!result || result.length === 0) {
        throw new Error(`No singer metadata found for id "${id}"`);
      }
      return result[0] as SingerMetadata;
    } catch (error) {
      console.error(`Error getting singer metadata:`, error); throw error;
    }
  }

  public async setSingerMetadata(id: string, metadata: SingerMetadata): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`INSERT INTO singer_metadata (id, name, description, cover) VALUES (?, ?, ?, ?)`, [
        id,
        metadata.name,
        metadata.description,
        metadata.cover,
      ]);
    } catch (error) {
      console.error(`Error setting singer metadata:`, error);
      throw error;
    }
  }

  public async deleteSingerMetadataByIds(id: string): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`DELETE FROM singer_metadata WHERE id = ?`, [id]);
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    }
  }

  public async getCategoryMetadata(id: string): Promise<CategoryMetadata> {
    const db = await this.db;
    try {
      const result = await db?.select<Array<CategoryMetadata>>(`SELECT * FROM category_metadata WHERE id = ?`, [id]);
      if (!result || result.length === 0) {
        throw new Error(`No category metadata found for id "${id}"`);
      }
      return result[0] as CategoryMetadata;
    } catch (error) {
      console.error(`Error getting category metadata:`, error);
      throw error;
    }
  }

  public async setCategoryMetadata(id: string, metadata: CategoryMetadata): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`INSERT INTO category_metadata (id, name, description, cover) VALUES (?, ?, ?, ?)`, [
        id,
        metadata.name,
        metadata.description,
        metadata.cover,
      ]);
    } catch (error) {
      console.error(`Error setting category metadata:`, error);
      throw error;
    }
  }

  public async deleteCategoryMetadataByIds(id: string): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute(`DELETE FROM category_metadata WHERE id = ?`, [id]);
    } catch (error) {
      console.error(`Error deleting id "${id}":`, error);
      throw error;
    }
  }

  public async searchByKey(key: string): Promise<AnyMetadata[]> {
    // Todo
    const db = await this.db;
    try {
      const result = await db?.select<Array<AnyMetadata>>(`SELECT * FROM (SELECT * FROM singer_metadata UNION SELECT * FROM category_metadata UNION SELECT * FROM album_metadata) WHERE name LIKE ?`, [`%${key}%`]);
      return result as Array<AnyMetadata>;
    } catch (error) {
      console.error(`Error searching metadata:`, error);
      throw error;
    }
  }
}

