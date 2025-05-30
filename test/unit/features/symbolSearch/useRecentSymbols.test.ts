// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계

import { renderHook, act } from "@testing-library/react";
import { useRecentSymbols } from "@/features/symbolSearch";

describe("useRecentSymbols", () => {
  let symbolList: string[];

  beforeEach(() => {
    symbolList = ["AAPL", "GOOG", "MSFT", "TSLA", "NVDA"];
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("초기 상태는 빈 배열이다", () => {
    const { result } = renderHook(() => useRecentSymbols());
    expect(result.current.recentSymbols).toEqual([]);
  });

  it("addRecentSymbol을 호출하면 최근 검색 목록에 추가된다", () => {
    const { result } = renderHook(() => useRecentSymbols());

    act(() => {
      result.current.addRecentSymbol(symbolList[0]);
    });

    expect(result.current.recentSymbols).toEqual(["AAPL"]);
  });

  it("동일한 심볼은 중복되지 않고 가장 앞으로 이동된다", () => {
    const { result } = renderHook(() => useRecentSymbols());

    act(() => {
      result.current.addRecentSymbol("AAPL");
      result.current.addRecentSymbol("GOOG");
      result.current.addRecentSymbol("AAPL");
    });

    expect(result.current.recentSymbols).toEqual(["AAPL", "GOOG"]);
  });

  it("최대 5개까지만 저장된다", () => {
    const { result } = renderHook(() => useRecentSymbols());

    act(() => {
      symbolList.forEach((s) => result.current.addRecentSymbol(s));
    });

    expect(result.current.recentSymbols).toEqual([
      "NVDA",
      "TSLA",
      "MSFT",
      "GOOG",
      "AAPL",
    ]);
  });

  it("5개가 이미 저장되어 있는 상태에서 새 심볼을 추가하면 가장 오래된 심볼이 제거된다", () => {
    const { result } = renderHook(() => useRecentSymbols());

    act(() => {
      // 먼저 5개 채움
      symbolList.forEach((s) => result.current.addRecentSymbol(s));
    });

    expect(result.current.recentSymbols).toEqual([
      "NVDA",
      "TSLA",
      "MSFT",
      "GOOG",
      "AAPL",
    ]);

    act(() => {
      result.current.addRecentSymbol("FOMC"); // 새 항목 추가
    });

    // Then: 가장 오래된 A는 제거되고 F가 가장 앞에 추가됨
    expect(result.current.recentSymbols).toEqual([
      "FOMC",
      "NVDA",
      "TSLA",
      "MSFT",
      "GOOG",
    ]);
  });

  it("clearRecentSymbols를 호출하면 리스트가 초기화된다", () => {
    const { result } = renderHook(() => useRecentSymbols());

    act(() => {
      result.current.addRecentSymbol("AAPL");
      result.current.clearRecentSymbols();
    });

    expect(result.current.recentSymbols).toEqual([]);
  });

  it("clearRecentSymbols는 localStorage에서도 값을 제거한다", () => {
    const spy = jest.spyOn(Storage.prototype, "removeItem");

    const { result } = renderHook(() => useRecentSymbols());

    act(() => {
      result.current.clearRecentSymbols();
    });

    expect(spy).toHaveBeenCalledWith("recent-symbols");
  });
});
