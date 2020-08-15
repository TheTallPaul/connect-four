import React from "react";
import { render } from "@testing-library/react";

import Board from ".";

describe("Board", () => {
  beforeEach(() => {
    render(<Board squares={[[""]]} onClick={() => {}} winner={""} />);
  });

  it("should render without crashing", () => {});
});
