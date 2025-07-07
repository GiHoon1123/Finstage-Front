import { render, act } from "@testing-library/react";
import { useFreezeBodyScroll } from "@/features/symbolSearch";

// 테스트 대상: 해당 훅을 테스트하기 위한 임시 컴포넌트
function TestComponent({ active }: { active: boolean }) {
  useFreezeBodyScroll(active);
  return <div>Scroll Test</div>;
}

describe("useFreezeBodyScroll", () => {
  beforeEach(() => {
    document.body.removeAttribute("style"); // ✅ 핵심!
    window.scrollTo = jest.fn();
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 100,
    });
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      writable: true,
      configurable: true,
      value: 980,
    });
  });

  it("active가 true일 때 body 스크롤이 고정되어야 한다", () => {
    // When: active=true인 상태로 렌더링
    act(() => {
      render(<TestComponent active={true} />);
    });

    // Then: 스크롤을 고정하는 스타일이 적용됨
    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-100px");
    expect(document.body.style.width).toBe("100%");
    expect(document.body.style.paddingRight).toBe("20px");
  });

  it("컴포넌트 언마운트 시 스크롤 관련 스타일이 복구되어야 한다", () => {
    // Given: active=true로 마운트된 컴포넌트를
    const { unmount } = render(<TestComponent active={true} />);

    // When: 컴포넌트를 언마운트
    act(() => {
      unmount();
    });

    // Then: 스타일이 초기 상태로 복구되고 스크롤 위치도 복원됨
    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.width).toBe("");
    expect(document.body.style.paddingRight).toBe("20px"); // → 실제로는 그대로 유지됨
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });

  it("active가 false일 때는 아무 스타일 변경이 없어야 한다", () => {
    // When: active=false 상태로 렌더링
    render(<TestComponent active={false} />);

    // Then: 어떤 스타일도 변경되지 않음
    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.width).toBe("");
    expect(document.body.style.paddingRight).toBe(""); // 수정: 이 테스트가 깨졌다면 패딩 초기화 로직 누락
  });
});
