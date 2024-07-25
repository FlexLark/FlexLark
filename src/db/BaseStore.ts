import Database from "tauri-plugin-sql-api";
import { ENV_MODE } from "@/utils/const";

export default abstract class BaseStore{
  protected db: Database | null = null;
  protected constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    try {
      const dbPath = this.getDbPath();
      this.db = await Database.load(ENV_MODE === "development" ? `sqlite:${dbPath}.db` : `sqlite:${dbPath}_dev.db`);
      await this.db?.execute(await this.getInitSql());
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }
  protected abstract getInitSql(): string;
  protected abstract getDbPath(): string;
}