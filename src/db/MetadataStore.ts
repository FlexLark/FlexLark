import BaseStore from "./BaseStore";

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
}