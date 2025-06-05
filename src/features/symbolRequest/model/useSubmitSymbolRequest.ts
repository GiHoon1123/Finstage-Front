import { useState } from "react";
import { postSymbolRequest } from "../api/postSymbolRequest";

export function useSubmitSymbolRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (symbol: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setResponseMessage(null);

    const result = await postSymbolRequest(symbol);

    setIsLoading(false);
    setIsSuccess(result.success);
    setResponseMessage(result.message);
  };

  return {
    submit,
    isLoading,
    isSuccess,
    responseMessage,
  };
}
