// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given-When-Then 패턴

// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { filterSymbolsByQuery } from "../lib/filterSymbolsByQuery";
import type { Symbol } from "@/entities/symbol";

describe("filterSymbolsByQuery", () => {
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

  it("공백 문자열이 주어지면 전체 symbolList를 그대로 반환한다", () => {
    const query = "  ";

    const result = filterSymbolsByQuery(symbolList, query);

    expect(result).toEqual({ filtered: symbolList });
  });

  it("심볼 일부가 포함된 query를 입력하면 해당 symbol을 필터링한다", () => {
    const query = "QARG";

    const result = filterSymbolsByQuery(symbolList, query);

    expect(result).toEqual({ filtered: [symbolList[0]] });
  });

  it("회사 이름 일부가 포함된 query를 입력하면 해당 symbol을 필터링한다", () => {
    const query = "Smitham";

    const result = filterSymbolsByQuery(symbolList, query);

    expect(result).toEqual({ filtered: [symbolList[0]] });
  });

  it("query가 소문자여도 대소문자 구분 없이 심볼을 필터링한다", () => {
    const query = "qargd";

    const result = filterSymbolsByQuery(symbolList, query);

    expect(result).toEqual({ filtered: [symbolList[0]] });
  });

  it("query가 아무 항목과도 일치하지 않으면 빈 배열을 반환한다", () => {
    const query = "없는심볼";

    const result = filterSymbolsByQuery(symbolList, query);

    expect(result).toEqual({ filtered: [] });
  });
});
