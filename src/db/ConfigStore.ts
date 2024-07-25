import BaseStore from "./BaseStore";

export default class ConfigStore extends BaseStore {
  protected static instance: ConfigStore | null;

  protected getInitSql(): string {
    return `CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT);`;
  }  

  protected getDbPath(): string {
    return 'config';
  }

  public static getInstance(): ConfigStore {
    if(ConfigStore.instance) {
      return ConfigStore.instance;
    }
    ConfigStore.instance = new ConfigStore();
    return ConfigStore.instance;
  }

  public async get(key?: string): Promise<string | null | { key: string; value: string; }[]> {
    if (key) {
      return this._get(key);
    } else {
      return this._getAll();
    }
  }

  public async set(key: string, value: string): Promise<void> {
    return this._set(key, value);
  }

  public async delete(key: string): Promise<void> {
    return this._delete(key);
  }

  private async _get(key: string): Promise<string | null> {
    const db = await this.db;
    try {
      const result = await db?.select<{ value: string }[]>('SELECT value FROM config WHERE key = ?', [key]);
      if (!result) {
        return null;
      }
      return result.length > 0 ? result[0].value : null;
    } catch (error) {
      console.error(`Error getting value for key "${key}":`, error);
      throw error;
    }
  }

  private async _set(key: string, value: string): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute('REPLACE INTO config (key, value) VALUES (?, ?)', [key, value]);
    } catch (error) {
      console.error(`Error setting value for key "${key}":`, error);
      throw error; 
    }
  }

  private async _delete(key: string): Promise<void> {
    const db = await this.db;
    try {
      await db?.execute('DELETE FROM config WHERE key = ?', [key]);
    } catch (error) {
      console.error(`Error deleting key "${key}":`, error);
      throw error;
    }
  }

  private async _getAll(): Promise<{ key: string; value: string }[]> {
    const db = await this.db;
    try {
      const result = await db?.select<{ key: string; value: string }[]>('SELECT key, value FROM config');
      return result || [];
    } catch (error) {
      console.error("Error getting all config pairs:", error);
      throw error;
    }
  }
}