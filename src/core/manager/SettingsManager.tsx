import { ISettingItem, ISettingsManager } from "../interface/ISettingsManager";
import { exists, BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import JSON5 from 'json5';

export class SettingsManager implements ISettingsManager {
  settingsMap: Map<string, string>;
  settings: ISettingItem[];

  constructor() {
    this.settingsMap = new Map<string, string>();
    this.settings = [];
  }
    
  async loadSettings(): Promise<void> {
    const isExists = await exists('settings.json5', { baseDir: BaseDirectory.AppConfig });
    if (isExists) {
      let contents = await readTextFile('settings.json5', { baseDir: BaseDirectory.AppConfig });
      contents = JSON5.parse(contents);
      console.log('settings.json5', contents);
      this.settings = Object.keys(contents).map((key: any) => {
        return {
          key,
          value: contents[key]
        }
      });

      this.settings?.forEach((setting) => {
        this.settingsMap.set(setting.key, setting.value);
      })
    } else {
      this.settings = [];
    }
  }
  saveSettings(): Promise<void> {
    return writeTextFile('settings.json5', JSON5.stringify(this.settings), { baseDir: BaseDirectory.AppConfig });
  }
  getItem(key: string): string | null {
    return this.settingsMap.get(key) || null;
  }
  setItem(key: string, values: string): void {
    this.settingsMap.set(key, values);
    this.settings = Array.from(this.settingsMap.keys()).map((key: any) => {
      return {
        key,
        value: this.settingsMap.get(key)
      } as ISettingItem;
    })
  }
  removeItem(key: string): void {
    this.settingsMap.delete(key);
    this.settings = this.settings.filter((setting) => setting.key !== key);
  }
  resetSettings(): void {
    this.settingsMap.clear();
    this.settings = [];
  }
  hasItem(key: string): boolean {
    return this.settingsMap.has(key);
  }
}