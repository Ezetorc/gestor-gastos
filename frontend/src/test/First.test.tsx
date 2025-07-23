import First from "../components/First";
import { render } from "@testing-library/react";
import { expect } from "vitest";

describe("First test", () => {
  it("Should render component", () => {
    render(<First />);
  });
  expect(true).toBeTruthy();
});
