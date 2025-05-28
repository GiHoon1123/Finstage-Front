// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given-When-Then 패턴

// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import {
  groupByViewMode,
  getLabelByViewMode,
} from "@/entities/incomeStatement";
import type { IncomeStatement, ViewMode } from "@/entities/incomeStatement";

describe("groupByViewMode", () => {
  let incomeStatement: IncomeStatement[];

  beforeEach(() => {
    incomeStatement = [
      {
        symbol: "CRCAT",
        id: 1,
        date: "2024-07-06",
        revenue: 912644200,
        cost_of_revenue: 864315607,
        gross_profit: 48328593,
        operating_income: 40504506,
        net_income: 38591549,
        eps: 8.826855560372177,
      },
      {
        symbol: "CRCAT",
        id: 2,
        date: "2024-02-12",
        revenue: 486221193,
        cost_of_revenue: 282984164,
        gross_profit: 203237029,
        operating_income: 109902477,
        net_income: 88783859,
        eps: 9.024574492593924,
      },
      {
        symbol: "CRCAT",
        id: 3,
        date: "2021-11-06",
        revenue: 679973640,
        cost_of_revenue: 466982872,
        gross_profit: 212990768,
        operating_income: 92428283,
        net_income: 75388644,
        eps: 3.3857926602476156,
      },
      {
        symbol: "CRCAT",
        id: 4,
        date: "2025-02-06",
        revenue: 475611941,
        cost_of_revenue: 408827121,
        gross_profit: 66784820,
        operating_income: 31833218,
        net_income: 21838276,
        eps: 8.140991555200921,
      },
      {
        symbol: "CRCAT",
        id: 5,
        date: "2024-07-14",
        revenue: 476283246,
        cost_of_revenue: 227010833,
        gross_profit: 249272413,
        operating_income: 171482270,
        net_income: 154996704,
        eps: 0.7736648204082144,
      },
    ];
  });

  it("연도별(annual)로 그룹화하면 연도 키 기준으로 묶인다", () => {
    const viewMode = "annual";

    const result = groupByViewMode(incomeStatement, viewMode);

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(["2021년", "2024년", "2025년"]),
    );
    expect(result["2024년"].length).toBe(3);
    expect(result).toEqual({
      "2021년": [incomeStatement[2]],
      "2024년": [incomeStatement[0], incomeStatement[1], incomeStatement[4]],
      "2025년": [incomeStatement[3]],
    });
  });

  it("분기별(quarterly)로 그룹화하면 '2024년 1분기 (3월)' 형식의 키를 생성한다", () => {
    const viewMode = "quarterly";

    const result = groupByViewMode(incomeStatement, viewMode);
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining([
        "2024년 1분기 (3월)",
        "2024년 3분기 (9월)",
        "2021년 4분기 (12월)",
        "2025년 1분기 (3월)",
      ]),
    );
  });

  it("월별(monthly)로 그룹화하면 'YYYY년 M월' 형식의 키를 생성한다", () => {
    const viewMode = "monthly";

    const result = groupByViewMode(incomeStatement, viewMode);

    expect(result["2024년 7월"]).toBeDefined();
    expect(result["2024년 2월"]).toBeDefined();
  });

  it("알 수 없는 viewMode가 주어졌을 때 월별로 처리된다", () => {
    const unknownViewMode = "other" as ViewMode;

    const result = groupByViewMode(incomeStatement, unknownViewMode);

    expect(result["2024년 7월"]).toBeDefined();
  });
});

describe("getLabelByViewMode", () => {
  it("annual 모드에서는 연도만 반환된다", () => {
    const date = "2024-07-06";
    const viewMode = "annual";
    const result = getLabelByViewMode(date, viewMode);
    expect(result).toBe("2024년");
  });

  it("quarterly 모드에서는 '2024년 3분기 (9월)' 형식으로 반환된다", () => {
    const date = "2024-07-06";
    const viewMode = "quarterly";
    const result = getLabelByViewMode(date, viewMode);
    expect(result).toBe("2024년 3분기 (9월)");
  });

  it("monthly 모드에서는 '2024년 7월' 형식으로 반환된다", () => {
    const date = "2024-07-06";
    const viewMode = "monthly";
    const result = getLabelByViewMode(date, viewMode);
    expect(result).toBe("2024년 7월");
  });
});
