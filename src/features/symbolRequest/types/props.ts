export interface SymbolRequestFormProps {
  inputValue: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errorMessage?: string;
}

export interface SymbolRequestSuccessProps {
  message: string;
  onRetry: () => void;
}
