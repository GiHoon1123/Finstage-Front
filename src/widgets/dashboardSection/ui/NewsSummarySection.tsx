import SectionWrapper from "./SectionWrapper";

import { TopNewsPanel } from "@/features/topNews";

export default function NewsSummarySection() {
  return (
    <SectionWrapper title="주요 뉴스">
      <div className="text-gray-400 text-sm">
        <TopNewsPanel variant="compact" />
      </div>
    </SectionWrapper>
  );
}
