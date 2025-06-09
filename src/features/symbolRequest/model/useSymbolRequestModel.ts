import { useSubmitSymbolRequest } from "./useSubmitSymbolRequest";
import { useSymbolRequestFormState } from "./useSymbolRequestFormState";
import { getCanShowSuccess } from "../lib/canShowSuccess";
import { getErrorMessage } from "../lib/errorMessage";

export function useSymbolRequestModel() {
  // 상태 훅
  const { inputValue, setInputValue, showSuccess, setShowSuccess, reset } =
    useSymbolRequestFormState();
  const { submit, isLoading, isSuccess, responseMessage } =
    useSubmitSymbolRequest();

  // 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await submit(inputValue.trim());

    if (isSuccess) {
      setInputValue("");
      setShowSuccess(true);
    }
  };

  const handleRetry = () => reset();

  // 추가된 부분
  const canShowSuccess = getCanShowSuccess(showSuccess, isSuccess);
  const errorMessage = getErrorMessage(isSuccess, responseMessage);

  return {
    inputValue,
    setInputValue,
    isLoading,
    isSuccess,
    responseMessage,
    showSuccess,
    canShowSuccess,
    errorMessage,
    handleSubmit,
    handleRetry,
  };
}
