// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계

import {
  calcSum,
  calcRatio,
  calcEPS,
} from "@/entities/incomeStatement/lib/calculations";
import type { IncomeStatement } from "@/entities/incomeStatement";

describe("calcSum", () => {
  it("숫자 필드의 합을 정확히 계산한다", () => {
    const list: IncomeStatement[] = [
      {
        revenue: 100,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: 2,
        date: "2024-01-01",
        id: 1,
        symbol: "AAA",
      },
      {
        revenue: 200,
        cost_of_revenue: 100,
        gross_profit: 100,
        operating_income: 50,
        net_income: 40,
        eps: 3,
        date: "2024-01-02",
        id: 2,
        symbol: "AAA",
      },
    ];

    const result = calcSum(list, "revenue");
    expect(result).toBe(300);
  });

  it("비정상적인 필드 값은 무시하고 합산한다", () => {
    const list = [
      {
        revenue: "abc" as unknown as number,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: 2,
        date: "2024-01-01",
        id: 1,
        symbol: "AAA",
      },
      {
        revenue: 200,
        cost_of_revenue: 100,
        gross_profit: 100,
        operating_income: 50,
        net_income: 40,
        eps: 3,
        date: "2024-01-02",
        id: 2,
        symbol: "AAA",
      },
    ];

    const result = calcSum(list, "revenue");
    expect(result).toBe(200);
  });
});

describe("calcRatio", () => {
  it("분자와 분모로 올바른 비율을 계산한다", () => {
    const numerator = 50;
    const denominator = 200;
    const result = calcRatio(numerator, denominator);
    expect(result).toBe("25.0%");
  });

  it("분모가 0일 경우 '-'를 반환한다", () => {
    const numerator = 50;
    const denominator = 0;
    const result = calcRatio(numerator, denominator);
    expect(result).toBe("-");
  });
});

describe("calcEPS", () => {
  it("EPS의 평균을 소수 둘째 자리까지 계산한다", () => {
    const list: IncomeStatement[] = [
      {
        revenue: 100,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: 4,
        date: "2024-01-01",
        id: 1,
        symbol: "AAA",
      },
      {
        revenue: 100,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: 6,
        date: "2024-01-02",
        id: 2,
        symbol: "AAA",
      },
    ];

    const result = calcEPS(list);
    expect(result).toBe("5.00");
  });

  it("빈 배열이 입력되면 '0.00'을 반환한다", () => {
    const result = calcEPS([]);
    expect(result).toBe("0.00");
  });

  it("eps 필드가 누락된 항목은 평균 계산에서 제외된다", () => {
    const list: IncomeStatement[] = [
      {
        revenue: 100,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: 4,
        date: "2024-01-01",
        id: 1,
        symbol: "AAA",
      },
      {
        revenue: 100,
        cost_of_revenue: 50,
        gross_profit: 50,
        operating_income: 30,
        net_income: 20,
        eps: undefined as unknown as number,
        date: "2024-01-02",
        id: 2,
        symbol: "AAA",
      },
    ];

    const result = calcEPS(list);
    expect(result).toBe("4.00");
  });
});
