export interface IStorageManager {
  get<T>(type: string, id: string): Promise<T>;
  set<T>(type: string, id: string, data: T): Promise<void>;
  delete(type: string, id: string): Promise<void>;
  search(query: string, type?: string, limit?: number, offset?: number): Promise<any[]>;
}
