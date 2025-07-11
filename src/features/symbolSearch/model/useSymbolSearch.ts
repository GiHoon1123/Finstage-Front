import { useState, useRef, RefObject } from "react";
import {
  useSymbolListStore,
  filterSymbolsByQuery,
  findSymbolDisplayAndIndex,
} from "@/entities/symbol";
import { useSymbolFetchEffect } from "./useSymbolFetchEffect";
import { useSelectionLogic } from "./useSelectionLogic";
import { useAutoScrollEffect } from "./useAutoScrollEffect";
import { useConfirmHandler } from "./useConfirmHandler";
import { useRecentSymbols } from "./useRecentSymbol";
import { useFreezeBodyScroll } from "./useFreezeBodyScroll";

export function useSymbolSearch() {
  // 입력 상태 및 로딩 상태
  const [query, setQuery] = useState("");

  // 화면 포커싱 유무
  const [focused, setFocused] = useState(false);

  // symbol 목록
  const { symbolList } = useSymbolListStore();

  // 입력값에 대한 필터된 목록
  const { filtered } = filterSymbolsByQuery(symbolList, query);

  // 최근 검색 목록
  const { recentSymbols, addRecentSymbol } = useRecentSymbols();

  // 리스트 선택 인덱스 관리
  const { selectedIndex, setSelectedIndex } = useSelectionLogic(filtered);

  // 포커싱시 body 스크롤 제거 및 복구
  useFreezeBodyScroll(focused);

  // 리스트 항목 자동 스크롤
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  useAutoScrollEffect(selectedItemRef as RefObject<HTMLElement>, selectedIndex);

  // 초기 symbolList 요청
  useSymbolFetchEffect(symbolList);

  // 확인 핸들러
  const { handleConfirm } = useConfirmHandler(
    symbolList,
    filtered,
    selectedIndex,
    setFocused,
    addRecentSymbol,
  );

  // 키보드 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        const selectedSymbol = filtered[selectedIndex].symbol;
        setQuery(selectedSymbol);
        handleConfirm(selectedSymbol);
      }
    }
  };

  // 리스트 항목 클릭
  const handleItemClick = (symbol: string, index: number) => {
    setQuery(symbol);
    setSelectedIndex(index);
    handleConfirm(symbol);
  };

  // 최근 검색 클릭
  const handleRecentClick = (symbol: string) => {
    const result = findSymbolDisplayAndIndex(symbolList, filtered, symbol);
    if (!result) return;
    setQuery(symbol);
    setSelectedIndex(result.index);
    handleConfirm(symbol);
  };

  return {
    query,
    setQuery,
    filtered,
    focused,
    setFocused,
    selectedIndex,
    setSelectedIndex,
    selectedItemRef,
    recentSymbols,
    handleKeyDown,
    handleItemClick,
    handleRecentClick,
  };
}
