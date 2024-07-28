import { describe, test, expect } from "vitest";
import { EventManager } from "../core/manager/EventManager";
import { EventType } from "../core/types/enum";

describe("EventManager", () => {
  test("should register and emit events", () => {
    const eventManager = new EventManager(console);
    let eventTriggered = false;

    eventManager.on(EventType.PAUSE, () => {
      eventTriggered = true;
    });

    eventManager.emit(EventType.PAUSE);
    expect(eventTriggered).toBe(true);
  });

  test("should pass data to event listeners", () => {
    const eventManager = new EventManager(console);
    let eventData = null;

    eventManager.on(EventType.PAUSE, (data:any) => {
      eventData = data;
    });

    const testData = { message: "Paused" };
    eventManager.emit(EventType.PAUSE, testData);
    expect(eventData).toEqual(testData);
  });

  test("should support multiple listeners for the same event", () => {
    const eventManager = new EventManager(console);
    let firstListenerCalled = false;
    let secondListenerCalled = false;

    eventManager.on(EventType.PAUSE, () => {
      firstListenerCalled = true;
    });

    eventManager.on(EventType.PAUSE, () => {
      secondListenerCalled = true;
    });

    eventManager.emit(EventType.PAUSE);
    expect(firstListenerCalled).toBe(true);
    expect(secondListenerCalled).toBe(true);
  });

  test("should remove event listeners", () => {
    const eventManager = new EventManager(console);
    let eventTriggered = false;

    const listener = () => {
      eventTriggered = true;
    };

    eventManager.on(EventType.PAUSE, listener);
    eventManager.off(EventType.PAUSE, listener);
    eventManager.emit(EventType.PAUSE);
    expect(eventTriggered).toBe(false);
  });

  test("should not trigger listeners after they are removed", () => {
    const eventManager = new EventManager(console);
    let callCount = 0;

    const listener = () => {
      callCount++;
    };

    eventManager.on(EventType.PAUSE, listener);
    eventManager.emit(EventType.PAUSE);
    eventManager.off(EventType.PAUSE, listener);
    eventManager.emit(EventType.PAUSE);

    expect(callCount).toBe(1);
  });

  test("should handle events with no listeners gracefully", () => {
    const eventManager = new EventManager(console);

    // This should not throw an error or cause any issues
    eventManager.emit(EventType.PAUSE);
  });

  test("should not affect other listeners when removing one listener", () => {
    const eventManager = new EventManager(console);
    let firstListenerCalled = false;
    let secondListenerCalled = false;

    const firstListener = () => {
      firstListenerCalled = true;
    };
    const secondListener = () => {
      secondListenerCalled = true;
    };

    eventManager.on(EventType.PAUSE, firstListener);
    eventManager.on(EventType.PAUSE, secondListener);
    eventManager.off(EventType.PAUSE, firstListener);
    eventManager.emit(EventType.PAUSE);

    expect(firstListenerCalled).toBe(false);
    expect(secondListenerCalled).toBe(true);
  });
});
