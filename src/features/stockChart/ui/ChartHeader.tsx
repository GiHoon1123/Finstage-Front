"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ChartSymbolWidget from "./ChartSymbolWidget";

export default function ChartHeader() {
  const router = useRouter();
  const segment = usePathname();

  const handleConfirm = (domain: string) => {
    const p = segment.split("/");
    p.pop();
    const path = p.join("/") + "/" + domain;
    router.push(path);
  };

  return (
    <div>
      <ChartSymbolWidget />
      <div className="stock-header">
        <div className="stock-tabs">
          <button className="tab active" onClick={() => handleConfirm("order")}>
            차트·호가
          </button>
          <button className="tab" onClick={() => handleConfirm("analytics")}>
            종목진단
          </button>
          <button className="tab">뉴스·공시</button>
          <button className="tab">거래현황</button>
          <button className="tab">커뮤니티</button>
        </div>
      </div>
    </div>
  );
}
