/**
 * Shared shell for sections that exist in the route map and sidebar but
 * aren't built yet (Students, Counselors, Admissions, Reports, Settings).
 * Swap this out page-by-page as each module gets built for real.
 */
export default function PlaceholderPage({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <div className="w-14 h-14 rounded-2xl bg-primary-soft text-primary-active flex items-center justify-center mb-5">
        <Icon size={26} />
      </div>
      <h2 className="text-lg font-semibold mb-1.5">{title}</h2>
      <p className="text-[13.5px] text-ink-secondary max-w-[340px]">{description}</p>
    </div>
  );
}
