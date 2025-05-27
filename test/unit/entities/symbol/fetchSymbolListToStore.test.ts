// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given-When-Then 패턴

// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { fetchSymbolListToStore } from "@/entities/symbol/api/fetchSymbolListToStore";
import { useSymbolListStore } from "@/entities/symbol";

describe("fetchSymbolListToStore", () => {
  beforeEach(() => {
    useSymbolListStore.setState({ symbolList: [] }); // Store 초기화
    jest.restoreAllMocks(); // Mock 초기화
  });

  it("빈 store, fetchSymbolListToStore를 호출하면, API 응답이 store에 저장된다", async () => {
    // Given
    const mockData = [{ symbol: "SYPEF" }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as jest.Mock;

    // When
    await fetchSymbolListToStore();

    // Then
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/api/symbols",
    );
    expect(useSymbolListStore.getState().symbolList).toEqual(mockData);
  });

  it("API 에러 상황, fetchSymbolListToStore를 호출하면, 콘솔 에러가 출력된다", async () => {
    // Given
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // When
    await fetchSymbolListToStore();

    // Then
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch symbol list",
      expect.any(Error),
    );
  });
});
