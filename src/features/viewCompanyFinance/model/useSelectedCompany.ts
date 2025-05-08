"use client";

import { useState } from "react";

export function useSelectedCompany() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );

  return {
    selectedCompanyId,
    setSelectedCompanyId,
  };
}
