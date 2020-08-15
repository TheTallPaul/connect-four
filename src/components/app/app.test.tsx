import React from "react";
import { render } from "@testing-library/react";

import App from ".";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render without crashing", () => {});
});
