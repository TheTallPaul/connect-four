import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Square from ".";

describe("Square", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Square piece={""} onClick={() => {}} legal={true} />, div);
    unmountComponentAtNode(div);
  });
});
