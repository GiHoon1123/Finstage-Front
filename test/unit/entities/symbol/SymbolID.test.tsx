// BDD 방식 : 사용자의 행위까지 생각하고 테스트하며 개발한다.
// Given-When-Then 패턴

// Given : 테스트 실행을 준비하는 단계
// When : 테스트를 진행하는 단계
// Then : 테스트 결과를 검증하는 단계
import { render, screen } from "@testing-library/react";
import SymbolID from "@/entities/symbol/ui/SymbolID";

describe("SymbolID", () => {
  it("symbol 문자열을 표시한다", () => {
    const symbol = "AAPL";

    render(<SymbolID symbol={symbol} />);
    const element = screen.getByTestId("SymbolID");

    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe(symbol);
  });

  it("기본 fontSize를 적용하여 렌더링된다", () => {
    render(<SymbolID symbol="" />);
    const element = screen.getByTestId("SymbolID");
    expect(element).toHaveStyle("font-size: 14px");
  });

  it("전달된 fontSize가 style에 반영된다", () => {
    const symbol = "AAPL";
    const fontSize = "20px";

    render(<SymbolID symbol={symbol} fontSize={fontSize} />);
    const element = screen.getByTestId("SymbolID");

    expect(element).toHaveStyle("font-size: 20px");
  });

  it("symbol이 빈 문자열이 전달되면 내용 없이 렌더링된다", () => {
    render(<SymbolID symbol="" />);
    const element = screen.getByTestId("SymbolID");
    expect(element.textContent).toBe("");
  });

  // it("fontSize에 숫자 타입이 들어오면 스타일이 적용되지 않는다 (타입 오류 예상)", () => {
  //   // @ts-expect-error fontSize는 string이어야 하며 숫자는 허용되지 않음
  //   render(<SymbolID symbol="MSFT" fontSize={20} />);
  //   const element = screen.getByTestId("SymbolID");
  //   expect(element).not.toHaveStyle("font-size: 20");
  // });
});
