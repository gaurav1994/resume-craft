type ResumeViewSectionProps = Readonly<{ title: string; children: React.ReactNode }>

function ResumeViewSection({ title, children }: ResumeViewSectionProps) {
  return (
    <section className="border-b border-[#e5eae6] py-7 last:border-b-0">
      <h2 className="mb-3 flex items-center gap-3 font-serif text-xl font-bold text-[#18232b] before:h-2 before:w-2 before:rounded-full before:bg-[#d97964] before:content-['']">{title}</h2>
      {children}
    </section>
  )
}

export default ResumeViewSection
