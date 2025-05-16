export default function HorizontalDivider({
  width = "100%",
  color = "#3a3a3d",
  height = "1px",
  className = "",
}: {
  width?: string;
  color?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        backgroundColor: color,
        flexShrink: 0,
        alignSelf: "stretch", // flex 정렬 시 자동 높이 확장
      }}
    />
  );
}
