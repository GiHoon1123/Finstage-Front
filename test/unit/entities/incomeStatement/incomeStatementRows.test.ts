// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { incomeStatementRows } from "@/entities/incomeStatement";
import type { IncomeStatement } from "@/entities/incomeStatement";

describe("incomeStatementRows", () => {
  let incomeStatement: IncomeStatement[];

  beforeEach(() => {
    incomeStatement = [
      {
        symbol: "CRCAT",
        id: 1,
        date: "2024-07-06",
        revenue: 1000,
        cost_of_revenue: 300,
        gross_profit: 700,
        operating_income: 400,
        net_income: 200,
        eps: 5,
      },
      {
        symbol: "CRCAT",
        id: 2,
        date: "2024-08-06",
        revenue: 2000,
        cost_of_revenue: 500,
        gross_profit: 1500,
        operating_income: 800,
        net_income: 300,
        eps: 10,
      },
    ];
  });

  it("매출액을 모두 더한 값을 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "매출액");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe(3000);
  });

  it("매출원가를 모두 더한 값을 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "매출원가");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe(800);
  });

  it("매출총이익을 모두 더한 값을 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "매출총이익");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe(2200);
  });

  it("영업이익을 모두 더한 값을 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "영업이익");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe(1200);
  });

  it("영업이익률을 백분율로 계산하여 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "영업이익률");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe("40.0%");
  });

  it("순이익을 모두 더한 값을 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "순이익");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe(500);
  });

  it("순이익률을 백분율로 계산하여 반환한다", () => {
    const row = incomeStatementRows().find((r) => r.label === "순이익률");
    const result = row?.getValue(incomeStatement);
    expect(result).toBe("16.7%");
  });

  it("주당순이익(EPS)의 평균값을 반환한다", () => {
    const row = incomeStatementRows().find(
      (r) => r.label === "주당순이익(EPS)",
    );
    const result = row?.getValue(incomeStatement);
    expect(result).toBe("7.50");
  });

  it("입력 데이터가 비어 있는 경우 EPS는 NaN이 아닌 '0.00'을 반환한다", () => {
    const row = incomeStatementRows().find(
      (r) => r.label === "주당순이익(EPS)",
    );
    const result = row?.getValue([]);
    expect(result).toBe("0.00");
  });
});
