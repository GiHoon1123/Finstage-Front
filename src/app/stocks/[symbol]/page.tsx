import { JSX } from "react";
import { redirect } from "next/navigation";
import { fetchIncomeStatementListToStore } from "@/entities/incomeStatement";
import { NotFoundStockModal } from "@/features/stockAnalytic";

export default async function SymbolRedirectPage(props: {
  params: Promise<{ symbol: string }>;
  searchParams: Promise<{ invalid?: string }>;
}): Promise<JSX.Element | void> {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const symbol = params.symbol.toUpperCase();
  const isInvalid = searchParams.invalid === "true";

  if (isInvalid) return <NotFoundStockModal />;

  const data = await fetchIncomeStatementListToStore(symbol);
  if (data) {
    redirect(`/stocks/${symbol}/analytics`);
  }

  redirect(`/stocks/${symbol}?invalid=true`);
}
