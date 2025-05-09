"use client";

import { fetchIncomeStatementListToStore } from "../api/fetchIncomeStatementList";
import { fetchSymbolListToStore } from "../api/fetchSymbolList";
import { useSelectedCompany } from "../model/useSelectedCompany";
import { useSymbolListStore, useRecentSymbolStore } from "@/entities/symbol";
import { useState, useEffect, useRef } from "react";

export default function CompanySearchInput() {
  // 리스트 항목에 대한 참조
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  // 최근 검색 목록 상태 및 추가 함수
  const { recentSymbols, addRecentSymbol } = useRecentSymbolStore();
  // 선택된 회사 심볼 전역 상태 저장 함수
  const { setSelectedCompanyId } = useSelectedCompany();
  // 전체 심볼 목록
  const { symbolList } = useSymbolListStore();

  // 현재 입력된 검색어
  const [query, setQuery] = useState("");
  // 현재 선택된 리스트 인덱스
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // 검색어(query)를 기준으로 symbolList를 재구성
  const filtered = symbolList.filter(
    (symbolItem) =>
      symbolItem.name.toLowerCase().includes(query.toLowerCase()) ||
      symbolItem.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  // 컴포넌트 마운트 시 symbol 목록을 API호출
  useEffect(() => {
    // 중복 호출을 막기 위해 빈 배열일 때만 호출합니다.
    if (symbolList.length === 0) fetchSymbolListToStore();
  }, []);

  // 검색 결과가 있을 때만 첫 번째 항목을 선택하도록 초기화
  useEffect(() => {
    // 사용자가 방향키로 움직이고 있다면 유지되도록
    if (filtered.length > 0 && selectedIndex === -1) {
      setSelectedIndex(0);
    }

    if (filtered.length === 0) {
      setSelectedIndex(-1);
    }
  }, [filtered, selectedIndex]);

  //사용자가 방향키로 움직일때, 스크롤이 자동으로 내려감감
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // 검색 확정 처리 (Enter 또는 확인 버튼 또는 클릭 시 실행)
  const handleConfirm = async (display: string | null = null) => {
    let symbol = filtered[selectedIndex]?.symbol ?? "";
    const queryStr = display ?? query;

    // 리스트 선택이 없다면 query에서 symbol 추출 시도
    if (!symbol) {
      const match = queryStr.match(/\(([^)]+)\)$/);
      let typedSymbol = match?.[1].trim() ?? "";

      // 괄호 없이 입력한 경우 symbol처럼 해석
      if (!typedSymbol) {
        typedSymbol = queryStr.trim().toUpperCase();
      }

      // symbolList에서 유효한 symbol인지 확인
      const found = symbolList.find(
        (symbolItem) =>
          symbolItem.symbol.toUpperCase() === typedSymbol ||
          symbolItem.name.toLowerCase().includes(queryStr.toLowerCase()),
      );

      if (!found) {
        alert("정확한 회사를 선택하거나 입력해 주세요.");
        return;
      }

      symbol = found.symbol;
    }

    // 상태 저장 + 최근 검색 추가 + API 요청
    setSelectedCompanyId(symbol);
    addRecentSymbol(symbol);
    setLoading(true);
    await fetchIncomeStatementListToStore(symbol);
    setLoading(false);
  };

  // 키보드 ↑↓ 및 Enter 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        setQuery(
          `${filtered[selectedIndex].name} (${filtered[selectedIndex].symbol})`,
        );
      }
      handleConfirm();
    }
  };

  // 리스트 항목 클릭 처리
  const handleItemClick = (display: string, index: number) => {
    setQuery(display);
    setSelectedIndex(index);
    handleConfirm(display);
  };

  // 최근 검색 항목 클릭 처리
  const handleRecentClick = (symbol: string) => {
    const found = symbolList.find((symbolItem) => symbolItem.symbol === symbol);

    if (found) {
      const display = `${found.name} (${found.symbol})`;
      const findFilteredIndex = filtered.findIndex(
        (symbolItem) => symbolItem.symbol === symbol,
      );
      setQuery(display);
      setSelectedIndex(findFilteredIndex);
      handleConfirm(display);
    }
  };

  return (
    <div className="mb-4">
      {loading ? "조회 중..." : ""}
      {recentSymbols.length > 0 && (
        <div className="recent-container">
          <p className="recent-title">최근 검색:</p>
          <ul className="recent-list">
            {recentSymbols.map((symbol) => (
              <li
                key={symbol}
                className="recent-item"
                onClick={() => handleRecentClick(symbol)}
              >
                {symbol}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="border px-2 py-1 text-sm w-full"
          placeholder="회사명 또는 티커 검색..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {query && filtered.length > 0 && (
        <ul className="border mt-1 text-sm bg-white max-h-40 overflow-y-auto">
          {filtered.map((symbolItem, idx) => {
            const display = `${symbolItem.name} (${symbolItem.symbol})`;
            return (
              <li
                key={symbolItem.symbol}
                ref={idx === selectedIndex ? selectedItemRef : null}
                className={`px-2 py-1 cursor-pointer ${
                  idx === selectedIndex
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(display, idx)}
              >
                {display}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
