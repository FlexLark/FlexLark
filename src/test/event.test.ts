import { describe, test, expect, vi } from "vitest";
import { EventManager } from "../core/manager/EventManager";
import { EventType } from "../core/types/enum";


describe("EventManager", () => {
  test("emit", () => {
    const eventManager = new EventManager(console);
    const callback = vi.fn((args:any[]) => {
      expect(args).toBe("test");
    })
    eventManager.on(EventType.PLAY, callback);
    eventManager.emit(EventType.PLAY, "test");
    expect(callback).toHaveBeenCalled();
  });

  test("on", () => {
    const eventManager = new EventManager(console);
    const callback = vi.fn((args: any[]) => {
      expect(args).toBe("test");
    })

    eventManager.on(EventType.PLAY, callback);
    eventManager.emit(EventType.PLAY, "test");
    expect(callback).toHaveBeenCalled();
  });

  test("on error", () => {
    const eventManager = new EventManager(console);
    const callback = vi.fn(() => {
      throw new Error;
    });
    eventManager.on(EventType.PLAY, callback);
    expect(() => eventManager.emit(EventType.PLAY)).not.toThrowError();
  });

  test("off", () => {
    const eventManager = new EventManager(console);
    const callback = vi.fn((args: any[]) => {
      expect(args).toBe("test");
    })

    eventManager.on(EventType.PLAY, (args: any[]) => {
      expect(args).toBe("test");
    });

    eventManager.off(EventType.PLAY, callback);
    eventManager.emit(EventType.PLAY, "test");
    expect(callback).not.toHaveBeenCalled();
  });

  test("off", () => {
    const eventManager = new EventManager(console);
    const callback = vi.fn((args: any[]) => {
      expect(args).toBe("test");
    })

    eventManager.off(EventType.PLAY, callback);
    eventManager.emit(EventType.PLAY, "test");
    expect(callback).not.toHaveBeenCalled();
  });
});
