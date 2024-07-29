import { describe, expect, test, vi } from "vitest";
import { PluginManager } from "../core/manager/PluginManager";
import { IPlugin } from "../core/interface/IPlugin";
import Core from "../core";
import { ICoreContext } from "../core/interface/ICoreContext";

describe("PluginManager", () => {
  test("register", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      id: "test",
      name: "test",
      author: "test",
      description: "test",
      version: "test",
      install: vi.fn((core: ICoreContext): ICoreContext => {
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

  test("register error", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    expect(() => pluginManager.register({} as IPlugin)).toThrowError();
    expect(pluginManager.pluginMap.size).toBe(0);
  });

  test("destroy", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      id: "test",
      name: "test",
      author: "test",
      description: "test",
      version: "test",
      install: vi.fn((core: ICoreContext): ICoreContext => {

        return core;
      })
    }

    pluginManager.register(plugins);
    pluginManager.destroy();

    expect(pluginManager.pluginMap.size).toBe(0);
    expect(pluginManager.plugins.length).toBe(0);
  })

  test("destroy error", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      id: "",
      name: "",
      author: "",
      description: "",
      version: "",
      install: function (core: ICoreContext): ICoreContext {
        return core;
      },
      destroy: function (core: ICoreContext) {
        throw new Error();
      }
    }
    expect(pluginManager.pluginMap.size).toBe(0);
  })

  test("update", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      id: "test",
      name: "test",
      author: "test",
      description: "test",
      version: "test",
      install: vi.fn((core: ICoreContext): ICoreContext => {
        // You can add custom behavior here if needed
        return core;
      })
    }

    pluginManager.register(plugins);
    pluginManager.update();

    expect(pluginManager.pluginMap.get(plugins.name)).toBe(plugins);
    expect(pluginManager.pluginMap.size).toBe(1);
  })

  test("update error", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    expect(pluginManager.pluginMap.size).toBe(0);
  })
});