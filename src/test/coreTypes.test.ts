import { describe, expect, it } from "vitest";
import { CoreState, EventType } from "../core/types/enum";

describe('CoreState Enum', () => {
  it('should have unique CoreState values', () => {
    const values = Object.values(CoreState);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });
});

describe('EventType Enum', () => {
  it('should have unique EventType values', () => {
    const values = Object.values(EventType);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });
});
