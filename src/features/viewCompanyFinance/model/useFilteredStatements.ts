import { useIncomeStatementListStore } from "@/entities/incomeStatement";
import { useSelectedCompany } from "./useSelectedCompany";

export function useFilteredStatements() {
  const { selectedCompanyId } = useSelectedCompany();
  const { incomeStatementList } = useIncomeStatementListStore();

  if (!selectedCompanyId || !incomeStatementList) return [];
  else {
    return incomeStatementList.income_statement.filter(
      (s) => s.symbol === selectedCompanyId,
    );
  }
}
