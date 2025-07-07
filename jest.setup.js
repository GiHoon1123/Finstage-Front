// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
Object.defineProperty(window, "scrollTo", {
  writable: true,
  configurable: true,
  value: jest.fn(),
});
