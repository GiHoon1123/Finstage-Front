import { render, screen } from "@testing-library/react";
import SymbolName from "@/entities/symbol/ui/SymbolName";

describe("SymbolName", () => {
  it("name 문자열을 표시한다", () => {
    const name = "Apple Inc.";

    render(<SymbolName name={name} />);
    const element = screen.getByTestId("SymbolName");

    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe(name);
  });

  it("기본 fontSize를 적용하여 렌더링된다", () => {
    render(<SymbolName name="" />);
    const element = screen.getByTestId("SymbolName");
    expect(element).toHaveStyle("font-size: 14px");
  });

  it("전달된 fontSize가 style에 반영된다", () => {
    const name = "AAPL";
    const fontSize = "20px";

    render(<SymbolName name={name} fontSize={fontSize} />);
    const element = screen.getByTestId("SymbolName");
    expect(element).toHaveStyle("font-size: 20px");
  });

  it("빈 문자열이 전달되면 내용 없이 렌더링된다", () => {
    render(<SymbolName name="" />);
    const element = screen.getByTestId("SymbolName");
    expect(element.textContent).toBe("");
  });

  // it("fontSize에 숫자 타입이 들어오면 스타일이 적용되지 않는다 (타입 오류 예상)", () => {
  //   // @ts-expect-error fontSize는 string이어야 하며 숫자는 허용되지 않음
  //   render(<SymbolName name="Apple" fontSize={18} />);
  //   const element = screen.getByTestId("SymbolName");
  //   expect(element).not.toHaveStyle("font-size: 18px");
  // });
});
