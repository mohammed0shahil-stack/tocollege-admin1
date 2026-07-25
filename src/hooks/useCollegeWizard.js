import { useCallback, useState } from 'react';

export const STATE_OPTIONS = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi NCR', 'Telangana', 'Gujarat', 'Kerala', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'];
export const AFFILIATION_OPTIONS = ['Autonomous', 'Affiliated', 'Deemed University', 'Central University', 'State University'];
export const NAAC_OPTIONS = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'Not graded'];
export const STATUS_OPTIONS = ['Open', 'Closed', 'Upcoming'];

const emptyForm = () => ({
  name: '', state: '', city: '', desc: '', established: '', affiliation: '', naac: '', nirf: '',
  status: 'Open', ugc: true, aicte: false, pci: false, nmc: false,
});

function collegeToForm(college) {
  return {
    name: college.name, state: college.state, city: college.city, desc: college.desc || '',
    established: college.established || '', affiliation: college.affiliation || '', naac: college.naac || '',
    nirf: college.nirf || '', status: college.status, ugc: !!college.ugc, aicte: !!college.aicte,
    pci: !!college.pci, nmc: !!college.nmc,
  };
}

function readAsDataUrl(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => cb(e.target.result);
  reader.readAsDataURL(file);
}

/**
 * Owns every piece of state for the 5-step Add/Edit College wizard, so
 * each step component only needs the slice of props it actually renders.
 * Pass an existing college to pre-fill everything for editing.
 */
export function useCollegeWizard(existingCollege) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(existingCollege ? collegeToForm(existingCollege) : emptyForm());
  const [errors, setErrors] = useState({});

  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  const [courses, setCourses] = useState(
    existingCollege?.courses?.length ? existingCollege.courses.map((c) => ({ ...c })) : [{ name: '', degree: '', duration: '', fee: '' }]
  );

  const [mediaCover, setMediaCover] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [brochure, setBrochure] = useState(null);

  const [placement, setPlacement] = useState(
    existingCollege?.placement ? { ...existingCollege.placement } : { available: true, highest: '', average: '', percentage: '', officer: '' }
  );
  const [recruiters, setRecruiters] = useState(existingCollege?.placement?.recruiters?.map((r) => ({ ...r })) ?? []);

  const updateForm = useCallback((key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);
  const updatePlacement = useCallback((key, value) => setPlacement((p) => ({ ...p, [key]: value })), []);

  function validateStep1() {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter the college name to continue';
    if (!form.state) next.state = 'Select a state to continue';
    if (!form.city.trim()) next.city = 'Enter a city to continue';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return false;
    if (step === 2 && !courses.some((c) => c.name.trim())) return false;
    setStep((s) => Math.min(s + 1, 5));
    return true;
  }
  function goBack() { setStep((s) => Math.max(s - 1, 1)); }
  function goToStep(n) { setStep(n); }

  function updateCourse(i, next) { setCourses((cs) => cs.map((c, idx) => (idx === i ? next : c))); }
  function addCourse() { setCourses((cs) => [...cs, { name: '', degree: '', duration: '', fee: '' }]); }
  function removeCourse(i) { setCourses((cs) => cs.filter((_, idx) => idx !== i)); }

  function updateRecruiter(i, next) { setRecruiters((rs) => rs.map((r, idx) => (idx === i ? next : r))); }
  function addRecruiter() { setRecruiters((rs) => [...rs, { name: '', logo: null }]); }
  function removeRecruiter(i) { setRecruiters((rs) => rs.filter((_, idx) => idx !== i)); }

  function handleLogoFile(file) { readAsDataUrl(file, (preview) => setLogo({ file, preview })); }
  function handleCoverFile(file) { readAsDataUrl(file, (preview) => setCover({ file, preview })); }
  function handleMediaCoverFile(file) { readAsDataUrl(file, (preview) => setMediaCover({ file, preview })); }
  function handleBrochureFile(file) { setBrochure({ file, name: file.name, size: file.size }); }

  function addGalleryFiles(fileList) {
    Array.from(fileList).forEach((file) => {
      readAsDataUrl(file, (preview) => setGallery((g) => [...g, { file, preview }]));
    });
  }
  function removeGalleryImage(i) { setGallery((g) => g.filter((_, idx) => idx !== i)); }
  function reorderGallery(next) { setGallery(next); }
  function addVideo(video) { setVideos((v) => [...v, video]); }
  function removeVideo(i) { setVideos((v) => v.filter((_, idx) => idx !== i)); }

  /** Assembles everything collected across all steps into one record shaped like the `colleges` table + nested data. */
  function buildCollegeRecord() {
    return {
      ...form,
      id: existingCollege?.id,
      logo, cover,
      courses: courses.filter((c) => c.name.trim()),
      media: { cover: mediaCover, gallery, videos, brochure },
      placement: { ...placement, recruiters: recruiters.filter((r) => r.name.trim()) },
    };
  }

  return {
    step, goNext, goBack, goToStep,
    form, updateForm, errors,
    logo, setLogo, handleLogoFile,
    cover, setCover, handleCoverFile,
    courses, updateCourse, addCourse, removeCourse,
    mediaCover, setMediaCover, handleMediaCoverFile,
    gallery, addGalleryFiles, removeGalleryImage, reorderGallery,
    videos, addVideo, removeVideo,
    brochure, setBrochure, handleBrochureFile,
    placement, updatePlacement,
    recruiters, updateRecruiter, addRecruiter, removeRecruiter,
    buildCollegeRecord,
    isEditing: !!existingCollege,
  };
}
