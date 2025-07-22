export default function SectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md">
      <h2 className="text-white text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}
