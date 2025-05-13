import type { CompanySearchFieldProps } from "../types";

export default function CompanySearchField({
  query,
  setQuery,
  onKeyDown,
  clearSelection,
}: CompanySearchFieldProps) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        className="border px-2 py-1 text-sm w-full"
        placeholder="회사명 또는 티커 검색..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          clearSelection();
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
