import {
  RealTimeChartSection,
  TrendingStockSection,
  IndexSummarySection,
  NewsSummarySection,
} from "@/widgets/dashboardSection";
import VerticalDivider from "@/shared/ui/VerticalDivider";
import HorizontalDivider from "@/shared/ui/HorizontalDivider";

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* 왼쪽 주요 콘텐츠 */}
        <section className="main-column">
          <HorizontalDivider width="auto" />
          <RealTimeChartSection />
          <TrendingStockSection />
        </section>

        <VerticalDivider height="auto" />

        {/* 오른쪽 보조 콘텐츠 */}
        <aside className="side-column">
          <IndexSummarySection />
          <NewsSummarySection />
        </aside>
      </div>
    </div>
  );
}
