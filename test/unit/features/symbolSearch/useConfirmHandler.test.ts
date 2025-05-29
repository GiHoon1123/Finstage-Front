// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { renderHook } from "@testing-library/react";
import { useConfirmHandler } from "@/features/symbolSearch";
import { extractSymbolFromQuery } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";

// mock router.push
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// mock extractSymbolFromQuery
jest.mock("@/entities/symbol", () => ({
  ...jest.requireActual("@/entities/symbol"),
  extractSymbolFromQuery: jest.fn(),
}));

describe("useConfirmHandler", () => {
  const setFocused = jest.fn();
  const addRecentSymbol = jest.fn();
  const selectedIndex: number = 0;
  const filtered: Symbol[] = [];
  const symbolList: Symbol[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      lastsale: "$115.15",
      netchange: "2.34",
      pctchange: "-8.22%",
      volume: "948,707",
      marketCap: "4442955649",
      country: "Georgia",
      ipoyear: "2019",
      industry: "Jewelry",
      sector: "Ergonomic",
      url: "/market-activity/stocks/qargd",
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 심볼을 찾으면 router.push를 호출하고 최근 검색과 포커스를 업데이트한다", async () => {
    // Given
    const mockFound = { symbol: "AAPL", name: "Apple Inc." };
    (extractSymbolFromQuery as jest.Mock).mockReturnValue(mockFound);

    const { result } = renderHook(() =>
      useConfirmHandler(
        symbolList,
        filtered,
        selectedIndex,
        setFocused,
        addRecentSymbol,
      ),
    );

    // When
    await result.current.handleConfirm("AAPL");

    // Then
    expect(extractSymbolFromQuery).toHaveBeenCalledWith("AAPL", symbolList);
    expect(addRecentSymbol).toHaveBeenCalledWith("AAPL");
    expect(setFocused).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith("/stocks/AAPL/analytics");
  });

  it("심볼을 찾지 못하면 아무 동작도 하지 않는다", async () => {
    // Given
    (extractSymbolFromQuery as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() =>
      useConfirmHandler(
        symbolList,
        filtered,
        selectedIndex,
        setFocused,
        addRecentSymbol,
      ),
    );

    // When
    await result.current.handleConfirm("INVALID");

    // Then
    expect(addRecentSymbol).not.toHaveBeenCalled();
    expect(setFocused).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
