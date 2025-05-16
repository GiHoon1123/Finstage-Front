export default function SectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#1c1d1f] p-4 rounded-md mb-6">
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      {children}
    </section>
  );
}
