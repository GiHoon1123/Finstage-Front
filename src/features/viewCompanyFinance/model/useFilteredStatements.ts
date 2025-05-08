import { useIncomeStatementListStore } from "@/entities/incomeStatement";
import { useSelectedCompany } from "./useSelectedCompany";

export function useFilteredStatements() {
  const { selectedCompanyId } = useSelectedCompany();
  const { incomeStatementList } = useIncomeStatementListStore();

  if (!selectedCompanyId || !incomeStatementList) return [];
  else {
    return incomeStatementList.filter((s) => s.symbol === selectedCompanyId);
  }
}
