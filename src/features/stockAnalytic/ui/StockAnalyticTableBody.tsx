import type { StockAnalyticTableBodyProps } from "../types";

export default function StockAnalyticTableBody({
  columns,
  grouped,
  rows,
}: StockAnalyticTableBodyProps) {
  return (
    <div className="table-wrapper">
      <table className="income-table">
        <thead>
          <tr>
            <th className="sticky-label">항목</th>
            {columns.map((label) => (
              <th key={label} className="year-header">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="sticky-label row-label">{row.label}</td>
              {columns.map((label) => {
                const list = grouped[label] || [];
                const raw = row.getValue(list);
                const num =
                  typeof raw === "string" ? parseFloat(raw) : Number(raw);
                const isPositive = num > 0;
                const isNegative = num < 0;

                return (
                  <td
                    key={label + row.label}
                    className={`value-cell ${
                      isPositive
                        ? "positive"
                        : isNegative
                        ? "negative"
                        : "neutral"
                    }`}
                  >
                    {typeof raw === "number" ? raw.toLocaleString() : raw}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
