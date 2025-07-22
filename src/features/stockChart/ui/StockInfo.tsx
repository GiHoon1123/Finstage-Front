"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { tabHandlerEndpoint } from "../lib/tabHandlerEndpoint";
import type { Symbol } from "@/entities/symbol";
import Link from "next/link";

interface chartType {
  symbol: Symbol;
}

export default function ChartHeader({ symbol }: chartType) {
  console.log(symbol?.symbol);
  const router = useRouter();
  const segment = usePathname();
  console.log(segment);
  // const symbol = segment.split("/")[2];

  const handleConfirm = (domain: string) => {
    const p = segment.split("/");
    p.pop();
    const path = p.join("/") + "/" + domain;
    console.log(path);
    router.push(path);
  };

  return (
    <div className="stock-header">
      <div className="stock-header-top">
        <div className="stock-info">
          {/* <img src="/logo.png" alt="logo" className="stock-logo" /> */}
          <div>
            <div className="stock-name">
              {symbol?.symbol}{" "}
              <span className="stock-code">{symbol?.symbol}</span>
            </div>
            <div className="stock-price-info">
              <span className="stock-price">10,260원</span>
              <span className="stock-change up">+1,370원 (15.4%)</span>
              <span className="badge">실시간 주문 가능</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stock-tabs">
        <button className="tab active" onClick={() => handleConfirm("order")}>
          차트·호가
        </button>
        <button className="tab" onClick={() => handleConfirm("analytics")}>
          종목진단
        </button>
        <Link href={`/stocks/${symbol?.symbol}/order`}>홈</Link>
        <button className="tab">뉴스·공시</button>
        <button className="tab">거래현황</button>
        <button className="tab">커뮤니티</button>
      </div>
    </div>
  );
}
