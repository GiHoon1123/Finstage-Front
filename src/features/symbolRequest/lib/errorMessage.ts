export function getErrorMessage(
  isSuccess: boolean,
  responseMessage: string | null | undefined,
): string | undefined {
  return !isSuccess ? responseMessage ?? "" : undefined;
}
