import Core from '../core/index';
import { CoreState } from "../core/types/enum";
import { Howl } from 'howler';
import { expect, test, vi } from 'vitest'
import { IPlugin } from '../core/interface/IPluginManager';
import { PluginManager } from '../core/manager/PluginManager';
import { ViewManager } from '../core/manager/ViewManager';
// 测试 Core 类的构造函数
test('Core constructor', () => {
  const core = new Core();
  expect(core).toBeInstanceOf(Core);
  expect(core.state).toBe(CoreState.STOP);
  expect(core.howler).toBeInstanceOf(Howl);
  expect(core.pluginManager).toBeInstanceOf(PluginManager);
  expect(core.loggerManager).toBe(console)
  expect(core.viewManager).toBeInstanceOf(ViewManager);
});

// 测试 Core 类的 register 方法
test('Core register', () => {
  const core = new Core();
  const plugin:IPlugin = {
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
  const plugin2:IPlugin = {
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

// 测试 Core 类的 destroy 方法
test('Core destroy', () => {
  const core = new Core();
  core.destroy();
  expect(core.state).toBe(CoreState.STOP);
});

// 测试 Core 类的 run 方法
test('Core run', () => {
  const core = new Core();
  core.run();
  expect(core.howler).toBeInstanceOf(Howl);
});

// 测试 Core 类的 stop 方法
test('Core stop', () => {
  const core = new Core();
  core.stop();
  expect(core.state).toBe(CoreState.STOP);
});

// 测试 Core 类的 pause 方法
test('Core pause', () => {
  const core = new Core();
  core.pause();
  expect(core.state).toBe(CoreState.PAUSED);
});

// 测试 Core 类的 play 方法
test('Core play', () => {
  const core = new Core();
  console.log(111)
  core.play();
  console.log(core.state)
  expect(core.state).toBe(CoreState.PLAYING);
});

// 测试 Core 类的 update 方法
test('Core update', () => {
  // 创建 Core 实例
  const core = new Core();

  // 使用 vi.spyOn 创建 spy 函数监控 PluginManager 的 update 方法
  const updateSpy = vi.spyOn(core.pluginManager, 'update');

  // 调用 core.update()，它应该调用 pluginManager.update()
  core.update();

  // 断言 update 方法被调用
  expect(updateSpy).toHaveBeenCalled();
});

// 测试 Core 类的 load 方法
test('Core load', () => {
  const core = new Core();
  core.load();
  expect(core.state).toBe(CoreState.LOADING);
});
