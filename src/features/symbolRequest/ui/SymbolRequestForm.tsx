"use client";

import { useState } from "react";
import { useSubmitSymbolRequest } from "../model/useSubmitSymbolRequest";

export default function SymbolRequestForm() {
  const [inputValue, setInputValue] = useState("");
  const { submit, isLoading, isSuccess, responseMessage } =
    useSubmitSymbolRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    await submit(inputValue.trim());
  };

  return (
    <div
      className="symbol-request-form"
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      {isSuccess ? (
        <div
          className="success-message"
          style={{ textAlign: "center", padding: "2rem" }}
        >
          <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {responseMessage}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="symbol"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            신청할 심볼을 입력하세요
          </label>
          <input
            id="symbol"
            type="text"
            placeholder="예: GOOGL"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              backgroundColor: "#3182f6",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            {isLoading ? "신청 중..." : "심볼 신청"}
          </button>
          {responseMessage && !isSuccess && (
            <p style={{ color: "red", marginTop: "1rem" }}>{responseMessage}</p>
          )}
        </form>
      )}
    </div>
  );
}
