// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given-When-Then 패턴

// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { extractSymbolFromQuery } from "../lib/extractSymbolFromQuery";
import type { Symbol } from "@/entities/symbol";

describe("extractSymbolFromQuery", () => {
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

  it("query가 심볼만 입력된 경우 정확히 일치하는 symbol을 반환한다", () => {
    const query = "QARGD";

    const result = extractSymbolFromQuery(query, symbolList);

    expect(result).toEqual(symbolList[0]);
  });

  it("query에 괄호로 감싼 심볼이 포함된 경우 해당 심볼로 매칭된 symbol을 반환한다", () => {
    const query = "삼성전자 (CVEHH)";

    const result = extractSymbolFromQuery(query, symbolList);

    expect(result).toEqual(symbolList[1]);
  });

  it("query가 소문자로 입력되더라도 대소문자 구분 없이 매칭된 symbol을 반환한다", () => {
    const query = "qargd";

    const result = extractSymbolFromQuery(query, symbolList);

    expect(result).toEqual(symbolList[0]);
  });

  it("query가 회사 이름 일부를 포함하면 해당 symbol을 반환한다", () => {
    const query = "Smitham";

    const result = extractSymbolFromQuery(query, symbolList);

    expect(result).toEqual(symbolList[0]);
  });

  it("query가 어떤 심볼이나 이름과도 일치하지 않으면 null을 반환한다", () => {
    const query = "없는심볼";

    const result = extractSymbolFromQuery(query, symbolList);

    expect(result).toBeNull();
  });
});
