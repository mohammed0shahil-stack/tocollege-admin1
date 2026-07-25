import { formatFee } from '../../utils/formatters';
import Badge from '../../components/ui/Badge';

function ReviewBlock({ title, onEdit, children }) {
  return (
    <div className="mb-7">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[13.5px] font-semibold text-ink-tertiary uppercase tracking-wide">{title}</h4>
        <button onClick={onEdit} className="text-xs text-primary font-medium">Edit</button>
      </div>
      {children}
    </div>
  );
}

function ReviewGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white border border-border rounded-md p-[18px] px-5">
      {items.map(([label, value]) => (
        <div key={label}>
          <span className="block text-[11.5px] text-ink-tertiary mb-0.5">{label}</span>
          <b className="text-[13.5px] font-medium">{value || '—'}</b>
        </div>
      ))}
    </div>
  );
}

/** Step 5 — read-only summary of every step, each with a jump-back-to-edit link, plus the Publish action in the footer. */
export default function ReviewPublish({ wizard }) {
  const { form, courses, mediaCover, gallery, videos, brochure, placement, recruiters, goToStep } = wizard;
  const approvals = ['ugc', 'aicte', 'pci', 'nmc'].filter((k) => form[k]).map((k) => k.toUpperCase());
  const filledCourses = courses.filter((c) => c.name.trim());
  const filledRecruiters = recruiters.filter((r) => r.name.trim());

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Review</h2>
      <p className="text-[13.5px] text-ink-secondary mb-8">Check everything before this goes live on the platform.</p>

      <ReviewBlock title="Basic information" onEdit={() => goToStep(1)}>
        <ReviewGrid
          items={[
            ['College name', form.name],
            ['Location', [form.city, form.state].filter(Boolean).join(', ')],
            ['Admission status', form.status],
            ['NAAC grade', form.naac],
            ['Established', form.established],
            ['Affiliation', form.affiliation],
            ['NIRF ranking', form.nirf],
            ['Approvals', approvals.join(', ') || 'None selected'],
          ]}
        />
      </ReviewBlock>

      <ReviewBlock title={`Courses (${filledCourses.length})`} onEdit={() => goToStep(2)}>
        {filledCourses.length === 0 ? (
          <p className="text-[13px] text-ink-tertiary">No courses added</p>
        ) : (
          filledCourses.map((c, i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-border rounded-md px-[18px] py-3.5 mb-2 last:mb-0">
              <div>
                <b className="text-[13.5px] block">{c.name}</b>
                <span className="text-xs text-ink-tertiary">{c.degree} · {c.duration}</span>
              </div>
              <span className="tabular text-[13.5px]">{formatFee(c.fee)}</span>
            </div>
          ))
        )}
      </ReviewBlock>

      <ReviewBlock title="Media" onEdit={() => goToStep(3)}>
        <ReviewGrid
          items={[
            ['Cover image', mediaCover ? 'Uploaded' : 'Not uploaded'],
            ['Gallery images', `${gallery.length} uploaded`],
            ['Campus videos', `${videos.length} added`],
            ['Brochure', brochure ? brochure.name : 'Not uploaded'],
          ]}
        />
      </ReviewBlock>

      <ReviewBlock title="Placements" onEdit={() => goToStep(4)}>
        {placement.available ? (
          <>
            <ReviewGrid
              items={[
                ['Highest package', placement.highest ? `${placement.highest} LPA` : null],
                ['Average package', placement.average ? `${placement.average} LPA` : null],
                ['Placement %', placement.percentage ? `${placement.percentage}%` : null],
                ['Placement officer', placement.officer],
              ]}
            />
            <div className="flex flex-wrap gap-2 mt-2.5">
              {filledRecruiters.length === 0 ? (
                <span className="text-xs text-ink-tertiary">No recruiters added</span>
              ) : (
                filledRecruiters.map((r, i) => <Badge key={i} tone="closed">{r.name}</Badge>)
              )}
            </div>
          </>
        ) : (
          <p className="text-[13px] text-ink-tertiary">Placement cell not available at this college</p>
        )}
      </ReviewBlock>
    </div>
  );
}
