import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

import { useGame } from ".";
import { DarkSymbol, LightSymbol } from "styles/styles";

describe("useGame", () => {
  describe("squares", () => {
    it("should default to 2d array of empty strings", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ]);
    });

    it("should generate a new 2d array of empty strings when setDimensions is called", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ]);

      act(() => {
        result.current.handleSquareClick(3, 3);
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", DarkSymbol],
      ]);

      act(() => {
        result.current.setDimensions({ numRows: 4, numCols: 4 });
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ]);
    });

    it("should generate a new 2d array of empty strings when dimensions change", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ]);

      act(() => {
        result.current.handleSquareClick(3, 3);
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", DarkSymbol],
      ]);

      act(() => {
        result.current.setDimensions({ numRows: 5, numCols: 5 });
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ]);
    });
  });

  describe("dimensions", () => {
    it("should default to provided values", () => {
      const { result } = renderHook(() => useGame(6, 7));
      expect(result.current.dimensions).toStrictEqual({
        numRows: 6,
        numCols: 7,
      });
    });
  });

  describe("darkIsNext", () => {
    it("should default to true", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.darkIsNext).toBe(true);
    });

    it("should should be false after the first move is made", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.darkIsNext).toBe(true);
      act(() => {
        result.current.handleSquareClick(3, 3); // ⬤
      });
      expect(result.current.darkIsNext).toBe(false);
    });

    it("should be set to true when the winner is reset", () => {
      const { result } = renderHook(() => useGame(4, 4));
      act(() => {
        result.current.setSquares([
          ["", "", "", ""],
          ["", DarkSymbol, DarkSymbol, ""],
          [LightSymbol, LightSymbol, LightSymbol, LightSymbol],
          [LightSymbol, DarkSymbol, DarkSymbol, DarkSymbol],
        ]);
      });
      expect(result.current.winner).toBe(LightSymbol);

      act(() => {
        result.current.setWinner("");
      });
      expect(result.current.darkIsNext).toStrictEqual(true);
    });
  });

  describe("winner", () => {
    it("should default to an empty string", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.winner).toBe("");
    });

    it("should display the dark piece as a winner when dark is in a winning state", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.winner).toBe("");

      act(() => {
        result.current.setSquares([
          ["", "", "", ""],
          ["", "", "", ""],
          ["", LightSymbol, LightSymbol, LightSymbol],
          ["", DarkSymbol, DarkSymbol, DarkSymbol],
        ]);
      });
      expect(result.current.winner).toBe("");

      act(() => {
        result.current.setSquares([
          ["", "", "", ""],
          ["", "", "", ""],
          ["", LightSymbol, LightSymbol, LightSymbol],
          ["", DarkSymbol, DarkSymbol, DarkSymbol],
        ]);
      });
      expect(result.current.winner).toBe("");

      act(() => {
        result.current.handleSquareClick(3, 0);
      });
      expect(result.current.winner).toBe(DarkSymbol);
    });

    it("should display the light piece as a winner when light is in a winning state", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.winner).toBe("");

      act(() => {
        result.current.setSquares([
          ["", "", "", ""],
          ["", DarkSymbol, DarkSymbol, ""],
          [LightSymbol, LightSymbol, LightSymbol, LightSymbol],
          [LightSymbol, DarkSymbol, DarkSymbol, DarkSymbol],
        ]);
      });
      expect(result.current.winner).toBe(LightSymbol);
    });
  });

  describe("handleSquareClick", () => {
    it("should place a dark piece on the provided index", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ]);

      act(() => {
        result.current.handleSquareClick(3, 3);
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", DarkSymbol],
      ]);
    });
    it("should place a dark piece and then a light piece on the provided indices", () => {
      const { result } = renderHook(() => useGame(4, 4));
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ]);

      act(() => {
        result.current.handleSquareClick(3, 0);
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        [DarkSymbol, "", "", ""],
      ]);

      act(() => {
        result.current.handleSquareClick(2, 0);
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        [LightSymbol, "", "", ""],
        [DarkSymbol, "", "", ""],
      ]);
    });
  });
});
