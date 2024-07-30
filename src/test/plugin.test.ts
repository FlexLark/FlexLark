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

  test("Two plugins. The first plugin has no priority", async () => {
    const core = new Core();
    const plugin1:IPlugin = {
      name: 'plugin1',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      })
    } as unknown as IPlugin;
    const plugin2:IPlugin = {
      name: 'plugin2',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      }),
      priority: 1
    } as unknown as IPlugin;

    core.register(plugin1);
    core.register(plugin2);

    expect(plugin1.install).toHaveBeenCalled();
    expect(plugin2.install).toHaveBeenCalled();
    expect(core.pluginManager.pluginMap.get(plugin1.name)).toBe(plugin1);
    expect(core.pluginManager.pluginMap.get(plugin2.name)).toBe(plugin2);
    expect(core.pluginManager.plugins[0]).toBe(plugin2);
    expect(core.pluginManager.plugins[1]).toBe(plugin1);
  });

  test("Two plugins. Both plugins have no priority", async () => {
    const core = new Core();
    const plugin1:IPlugin = {
      name: 'plugin1',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      }),
    } as unknown as IPlugin;
    const plugin2:IPlugin = {
      name: 'plugin2',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      })
    } as unknown as IPlugin;

    core.register(plugin1);
    core.register(plugin2);

    expect(plugin1.install).toHaveBeenCalled();
    expect(plugin2.install).toHaveBeenCalled();
    expect(core.pluginManager.pluginMap.get(plugin1.name)).toBe(plugin1);
    expect(core.pluginManager.pluginMap.get(plugin2.name)).toBe(plugin2);
    expect(core.pluginManager.plugins[0]).toBe(plugin1);
    expect(core.pluginManager.plugins[1]).toBe(plugin2);
  })

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
  });

  test("destroy error", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      id: "",
      name: "",
      author: "",
      description: "",
      version: "",
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      }),
      destroy: vi.fn((core: ICoreContext): ICoreContext => {
        throw new Error
      })
    }
    pluginManager.register(plugins);
    expect(pluginManager.pluginMap.size).toBe(1);
    expect(pluginManager.plugins.length).toBe(1);
    expect(pluginManager.plugins[0]).toBe(plugins);
    expect(pluginManager.pluginMap.get(plugins.name)).toBe(plugins);
    pluginManager.destroy();
    expect(pluginManager.pluginMap.size).toBe(0);
  });

  test("destroy is not a function", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    
    const plugins: IPlugin = {
      name: 'plugin1',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      })
    } as unknown as IPlugin;

    pluginManager.register(plugins);

    pluginManager.destroy();
    expect(pluginManager.pluginMap.size).toBe(0);
  });

  test("error is not a function", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      name: 'plugin1',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      }),
      destroy: vi.fn((core: ICoreContext): ICoreContext => {
        throw new Error();
        return core;
      }),
      error: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      })
    } as unknown as IPlugin;
    pluginManager.register(plugins);

    pluginManager.destroy();
    expect(pluginManager.pluginMap.size).toBe(0);
    expect(plugins.destroy).toHaveBeenCalled();
    expect(plugins.error).toHaveBeenCalled();
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
  });

  test("update error", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    expect(pluginManager.pluginMap.size).toBe(0);
  });

  test("update is not a function", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      name: 'plugin1',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      })
    } as unknown as IPlugin;

    pluginManager.register(plugins);
    expect(pluginManager.pluginMap.size).toBe(1);
  });
  test("update error", async () => {
    const core = new Core();
    const pluginManager = new PluginManager(console, core as unknown as ICoreContext);
    const plugins: IPlugin = {
      
      id: "",
      author: "",
      description: "",
      version: "",
      name: 'plugin1',
      install: vi.fn((core: ICoreContext): ICoreContext => {
        return core;
      }),
      update: vi.fn((core: ICoreContext): ICoreContext => {
        throw new Error;
      }),
      error: vi.fn((error): void => { }),
    }
    
    pluginManager.register(plugins);
    pluginManager.update();
    expect(pluginManager.pluginMap.size).toBe(1);
    expect(plugins.update).toHaveBeenCalled();
    expect(plugins.error).toHaveBeenCalled();
  })
});