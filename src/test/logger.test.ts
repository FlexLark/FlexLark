import { describe, test, expect, vi } from "vitest";
import { LoggerManager } from "../core/manager/LoggerManager";

describe("LoggerManager", () => {
  test("constructor", () => {
    const logger = new LoggerManager();
    expect(logger).toBeInstanceOf(LoggerManager);
  })

  test("setLogger", () => {
    const logger = new LoggerManager();
    const newLogger = {
      log: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
      info: vi.fn()
    };

    logger.setLogger(newLogger);

    logger.log("test message");
    logger.error("test error");
    logger.warn("test warning");
    logger.debug("test debug message");
    logger.info("test info message");

    expect(newLogger.log).toHaveBeenCalled();
    expect(newLogger.error).toHaveBeenCalled();
    expect(newLogger.warn).toHaveBeenCalled();
    expect(newLogger.debug).toHaveBeenCalled();
    expect(newLogger.info).toHaveBeenCalled();
  });

  test("log", () => {
    const logger = new LoggerManager();
    const consoleLogSpy = vi.spyOn(console, 'log');

    logger.log("test message");

    expect(consoleLogSpy).toHaveBeenCalledWith("test message");
    consoleLogSpy.mockRestore();
  });

  test("error", () => {
    const logger = new LoggerManager();
    const consoleErrorSpy = vi.spyOn(console, 'error');

    logger.error("test error");

    expect(consoleErrorSpy).toHaveBeenCalledWith("test error");
    consoleErrorSpy.mockRestore();
  });

  test("warn", () => {
    const logger = new LoggerManager();
    const consoleWarnSpy = vi.spyOn(console, 'warn');

    logger.warn("test warning");

    expect(consoleWarnSpy).toHaveBeenCalledWith("test warning");
    consoleWarnSpy.mockRestore();
  })

  test("debug", () => { 
    const logger = new LoggerManager();
    const consoleDebugSpy = vi.spyOn(console, 'debug');

    logger.debug("test debug message");

    expect(consoleDebugSpy).toHaveBeenCalledWith("test debug message");
    consoleDebugSpy.mockRestore();
  })

  test("info", () => {
    const logger = new LoggerManager();
    const consoleInfoSpy = vi.spyOn(console, 'info');

    logger.info("test info message");

    expect(consoleInfoSpy).toHaveBeenCalledWith("test info message");
    consoleInfoSpy.mockRestore();
  })
});
