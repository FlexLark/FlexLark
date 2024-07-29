import Core from '../core/index';
import { CoreState } from "../core/types/enum";
import { Howl } from 'howler';
import { describe, expect, test, vi } from 'vitest'
import { IPlugin } from '../core/interface/IPlugin';
import { PluginManager } from '../core/manager/PluginManager';
import { ViewManager } from '../core/manager/ViewManager';

describe("Core", () => {
  test('constructor', () => {
    const core = new Core();
    expect(core).toBeInstanceOf(Core);
    expect(core.state).toBe(CoreState.STOP);
    expect(core.howler).toBeInstanceOf(Howl);
    expect(core.pluginManager).toBeInstanceOf(PluginManager);
    expect(core.loggerManager).toBe(console)
    expect(core.viewManager).toBeInstanceOf(ViewManager);
  });


  test('register', () => {
    const core = new Core();
    const plugin: IPlugin = {
      id: 'test',
      name: 'test',
      description: 'test',
      version: '1.0.0',
      author: 'test',
      install: function (core: Core): Core {
        console.log('install');
        return core;
      }
    };
    const plugin2: IPlugin = {
      id: 'test2',
      name: 'test2',
      description: 'test',
      version: '1.0.0',
      author: 'test',
      priority: 0,
      install: function (core: Core): Core {
        console.log('install');
        return core;
      }
    };
    core.register(plugin);
    core.register(plugin2);

    expect(core.pluginManager.plugins.length).toBe(2);
    expect(core.pluginManager.pluginMap.get('test2')).toBe(plugin2);
    expect(core.pluginManager.pluginMap.get('test')).toBe(plugin);
    expect(core.pluginManager.plugins[0]).toBe(plugin2);
    expect(core.pluginManager.plugins[1]).toBe(plugin);
  });


  test('destroy', () => {
    const core = new Core();
    core.destroy();
    expect(core.state).toBe(CoreState.STOP);
  });


  test('run', () => {
    const core = new Core();
    core.run();
    expect(core.howler).toBeInstanceOf(Howl);
  });

  test('stop', () => {
    const core = new Core();
    core.stop();
    expect(core.state).toBe(CoreState.STOP);
  });


  test('pause', () => {
    const core = new Core();
    core.pause();
    expect(core.state).toBe(CoreState.PAUSED);
  });

  test('play', () => {
    const core = new Core();
    core.play();
    expect(core.state).toBe(CoreState.PLAYING);
  });

  test('update', () => {
    const core = new Core();
    const updateSpy = vi.spyOn(core.pluginManager, 'update');

    core.update();
    expect(updateSpy).toHaveBeenCalled();
  });

  test('load', () => {
    const core = new Core();
    core.load();
    expect(core.state).toBe(CoreState.LOADING);
  });
})
