import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Dropdown from '../../components/ui/Dropdown';
import Checkbox from '../../components/ui/Checkbox';
import UploadBox from '../../components/ui/UploadBox';
import { STATE_OPTIONS, AFFILIATION_OPTIONS, NAAC_OPTIONS, STATUS_OPTIONS } from '../../hooks/useCollegeWizard';

/** Step 1 — writes to the `colleges` table: identity, description, media, and regulatory approvals. */
export default function Step1BasicInformation({ wizard }) {
  const { form, updateForm, errors, logo, handleLogoFile, setLogo, cover, handleCoverFile, setCover } = wizard;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Basic information</h2>
      <p className="text-[13.5px] text-ink-secondary mb-8">This becomes the college's public profile header.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
        <Input
          className="sm:col-span-2"
          label="College name" required
          value={form.name} error={errors.name}
          onChange={(e) => updateForm('name', e.target.value)}
          placeholder="e.g. Horizon Institute of Technology"
        />
        <Dropdown
          label="State" required options={STATE_OPTIONS}
          value={form.state} error={errors.state}
          onChange={(e) => updateForm('state', e.target.value)}
        />
        <Input
          label="City" required
          value={form.city} error={errors.city}
          onChange={(e) => updateForm('city', e.target.value)}
          placeholder="e.g. Pune"
        />
        <Textarea
          className="sm:col-span-2"
          label="Short description"
          value={form.desc}
          onChange={(e) => updateForm('desc', e.target.value)}
          placeholder="A one or two sentence summary that appears on search results and the college card."
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-medium">Upload logo</span>
          <UploadBox
            icon={UploadCloud}
            subtitle="PNG or JPG, square, up to 2MB"
            preview={logo?.preview}
            onFile={handleLogoFile}
            onRemove={() => setLogo(null)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-medium">Upload cover image</span>
          <UploadBox
            icon={ImageIcon}
            subtitle="1600×600 recommended"
            preview={cover?.preview}
            onFile={handleCoverFile}
            onRemove={() => setCover(null)}
          />
        </div>

        <Input
          label="Established year" type="number" inputClassName="tabular"
          value={form.established}
          onChange={(e) => updateForm('established', e.target.value)}
          placeholder="e.g. 1998"
        />
        <Dropdown
          label="University affiliation" options={AFFILIATION_OPTIONS}
          value={form.affiliation}
          onChange={(e) => updateForm('affiliation', e.target.value)}
        />
        <Dropdown
          label="NAAC grade" options={NAAC_OPTIONS}
          value={form.naac}
          onChange={(e) => updateForm('naac', e.target.value)}
        />
        <Input
          label="NIRF ranking" type="number" inputClassName="tabular"
          value={form.nirf}
          onChange={(e) => updateForm('nirf', e.target.value)}
          placeholder="e.g. 42"
        />
        <Dropdown
          className="sm:col-span-2"
          label="Admission status" options={STATUS_OPTIONS}
          value={form.status}
          onChange={(e) => updateForm('status', e.target.value)}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-[14.5px] font-semibold">Regulatory approvals</h4>
        <p className="text-xs text-ink-tertiary mt-0.5 mb-4">Select every body this college is currently approved by.</p>
        <div className="flex flex-wrap gap-7">
          <Checkbox label="UGC" checked={form.ugc} onChange={(v) => updateForm('ugc', v)} />
          <Checkbox label="AICTE" checked={form.aicte} onChange={(v) => updateForm('aicte', v)} />
          <Checkbox label="PCI" checked={form.pci} onChange={(v) => updateForm('pci', v)} />
          <Checkbox label="NMC" checked={form.nmc} onChange={(v) => updateForm('nmc', v)} />
        </div>
      </div>
    </div>
  );
}
