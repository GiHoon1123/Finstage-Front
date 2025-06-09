import type { SymbolRequestSuccessProps } from "../types";

export default function SymbolRequestSuccess({
  message,
  onRetry,
}: SymbolRequestSuccessProps) {
  return (
    <div className="symbol-request-form">
      <div className="success-message">
        <p className="message-text">{message}</p>
        <button className="retry-button" onClick={onRetry}>
          다른 심볼 신청하기
        </button>
      </div>
    </div>
  );
}
