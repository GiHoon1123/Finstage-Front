import { TopNewsPanel } from "@/features/topNews";
import { PopularNewsPanel } from "@/features/popularNews";

export default function TopNewsSection() {
  return (
    <div style={{ width: "65%", margin: "auto", marginTop: 48 }}>
      <TopNewsPanel variant="default" title="주요 뉴스" />
      <PopularNewsPanel />
    </div>
  );
}
