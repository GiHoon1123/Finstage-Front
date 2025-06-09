import { useState } from "react";

export function useSymbolRequestFormState() {
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const reset = () => {
    setInputValue("");
    setShowSuccess(false);
  };

  return {
    inputValue,
    setInputValue,
    showSuccess,
    setShowSuccess,
    reset,
  };
}
