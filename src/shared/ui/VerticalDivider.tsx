export default function VerticalDivider({
  height = "100%",
  color = "#3a3a3d",
  width = "1px",
  className = "",
}: {
  height?: string;
  color?: string;
  width?: string;
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
