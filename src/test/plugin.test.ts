import { describe, expect, test, vi } from "vitest";
import { PluginManager } from "../core/manager/PluginManager";
import { IPlugin } from "../core/interface/IPlugin";
import Core from "../core";

describe("PluginManager", () => {
  test("register", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core);
    const plugins: IPlugin = {
      id: "test",
      name: "test",
      author: "test",
      description: "test",
      version: "test",
      install: vi.fn((core: Core): Core => {
        // You can add custom behavior here if needed
        return core;
      })
    }

    pluginManager.register(plugins);

    expect(pluginManager.pluginMap.get(plugins.name)).toBe(plugins);
    expect(pluginManager.pluginMap.size).toBe(1);
    expect(pluginManager.plugins[0]).toBe(plugins);
    expect(plugins.install).toHaveBeenCalled();
  });
  test("destroy", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core);
    const plugins: IPlugin = {
      id: "test",
      name: "test",
      author: "test",
      description: "test",
      version: "test",
      install: vi.fn((core: Core): Core => {

        return core;
      })
    }

    pluginManager.register(plugins);
    pluginManager.destroy();

    expect(pluginManager.pluginMap.size).toBe(0);
    expect(pluginManager.plugins.length).toBe(0);
  })

  test("update", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core);
    const plugins: IPlugin = {
      id: "test",
      name: "test",
      author: "test",
      description: "test",
      version: "test",
      install: vi.fn((core: Core): Core => {
        // You can add custom behavior here if needed
        return core;
      })
    }

    pluginManager.register(plugins);
    pluginManager.update();

    expect(pluginManager.pluginMap.get(plugins.name)).toBe(plugins);
    expect(pluginManager.pluginMap.size).toBe(1);
  })
});