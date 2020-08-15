import { renderHook, act } from "@testing-library/react-hooks";

import { useGame } from ".";
import { GAME_SYMBOLS } from "constants/";

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
        ["", "", "", GAME_SYMBOLS.dark],
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
        ["", "", "", GAME_SYMBOLS.dark],
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

    //   it("should be set to true when the winner is reset", () => {
    //     const { result } = renderHook(() => useGame(4, 4));
    //     act(() => {
    //       result.current.setSquares([
    //         ["", "", "", ""],
    //         ["", DARK_SYMBOL, DARK_SYMBOL, ""],
    //         [LIGHT_SYMBOL, LIGHT_SYMBOL, LIGHT_SYMBOL, LIGHT_SYMBOL],
    //         [LIGHT_SYMBOL, DARK_SYMBOL, DARK_SYMBOL, DARK_SYMBOL],
    //       ]);
    //     });
    //     expect(result.current.winner).toBe(LIGHT_SYMBOL);

    //     act(() => {
    //       result.current.setWinner("");
    //     });
    //     expect(result.current.darkIsNext).toStrictEqual(true);
    //   });
    // });

    // describe("winner", () => {
    //   it("should default to an empty string", () => {
    //     const { result } = renderHook(() => useGame(4, 4));
    //     expect(result.current.winner).toBe("");
    //   });

    //   it("should display the dark piece as a winner when dark is in a winning state", () => {
    //     const { result } = renderHook(() => useGame(4, 4));
    //     expect(result.current.winner).toBe("");

    //     act(() => {
    //       result.current.setSquares([
    //         ["", "", "", ""],
    //         ["", "", "", ""],
    //         ["", LIGHT_SYMBOL, LIGHT_SYMBOL, LIGHT_SYMBOL],
    //         ["", DARK_SYMBOL, DARK_SYMBOL, DARK_SYMBOL],
    //       ]);
    //     });
    //     expect(result.current.winner).toBe("");

    //     act(() => {
    //       result.current.setSquares([
    //         ["", "", "", ""],
    //         ["", "", "", ""],
    //         ["", LIGHT_SYMBOL, LIGHT_SYMBOL, LIGHT_SYMBOL],
    //         ["", DARK_SYMBOL, DARK_SYMBOL, DARK_SYMBOL],
    //       ]);
    //     });
    //     expect(result.current.winner).toBe("");

    //     act(() => {
    //       result.current.handleSquareClick(3, 0);
    //     });
    //     expect(result.current.winner).toBe(DARK_SYMBOL);
    //   });

    //   it("should display the light piece as a winner when light is in a winning state", () => {
    //     const { result } = renderHook(() => useGame(4, 4));
    //     expect(result.current.winner).toBe("");

    //     act(() => {
    //       result.current.setSquares([
    //         ["", "", "", ""],
    //         ["", DARK_SYMBOL, DARK_SYMBOL, ""],
    //         [LIGHT_SYMBOL, LIGHT_SYMBOL, LIGHT_SYMBOL, LIGHT_SYMBOL],
    //         [LIGHT_SYMBOL, DARK_SYMBOL, DARK_SYMBOL, DARK_SYMBOL],
    //       ]);
    //     });
    //     expect(result.current.winner).toBe(LIGHT_SYMBOL);
    //   });
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
        ["", "", "", GAME_SYMBOLS.dark],
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
        [GAME_SYMBOLS.dark, "", "", ""],
      ]);

      act(() => {
        result.current.handleSquareClick(2, 0);
      });
      expect(result.current.squares).toStrictEqual([
        ["", "", "", ""],
        ["", "", "", ""],
        [GAME_SYMBOLS.light, "", "", ""],
        [GAME_SYMBOLS.dark, "", "", ""],
      ]);
    });
  });
});
