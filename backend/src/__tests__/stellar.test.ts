import { describe, it, expect } from '@jest/globals';
import { toStroops, fromStroops } from "../utils/stellar.js";

describe("Stellar Utilities", () => {
  describe("toStroops", () => {
    it("should convert integer amounts correctly", () => {
      expect(toStroops(100)).toBe(1000000000n);
    });

    it("should convert decimal amounts correctly", () => {
      expect(toStroops(100.5)).toBe(1005000000n);
      expect(toStroops("0.0000001")).toBe(1n);
    });

    it("should handle strings correctly", () => {
      expect(toStroops("100")).toBe(1000000000n);
    });
  });

  describe("fromStroops", () => {
    it("should convert stroops to human readable numbers", () => {
      expect(fromStroops(1000000000n)).toBe(100);
      expect(fromStroops("1005000000")).toBe(100.5);
    });
  });
});