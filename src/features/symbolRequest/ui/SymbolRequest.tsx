"use client";

import SymbolRequestForm from "./SymbolRequestForm";
import SymbolRequestSuccess from "./SymbolRequestSuccess";
import { useSymbolRequestModel } from "../model/useSymbolRequestModel";

export default function SymbolRequest() {
  const {
    inputValue,
    setInputValue,
    isLoading,
    errorMessage,
    canShowSuccess,
    responseMessage,
    handleSubmit,
    handleRetry,
  } = useSymbolRequestModel();

  return canShowSuccess ? (
    <SymbolRequestSuccess
      message={responseMessage ?? ""}
      onRetry={handleRetry}
    />
  ) : (
    <SymbolRequestForm
      inputValue={inputValue}
      onChange={setInputValue}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
