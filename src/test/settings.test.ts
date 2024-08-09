import { afterEach, describe, expect, test } from "vitest";
import { SettingsManager } from "../core/manager/SettingsManager";
import { mockIPC, clearMocks } from "@tauri-apps/api/mocks";
import JSON5 from "json5";

describe("SettingsManager", () => {
  afterEach(() => {
    clearMocks()
  })

  test("load settings", async () => {
    mockIPC((cmd, args) => {
      console.log(cmd, args)
      if (cmd === 'plugin:fs|exists') {
        if (args.path === 'settings.json5') {
          return true;
        }
        return false;
      }
      if (cmd === 'plugin:fs|read_text_file') {
        if (args.path === 'settings.json5') {
          return `
          {
            "theme": "dark",
            "language": "en"
          }`;
        }
        throw new Error('File not found');
      }
      if (cmd === 'plugin:fs|write_text_file') {
        if (args.path === 'settings.json5') {
          expect(JSON5.parse(args.data)).toStrictEqual(JSON5.parse(`{
            "theme": "light",
            "language": "en"
          }`));
          return true;
        }
        throw new Error('File not found');
      }
      return null;
    });

    const settings = new SettingsManager();
    await settings.loadSettings();
    expect(settings.hasItem('theme')).toStrictEqual(true);
    expect(settings.getItem('theme')).toStrictEqual('dark');
    expect(settings.getItem('language')).toStrictEqual('en');
    settings.setItem('theme', 'light');
    expect(settings.getItem('theme')).toStrictEqual('light');
    settings.saveSettings();


    settings.removeItem('theme');
    expect(settings.getItem('theme')).toStrictEqual(null);
    settings.resetSettings();
    expect(settings.getItem('theme')).toStrictEqual(null);
  })

  test("load settings2", async () => {
    mockIPC((cmd, args) => {
      console.log(cmd, args)
      if (cmd === 'plugin:fs|exists') {
        return false;
      }
      return null;
    });

    const settings = new SettingsManager();
    await settings.loadSettings();
    expect(settings.hasItem('theme')).toStrictEqual(false);
    expect(settings.getItem('theme')).toStrictEqual(null);
  })
})
