import type { SymbolRequestFormProps } from "../types";

export default function SymbolRequestForm({
  inputValue,
  onChange,
  onSubmit,
  isLoading,
  errorMessage,
}: SymbolRequestFormProps) {
  return (
    <form onSubmit={onSubmit} className="symbol-request-form">
      <label htmlFor="symbol" className="label">
        신청할 심볼을 입력하세요
      </label>
      <input
        id="symbol"
        type="text"
        placeholder="예: GOOGL"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "신청 중..." : "심볼 신청"}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
