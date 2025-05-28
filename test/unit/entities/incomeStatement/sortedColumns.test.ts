import { sortedColumns } from "@/entities/incomeStatement";
import type { IncomeStatement, SortOrder } from "@/entities/incomeStatement";

describe("sortedColumns", () => {
  let incomeStatement: IncomeStatement[];
  let grouped: Record<string, IncomeStatement[]>;

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

    grouped = {
      "2021년": [incomeStatement[2]],
      "2024년": [incomeStatement[0], incomeStatement[1], incomeStatement[4]],
      "2025년": [incomeStatement[3]],
    };
  });

  it("정렬 기준이 'desc'이면 가장 최근 연도가 먼저 온다", () => {
    const sortOrder: SortOrder = "desc";
    const result = sortedColumns(grouped, sortOrder);
    expect(result).toEqual(["2025년", "2024년", "2021년"]);
  });

  it("정렬 기준이 'asc'이면 가장 오래된 연도가 먼저 온다", () => {
    const sortOrder: SortOrder = "asc";
    const result = sortedColumns(grouped, sortOrder);
    expect(result).toEqual(["2021년", "2024년", "2025년"]);
  });

  it("정렬 기준이 유효하지 않은 경우 기본 오름차순으로 동작한다", () => {
    const sortOrder = "" as SortOrder;
    const result = sortedColumns(grouped, sortOrder);
    expect(result).toEqual(["2021년", "2024년", "2025년"]);
  });

  it("grouped가 빈 객체인 경우 빈 배열을 반환한다", () => {
    const result = sortedColumns({}, "asc");
    expect(result).toEqual([]);
  });

  it("각 label의 list가 하나의 날짜만 갖더라도 정상적으로 정렬된다", () => {
    const result = sortedColumns(grouped, "asc");
    expect(result.length).toBe(3);
    expect(result).toContain("2021년");
  });
});
