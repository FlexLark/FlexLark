import Dexie from 'dexie';
import { IStorageManager } from '../interface/IStorageManager';

export class DexieStorageManager implements IStorageManager {
  private db: Dexie;

  constructor(dbName: string) {
    this.db = new Dexie(dbName);
    this.db.version(1).stores({
      data: '++id, type, key, value'
    });
  }

  async get<T>(type: string, id: string): Promise<T> {
    const result = await this.db.table('data').where({ type, id }).first();
    if (!result) {
      throw new Error(`Item not found: type=${type}, id=${id}`);
    }
    return result.value as T;
  }

  async set<T>(type: string, id: string, data: T): Promise<void> {
    await this.db.table('data').put({ id, type, value: data });
  }

  async delete(type: string, id: string): Promise<void> {
    await this.db.table('data').where({ type, id }).delete();
  }

  async search(query: string, type?: string, limit?: number, offset?: number): Promise<any[]> {
    if (!type) {
      const results = await this.db.table('data')
        .filter(item => JSON.stringify(item.value).includes(query)) // 简单的字符串包含搜索
        .offset(offset || 0)
        .limit(limit || 10)
        .toArray();
      return results.map(item => item.value);
    } else {
      const results = await this.db.table('data')
        .where('type')
        .equals(type)
        .filter(item => JSON.stringify(item.value).includes(query)) // 简单的字符串包含搜索
        .offset(offset || 0)
        .limit(limit || 10)
        .toArray();
        return results.map(item => item.value);
    }
  }
}
