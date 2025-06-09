export async function postSymbolRequest(symbol: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch(
      `http://localhost:4000/financials/request?symbol=${symbol}`,
      {
        method: "POST",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "신청에 실패했습니다.");
    }

    return {
      success: true,
      message: "요청이 성공적으로 접수되었습니다.",
    };
  } catch {
    return {
      success: false,
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
