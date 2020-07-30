import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Settings from ".";

describe("Settings", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(
      <Settings dimensions={{ numRows: 6, numCols: 7 }} onSubmit={() => {}} />,
      div
    );
    unmountComponentAtNode(div);
  });
});
