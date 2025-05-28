// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given-When-Then 패턴

// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { findSymbolDisplayAndIndex } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";

describe("findSymbolDisplayAndIndex", () => {
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

  it("symbol이 symbolList와 filtered 모두에 존재하면 display와 index를 반환한다", () => {
    const filtered = [symbolList[1], symbolList[0]];
    const symbol = "QARGD";

    const result = findSymbolDisplayAndIndex(symbolList, filtered, symbol);

    expect(result).toEqual({
      display: "Smitham, Greenholt and Hagenes Inc. (QARGD)",
      index: 1,
    });
  });

  it("symbol이 symbolList에는 존재하지만 filtered에는 없으면 index는 -1로 반환된다", () => {
    const filtered = [symbolList[1]]; // QARGD 없음
    const symbol = "QARGD";

    const result = findSymbolDisplayAndIndex(symbolList, filtered, symbol);

    expect(result).toEqual({
      display: "Smitham, Greenholt and Hagenes Inc. (QARGD)",
      index: -1,
    });
  });

  it("symbol이 symbolList에 존재하지 않으면 null을 반환한다", () => {
    const filtered = [symbolList[1], symbolList[0]];
    const symbol = "NOTFOUND";

    const result = findSymbolDisplayAndIndex(symbolList, filtered, symbol);

    expect(result).toBeNull();
  });
});
