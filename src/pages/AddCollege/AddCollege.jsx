import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCollegeById, addCollege, updateCollege } from '../../services/collegeService';
import { saveCourses } from '../../services/courseService';
import { savePlacements, saveRecruiters } from '../../services/placementService';
import { uploadLogo, uploadCover, uploadGallery, uploadBrochure } from '../../services/storageService';
import { useCollegeWizard } from '../../hooks/useCollegeWizard';
import { useToast } from '../../hooks/useToast';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import PublishModal from '../../components/wizard/PublishModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Step1BasicInformation from './Step1BasicInformation';
import Step2Courses from './Step2Courses';
import Step3Media from './Step3Media';
import Step4Placements from './Step4Placements';
import ReviewPublish from './ReviewPublish';

const STEP_LABELS = ['Basic information', 'Courses', 'Media', 'Placements', 'Review'];
const STEP_COMPONENTS = [Step1BasicInformation, Step2Courses, Step3Media, Step4Placements, ReviewPublish];

/** Routed at /colleges/add. Loads the existing college when navigated here with { state: { editId } }. */
export default function AddCollege() {
  const location = useLocation();
  const editId = location.state?.editId;
  const [existingCollege, setExistingCollege] = useState(undefined);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (!editId) { setExistingCollege(null); return; }
    getCollegeById(editId).then(setExistingCollege);
  }, [editId]);

  if (existingCollege === undefined) {
    return <div className="flex justify-center py-24"><LoadingSpinner /></div>;
  }

  return (
    <CollegeWizardForm
      key={formKey}
      existingCollege={existingCollege}
      onAddAnother={() => { setExistingCollege(null); setFormKey((k) => k + 1); }}
    />
  );
}

function CollegeWizardForm({ existingCollege, onAddAnother }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const wizard = useCollegeWizard(existingCollege);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishedCollege, setPublishedCollege] = useState(null);

  const StepComponent = STEP_COMPONENTS[wizard.step - 1];

  function handleNext() {
    if (wizard.step === 5) { setPublishOpen(true); return; }
    if (!wizard.goNext()) {
      if (wizard.step === 2) showToast('Add at least one course to continue');
    }
  }

  async function handlePerformSave() {
    const record = wizard.buildCollegeRecord();
    const saved = wizard.isEditing ? await updateCollege(record.id, record) : await addCollege(record);
    if (record.logo?.file) await uploadLogo(saved.id, record.logo.file);
    if (record.cover?.file) await uploadCover(saved.id, record.cover.file);
    if (record.media.gallery.length) await uploadGallery(saved.id, record.media.gallery.map((g) => g.file));
    if (record.media.brochure?.file) await uploadBrochure(saved.id, record.media.brochure.file);
    await saveCourses(saved.id, record.courses);
    const savedPlacement = await savePlacements(saved.id, record.placement);
    await saveRecruiters(savedPlacement.id, record.placement.recruiters);
    setPublishedCollege(saved);
  }

  return (
    <div className="fixed inset-0 bg-surface-bg z-[100] flex flex-col">
      <header className="h-[72px] flex-shrink-0 border-b border-border flex items-center justify-between px-7 bg-white">
        <Button variant="ghost" className="w-[110px]" onClick={() => setShowDiscardConfirm(true)}>Cancel</Button>
        <ProgressIndicator steps={STEP_LABELS} currentStep={wizard.step} />
        <div className="w-[110px]" />
      </header>

      <div className="flex-1 overflow-y-auto flex justify-center px-6 py-11 pb-16">
        <div className="w-full max-w-[640px]">
          <StepComponent wizard={wizard} />
        </div>
      </div>

      <footer className="h-[76px] flex-shrink-0 border-t border-border bg-white flex items-center justify-between px-7">
        <Button variant="secondary" className={wizard.step === 1 ? 'invisible' : ''} onClick={wizard.goBack}>Back</Button>
        <div className="flex gap-2.5">
          {wizard.step < 5 && (
            <Button variant="ghost" onClick={() => showToast('Draft saved')}>Save draft</Button>
          )}
          <Button onClick={handleNext}>{wizard.step === 5 ? 'Publish college' : 'Next'}</Button>
        </div>
      </footer>

      <Modal open={showDiscardConfirm} onClose={() => setShowDiscardConfirm(false)}>
        <div className="p-7">
          <h3 className="text-base font-semibold mb-1.5">Discard this college?</h3>
          <p className="text-[13.5px] text-ink-secondary mb-5">Closing now loses everything entered in this wizard.</p>
          <div className="flex gap-2.5 justify-end">
            <Button variant="secondary" onClick={() => setShowDiscardConfirm(false)}>Keep editing</Button>
            <Button variant="destructive" onClick={() => navigate('/colleges')}>Discard</Button>
          </div>
        </div>
      </Modal>

      <PublishModal
        open={publishOpen}
        collegeName={wizard.form.name || 'This college'}
        onPerformSave={handlePerformSave}
        onViewCollege={() => { navigate('/colleges'); showToast('Showing your published college'); }}
        onAddAnother={() => { setPublishOpen(false); onAddAnother(); }}
      />
    </div>
  );
}
