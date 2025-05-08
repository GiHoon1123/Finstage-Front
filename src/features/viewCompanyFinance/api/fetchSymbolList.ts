import { useSymbolListStore } from "@/entities/symbol";
// import { Symbol } from "@/entities/symbol";

// 모킹된 임시 데이터
const data = [
  {
    symbol: "AACB",
    name: "Artius II Acquisition Inc. Class A Ordinary Shares",
    lastsale: "$9.99",
    netchange: "0.00",
    pctchange: "0.00%",
    volume: "52307",
    marketCap: "0.00",
    country: "United States",
    ipoyear: "2025",
    industry: "",
    sector: "",
    url: "/market-activity/stocks/aacb",
  },
];

export async function fetchSymbolListToStore() {
  const { setSymbolList } = useSymbolListStore.getState();

  try {
    // // 실제 API가 생기면 아래로 교체
    // const res = await fetch("/api/symbols");
    // const data: Symbol[] = await res.json();
    setSymbolList(data);
  } catch (e) {
    console.error("Failed to fetch symbol list", e);
  }
}
