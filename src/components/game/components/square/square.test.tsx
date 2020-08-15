import React from "react";
import { render } from "@testing-library/react";

import Square from ".";

describe("Square", () => {
  beforeEach(() => {
    render(<Square piece={""} onClick={() => {}} legal={true} id="" />);
  });

  it("should render without crashing", () => {});
});
