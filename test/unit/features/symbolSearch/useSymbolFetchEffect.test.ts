// useSymbolFetchEffect.test.ts
import { renderHook } from "@testing-library/react";
import { useSymbolFetchEffect } from "@/features/symbolSearch";
import { fetchSymbolListToStore } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";

// fetch 함수 모킹
jest.mock("@/entities/symbol", () => ({
  ...jest.requireActual("@/entities/symbol"),
  fetchSymbolListToStore: jest.fn(),
}));

describe("useSymbolFetchEffect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("symbolList가 비어 있을 경우 fetchSymbolListToStore를 호출한다", () => {
    // Given
    const symbolList: Symbol[] = [];

    // When
    renderHook(() => useSymbolFetchEffect(symbolList));

    // Then
    expect(fetchSymbolListToStore).toHaveBeenCalledTimes(1);
  });

  it("symbolList가 이미 존재하면 fetchSymbolListToStore를 호출하지 않는다", () => {
    // Given
    const symbolList = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        lastsale: "$150.00",
        netchange: "+1.23",
        pctchange: "+0.82%",
        volume: "1,234,567",
        marketCap: "2400000000000",
        country: "USA",
        ipoyear: "1980",
        industry: "Technology",
        sector: "Electronics",
        url: "/stocks/aapl",
      },
    ];

    // When
    renderHook(() => useSymbolFetchEffect(symbolList));

    // Then
    expect(fetchSymbolListToStore).not.toHaveBeenCalled();
  });
});
