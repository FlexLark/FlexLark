export interface ISettingItem {
  value: string;
  key: string;
}

export interface ISettings {
  [key: string]: string;
}

export interface ISettingsManager {
  loadSettings(): Promise<void>;
  saveSettings(): Promise<void>;

  getItem(key: string): string | null;
  setItem(key: string, values: string): void;
  removeItem(key: string): void;
  resetSettings(): void;
  hasItem(key: string): boolean;
}