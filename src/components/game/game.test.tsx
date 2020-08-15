import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import Game from ".";
import * as useGame from "./hooks/use-game";

const STATE_SPY = jest.spyOn(useGame, "default");
const CLICK_HANDLER = jest.fn();
const DIMENSION_HANDLER = jest.fn();

describe("Game", () => {
  beforeEach(() => {
    STATE_SPY.mockReturnValue({
      handleSquareClick: CLICK_HANDLER,
      dimensions: { numRows: 6, numCols: 7 },
      setDimensions: DIMENSION_HANDLER,
      squares: [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ],
      darkIsNext: true,
      winner: "",
    });

    render(<Game />);
  });

  it("should render without crashing", () => {});

  it("should handle a click on a legal square with the correct variables", () => {
    let bottomLeftSquare = screen.getByTestId("square-5-1");
    expect(bottomLeftSquare).toBeEnabled();
    act(() => {
      fireEvent.click(bottomLeftSquare);
    });
    expect(CLICK_HANDLER).toHaveBeenCalledWith(5, 1);
  });
});
