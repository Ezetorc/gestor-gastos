import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
