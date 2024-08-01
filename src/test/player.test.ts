import { describe, expect, test, vi } from "vitest";
import { PlayerManager } from "../core/manager/PlayerManager";
import { PlaylistManager } from "../core/manager/PlaylistManager";
import { ICoreContext } from "../core/interface/ICoreContext";
import { ModeType } from "../core/types/ModeType";
import { CoreState } from "../core/types/enum";

describe("Player", () => {
  test("new", () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);

    expect(player).toBeInstanceOf(PlayerManager);
  });
  test("load", () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);
    const song = {
      id: "1",
      name: "song1",
      url: "./song-src/song01.wav",
    } as any;
    player.load();
    expect(player.howlOptions.src).toStrictEqual([""]);
    player.song = song;
    player.load();
    expect(player.howlOptions.src).toStrictEqual([song.url]);
  })
  test("play", () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);
    const song = {
      id: "1",
      name: "song1",
      url: "./song-src/song01.wav",
    } as any;
    expect(player.getState()).toBe(CoreState.STOP);
    player.play();
    expect(player.getState()).toBe(CoreState.STOP);
    player.load = vi.fn(player.load);
    player.play(song);
    expect(player.load).toBeCalled();
    expect(player.getState()).toBe(CoreState.PLAYING);
  });
  test("pause", () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);
    const song = {
      id: "1",
      name: "song1",
      url: "./song-src/song01.wav",
    } as any;
    player.play(song);
    expect(player.getState()).toBe(CoreState.PLAYING);
    player.pause();
    expect(player.getState()).toBe(CoreState.PAUSED);
  })
  test("stop", () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);
    const song = {
      id: "1",
      name: "song1",
      url: "./song-src/song01.wav",
    } as any;
    player.play(song);
    expect(player.getState()).toBe(CoreState.PLAYING);
    player.stop();
    expect(player.getState()).toBe(CoreState.STOP);
  })
  test("mode", () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);

    expect(player.getMode()).toBe(ModeType.LOOP);
    player.setMode(ModeType.LOOP_ONE);
    expect(player.getMode()).toBe(ModeType.LOOP_ONE);
    player.setMode("error" as any);
    expect(player.getMode()).toBe(ModeType.LOOP_ONE);
  })
  test('destroy', () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);
    const song = {
      id: "1",
      name: "song1",
      url: "./song-src/song01.wav",
    } as any;
    player.play(song);

    if (!player.howler) expect.fail();
    const stop = vi.fn(player.howler.stop as any);
    const unload = vi.fn(player.howler.unload as any);
    player.howler.stop = stop;
    player.howler.unload = unload;
    player.destroy();
    
    expect(player.getState()).toBe(CoreState.STOP);
    expect(stop).toBeCalled();
    expect(unload).toBeCalled();
  })

  test('seek', () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);

    const song = {
      id: "1",
      name: "song1",
      url: "./song-src/song01.wav",
    } as any;
    player.play(song);

    if (!player.howler) expect.fail();

    player.howler.seek = vi.fn(player.howler.seek as any);
    player.seek(6);
    expect(player.howler.seek).toBeCalled();
    expect(player.getSeek()).toBe(player.howler.seek());
    player.howler.seek = vi.fn((() => {
      return undefined;
    }) as any);
    player.seek(6);
    expect(player.getSeek()).toBe(0);
  })

  test('volume', () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);

    const volume = 30;
    player.setVolume(volume);
    expect(player.getVolume()).toBe(volume);
    player.setVolume(101);
    expect(player.getVolume()).toBe(100);
    player.setVolume(-1);
    expect(player.getVolume()).toBe(0);
    player.setVolume(50);
    expect(player.getVolume()).toBe(50);
  });

  test('options', () => {
    const ctx = {} as ICoreContext;
    const player = new PlayerManager(console, ctx);
    const options = {
      src: [""],
      loop: true,
      volume: 0.5,
      rate: 1.5,
    } as any;
    player.setOptions(options);
    expect(player.getOptions()).toEqual(options);
    player.setOptions({} as any);
    expect(player.getOptions()).toEqual(options);
  })
})