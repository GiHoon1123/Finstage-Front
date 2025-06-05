import { renderHook, act } from "@testing-library/react";
import {
  useConfirmHandler,
  useRecentSymbols,
  useSelectionLogic,
  useSymbolSearch,
} from "@/features/symbolSearch";
import {
  useSymbolListStore,
  filterSymbolsByQuery,
  findSymbolDisplayAndIndex,
} from "@/entities/symbol";

jest.mock("@/entities/symbol", () => ({
  useSymbolListStore: jest.fn(),
  filterSymbolsByQuery: jest.fn(),
  findSymbolDisplayAndIndex: jest.fn(),
}));
jest.mock("@/features/symbolSearch/model/useSymbolFetchEffect", () => ({
  useSymbolFetchEffect: jest.fn(),
}));
jest.mock("@/features/symbolSearch/model/useSelectionLogic", () => ({
  useSelectionLogic: jest.fn(),
}));
jest.mock("@/features/symbolSearch/model/useAutoScrollEffect", () => ({
  useAutoScrollEffect: jest.fn(),
}));
jest.mock("@/features/symbolSearch/model/useConfirmHandler", () => ({
  useConfirmHandler: jest.fn(),
}));
jest.mock("@/features/symbolSearch/model/useRecentSymbol", () => ({
  useRecentSymbols: jest.fn(),
}));

const setupDefaultMocks = ({
  selectedIndex = 0,
  filtered = [{ symbol: "AAPL" }, { symbol: "GOOG" }, { symbol: "CVEHH" }],
} = {}) => {
  (useSymbolListStore as unknown as jest.Mock).mockReturnValue({
    symbolList: filtered,
  });
  (filterSymbolsByQuery as jest.Mock).mockReturnValue({
    filtered,
  });
  (findSymbolDisplayAndIndex as jest.Mock).mockReturnValue({ index: 1 });
  (useConfirmHandler as jest.Mock).mockReturnValue({
    handleConfirm: jest.fn(),
  });
  (useSelectionLogic as jest.Mock).mockReturnValue({
    selectedIndex,
    setSelectedIndex: jest.fn(),
  });
  (useRecentSymbols as jest.Mock).mockReturnValue({
    recentSymbols: ["AAPL", "GOOG"],
    addRecentSymbol: jest.fn(),
  });
};

const createMockEvent = (key: string) =>
  ({
    key,
    preventDefault: jest.fn(),
  } as unknown as React.KeyboardEvent<HTMLInputElement>);

describe("useSymbolSearch", () => {
  beforeEach(() => {
    setupDefaultMocks();
  });

  it("변경 가능한 상태들을 업데이트할 수 있다", () => {
    const { result } = renderHook(() => useSymbolSearch());
    act(() => {
      result.current.setFocused(true);
      result.current.setQuery("TSLA");
      result.current.setSelectedIndex(2);
    });

    expect(result.current.focused).toBe(true);
    expect(result.current.query).toBe("TSLA");
  });

  describe("키보드 입력 이벤트", () => {
    it("ArrowDown 키는 selectedIndex를 증가시킨다", () => {
      const mockSetSelectedIndex = jest.fn((cb) => {
        expect(cb(1)).toBe(2); // max: 2
      });

      (useSelectionLogic as jest.Mock).mockReturnValue({
        selectedIndex: 1,
        setSelectedIndex: mockSetSelectedIndex,
      });

      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleKeyDown(createMockEvent("ArrowDown")));
      expect(mockSetSelectedIndex).toHaveBeenCalled();
    });

    it("ArrowUp 키는 selectedIndex를 감소시킨다", () => {
      const mockSetSelectedIndex = jest.fn((cb) => {
        expect(cb(0)).toBe(0); // min: 0
      });

      (useSelectionLogic as jest.Mock).mockReturnValue({
        selectedIndex: 0,
        setSelectedIndex: mockSetSelectedIndex,
      });

      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleKeyDown(createMockEvent("ArrowUp")));
      expect(mockSetSelectedIndex).toHaveBeenCalled();
    });

    it("Enter 키는 유효하지 않은 selectedIndex일 경우 handleConfirm을 호출하지 않는다", () => {
      (filterSymbolsByQuery as jest.Mock).mockReturnValue({ filtered: [] });
      (useSelectionLogic as jest.Mock).mockReturnValue({
        selectedIndex: -1,
        setSelectedIndex: jest.fn(),
      });
      const handleConfirm = jest.fn();
      (useConfirmHandler as jest.Mock).mockReturnValue({ handleConfirm });

      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleKeyDown(createMockEvent("Enter")));
      expect(handleConfirm).not.toHaveBeenCalled();
    });

    it("Enter 키는 유효한 selectedIndex일 경우 handleConfirm 호출", () => {
      const handleConfirm = jest.fn();
      (useConfirmHandler as jest.Mock).mockReturnValue({ handleConfirm });

      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleKeyDown(createMockEvent("Enter")));
      expect(handleConfirm).toHaveBeenCalledWith("AAPL");
    });
  });

  describe("리스트 및 최근 검색 클릭", () => {
    it("handleItemClick은 query, selectedIndex를 설정하고 handleConfirm을 호출", () => {
      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleItemClick("GOOG", 2));
      expect(result.current.query).toBe("GOOG");
    });

    it("handleRecentClick에서 유효한 symbol을 찾으면 동작", () => {
      const mockSetSelectedIndex = jest.fn();
      const mockHandleConfirm = jest.fn();
      (findSymbolDisplayAndIndex as jest.Mock).mockReturnValue({ index: 1 });
      (useConfirmHandler as jest.Mock).mockReturnValue({
        handleConfirm: mockHandleConfirm,
      });
      (useSelectionLogic as jest.Mock).mockReturnValue({
        selectedIndex: 0,
        setSelectedIndex: mockSetSelectedIndex,
      });

      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleRecentClick("CVEHH"));
      expect(result.current.query).toBe("CVEHH");
      expect(mockSetSelectedIndex).toHaveBeenCalledWith(1);
      expect(mockHandleConfirm).toHaveBeenCalledWith("CVEHH");
    });

    it("handleRecentClick에서 symbol을 못 찾으면 아무 동작도 하지 않는다", () => {
      const mockSetSelectedIndex = jest.fn();
      const mockHandleConfirm = jest.fn();
      (findSymbolDisplayAndIndex as jest.Mock).mockReturnValue(null);
      (useConfirmHandler as jest.Mock).mockReturnValue({
        handleConfirm: mockHandleConfirm,
      });
      (useSelectionLogic as jest.Mock).mockReturnValue({
        selectedIndex: 0,
        setSelectedIndex: mockSetSelectedIndex,
      });

      const { result } = renderHook(() => useSymbolSearch());
      act(() => result.current.handleRecentClick("INVALID"));
      expect(mockSetSelectedIndex).not.toHaveBeenCalled();
      expect(mockHandleConfirm).not.toHaveBeenCalled();
    });
  });
});
