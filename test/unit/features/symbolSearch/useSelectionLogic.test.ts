// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계

import { renderHook, act } from "@testing-library/react";
import { useSelectionLogic } from "@/features/symbolSearch";
import type { Symbol } from "@/entities/symbol";

describe("useSelectionLogic", () => {
  let symbolList: Symbol[];

  beforeEach(() => {
    symbolList = [
      {
        symbol: "QARGD",
        name: "Smitham, Greenholt and Hagenes Inc.",
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
      {
        symbol: "CVEHH",
        name: "Stracke, Hammes and Murazik Inc.",
        lastsale: "$410.39",
        netchange: "-2.46",
        pctchange: "0.57%",
        volume: "744,775",
        marketCap: "340726441",
        country: "Liberia",
        ipoyear: "2016",
        industry: "Kids",
        sector: "Frozen",
        url: "/market-activity/stocks/cvehh",
      },
    ];
  });

  it("filtered가 비어 있으면 selectedIndex는 -1이어야 한다", () => {
    // Given
    const filtered: Symbol[] = [];

    // When
    const { result } = renderHook(() => useSelectionLogic(filtered));

    // Then
    expect(result.current.selectedIndex).toBe(-1);
  });

  it("filtered가 있고 selectedIndex가 -1이면 0으로 초기화된다", () => {
    // Given
    const initialProps = { filtered: [] as Symbol[] };
    const { result, rerender } = renderHook(
      (props: { filtered: Symbol[] }) => useSelectionLogic(props.filtered),
      { initialProps },
    );

    //(초기 상태)
    expect(result.current.selectedIndex).toBe(-1);

    // When (filtered 업데이트)
    rerender({ filtered: symbolList });

    // Then
    expect(result.current.selectedIndex).toBe(0);
  });

  it("filtered가 다시 빈 배열이 되면 selectedIndex는 -1로 재설정된다", () => {
    // Given
    const { result, rerender } = renderHook(
      (props: { filtered: Symbol[] }) => useSelectionLogic(props.filtered),
      { initialProps: { filtered: symbolList } },
    );

    expect(result.current.selectedIndex).toBe(0);

    // When
    rerender({ filtered: [] });

    // Then
    expect(result.current.selectedIndex).toBe(-1);
  });

  it("selectedIndex를 직접 수정할 수 있다", () => {
    // Given
    const { result } = renderHook(() =>
      useSelectionLogic([symbolList[0], symbolList[1]]),
    );

    // When
    act(() => {
      result.current.setSelectedIndex(1);
    });

    // Then
    expect(result.current.selectedIndex).toBe(1);
  });
});
