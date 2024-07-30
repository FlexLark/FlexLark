import { describe, expect, test, vi } from "vitest";
import { ICoreContext } from "../core/interface/ICoreContext";
import { PlaylistManager } from "../core/manager/PlaylistManager";
import { ISong } from "../core/interface/ISong";

describe("PlaylistManager", () => {
  test("should add a new playlist", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);

    expect(playlistManager.getPlaylist().length).toBe(0);
    expect(Array.isArray(playlistManager.getPlaylist())).toBe(true);
    expect(playlistManager.getPlayIndex()).toBe(0);
    expect(playlistManager.isShuffled()).toBe(false);
  });

  test("should add a new playlist", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const songs: ISong[] = [
      {
        id: "1"
      } as ISong
    ]

    playlistManager.setPlaylist(songs);
    expect(playlistManager.getPlaylist()).toStrictEqual(songs);
  })
  test("should shuffle the playlist", () => {
    const ctx = {
      utils: {
        
      }
    } as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const songs: ISong[] = [
      {
        id: "1"
      } as ISong,
      {
        id: "2"
      } as ISong,
      {
        id: "3"
      } as ISong
    ]

    playlistManager.setPlaylist(songs);
    ctx.utils.shuffle = vi.fn()
      .mockImplementation((arr: any[]) => {
        return arr;
      });
    playlistManager.shuffle();
    expect(playlistManager.isShuffled()).toBe(true);
    playlistManager.unshuffle();
    expect(playlistManager.isShuffled()).toBe(false);
    ctx.utils.shuffle = 'test shuffle';
    playlistManager.shuffle();
    expect(playlistManager.isShuffled()).toBe(true);
    expect(playlistManager.getPlaylist()).toStrictEqual(songs);
  })
  test("should shuffle the playlist set shuffle", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const songs: ISong[] = [
      {
        id: "1"
      } as ISong,
      {
        id: "2"
      } as ISong,
      {
        id: "3"
      } as ISong
    ]

    playlistManager.setPlaylist(songs);
    
  })
  test("should play the next song", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const songs: ISong[] = [  
      {
        id: "1"
      } as ISong,
      {
        id: "2"
      } as ISong,
      {
        id: "3"
      } as ISong
    ]

    playlistManager.setPlaylist(songs);
    expect(playlistManager.getPlayIndex()).toBe(0);
    playlistManager.next();
    expect(playlistManager.getPlayIndex()).toBe(1);
    playlistManager.next();
    expect(playlistManager.getPlayIndex()).toBe(2);
    playlistManager.next();
    expect(playlistManager.getPlayIndex()).toBe(0);
    playlistManager.previous();
    expect(playlistManager.getPlayIndex()).toBe(2);
    playlistManager.previous();
    expect(playlistManager.getPlayIndex()).toBe(1);
    playlistManager.previous();
    expect(playlistManager.getPlayIndex()).toBe(0);
    playlistManager.setPlayIndex(2);
    expect(playlistManager.getPlayIndex()).toBe(2);
    playlistManager.setPlayIndex(5);
    expect(playlistManager.getPlayIndex()).toBe(2);
    playlistManager.setPlayIndex(-1);
    expect(playlistManager.getPlayIndex()).toBe(0);
  })

  test("should add a song", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const song = {
      id: "1"
    } as ISong;

    playlistManager.addSong(song);

    expect(playlistManager.getSong(song.id)).toStrictEqual(song);
    expect(playlistManager.getPlaylist()).toStrictEqual([song]);
    expect(playlistManager.getPlayIndex()).toBe(0);
    expect(playlistManager.isShuffled()).toBe(false);
  })

  test("should remove a song", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const song = {
      id: "1"
    } as ISong;

    playlistManager.addSong(song);
    playlistManager.removeSong(song.id);

    expect(playlistManager.getPlaylist()).toStrictEqual([]);
  })
  
  test("should clear the playlist", () => {
    const ctx = {} as ICoreContext;
    const playlistManager = new PlaylistManager(console, ctx);
    const song = {
      id: "1"
    } as ISong;

    playlistManager.addSong(song);
    expect(playlistManager.getPlaylist()).toStrictEqual([song]);
    playlistManager.clear();
    expect(playlistManager.getPlaylist()).toStrictEqual([]);
  })
});