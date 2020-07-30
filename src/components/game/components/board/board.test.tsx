import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Board from ".";

describe("Board", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Board squares={[[""]]} onClick={() => {}} winner={""} />, div);
    unmountComponentAtNode(div);
  });
});
