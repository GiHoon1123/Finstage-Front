// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계

import {
  fetchIncomeStatementListToStore,
  useIncomeStatementListStore,
} from "@/entities/incomeStatement";
import type { IncomeStatement } from "@/entities/incomeStatement";

describe("fetchIncomeStatementListToStore", () => {
  beforeEach(() => {
    useIncomeStatementListStore.setState({ incomeStatementList: [] }); // Store 초기화
    jest.restoreAllMocks(); // Mock 초기화
  });

  it("symbol 값을 기반으로 fetch를 요청하면 응답 데이터를 store에 저장한다", async () => {
    // Given
    const symbol = "CRCAT";
    const mockData: IncomeStatement[] = [
      {
        symbol: "CRCAT",
        id: 1,
        date: "2024-07-06",
        revenue: 100,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: 2,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as jest.Mock;

    // When
    const result = await fetchIncomeStatementListToStore(symbol);

    // Then
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:4000/api/income/${symbol}`,
    );
    expect(useIncomeStatementListStore.getState().incomeStatementList).toEqual(
      mockData,
    );
    expect(result).toBe(true);
  });

  it("API 에러 발생 시 false를 반환하고 콘솔 에러를 출력한다", async () => {
    // Given
    const symbol = "CRCAT";
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // When
    const result = await fetchIncomeStatementListToStore(symbol);

    // Then
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch income statements",
      expect.any(Error),
    );
    expect(result).toBe(false);
  });
});
