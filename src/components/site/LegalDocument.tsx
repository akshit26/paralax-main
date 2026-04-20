type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

export default function LegalDocument({
  eyebrow,
  title,
  updatedAt,
  sections,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  sections: readonly LegalSection[];
}) {
  return (
    <section className="grid gap-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">{title}</h1>
        <p className="text-sm uppercase tracking-[0.16em] text-white/44">{updatedAt}</p>
      </div>

      <div className="grid gap-5">
        {sections.map((section) => (
          <article key={section.heading} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-white/68">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
