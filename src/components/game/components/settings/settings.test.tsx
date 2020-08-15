import React from "react";
import { render } from "@testing-library/react";

import Settings from ".";

describe("Settings", () => {
  beforeEach(() => {
    render(
      <Settings dimensions={{ numRows: 6, numCols: 7 }} onSubmit={() => {}} />
    );
  });

  it("should render without crashing", () => {});
});
