import { render, screen } from "@testing-library/react";
import { LivePriceChart } from "../index";

const mockPriceSocket = jest.fn();

jest.mock("../model/usePriceSocket", () => ({
  usePriceSocket: () => mockPriceSocket,
}));

test("LivePriceChart가 정상 렌더링되어야 한다", () => {
  render(<LivePriceChart />);
  const chartContainer = screen.getByTestId("chart-container");
  expect(chartContainer).toBeInTheDocument();
});
