import { LivePriceChart } from "@/entities/price";
import {
  IncomeStatementTable,
  CompanySearchInput,
} from "@/features/viewCompanyFinance";

export default function StockSection() {
  return (
    <section>
      <CompanySearchInput />
      <LivePriceChart />
      <IncomeStatementTable />
    </section>
  );
}
