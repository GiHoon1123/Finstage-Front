// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { renderHook } from "@testing-library/react";
import { useAutoScrollEffect } from "@/features/symbolSearch";

describe("useAutoScrollEffect", () => {
  // Given : 기본 스크롤 대상 생성
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
    element.scrollIntoView = jest.fn();
  });

  it("ref가 유효할 때 scrollIntoView를 호출한다", () => {
    // Given
    const mockRef = { current: element };

    // When
    renderHook(({ ref, active }) => useAutoScrollEffect(ref, active), {
      initialProps: { ref: mockRef, active: 0 },
    });

    // Then
    expect(element.scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
  });

  it("ref.current가 null이면 scrollIntoView를 호출하지 않는다", () => {
    // Given
    const mockRef = { current: null };
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scrollIntoView = scrollSpy;

    // When
    renderHook(({ ref, active }) => useAutoScrollEffect(ref, active), {
      initialProps: { ref: mockRef, active: 0 },
    });

    // Then
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("active 값이 바뀔 때마다 scrollIntoView가 호출된다", () => {
    // Given
    const mockRef = { current: element };

    // When
    const { rerender } = renderHook(
      ({ ref, active }) => useAutoScrollEffect(ref, active),
      {
        initialProps: { ref: mockRef, active: 0 },
      },
    );

    // Then
    expect(element.scrollIntoView).toHaveBeenCalledTimes(1);

    // When : active가 바뀔 때마다 다시 호출
    rerender({ ref: mockRef, active: 1 });
    rerender({ ref: mockRef, active: 2 });

    // Then
    expect(element.scrollIntoView).toHaveBeenCalledTimes(3);
  });

  it("active 값이 변하지 않으면 scrollIntoView를 재호출하지 않는다", () => {
    // Given
    const mockRef = { current: element };

    // When
    const { rerender } = renderHook(
      ({ ref, active }) => useAutoScrollEffect(ref, active),
      {
        initialProps: { ref: mockRef, active: 0 },
      },
    );

    // Then
    expect(element.scrollIntoView).toHaveBeenCalledTimes(1);

    // When : active가 변하지 않음
    rerender({ ref: mockRef, active: 0 });

    // Then
    expect(element.scrollIntoView).toHaveBeenCalledTimes(1);
  });
});
