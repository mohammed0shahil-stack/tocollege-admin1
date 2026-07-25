/**
 * Mock data standing in for real Supabase tables during development.
 * Shapes here intentionally mirror the planned Postgres schema
 * (colleges, college_courses, college_media, college_placements, recruiters)
 * so swapping the service layer for real Supabase calls later is a
 * like-for-like replacement rather than a data-shape rewrite.
 */

export let mockColleges = [
  {
    id: 1,
    name: 'Horizon Institute of Technology',
    state: 'Maharashtra',
    city: 'Pune',
    status: 'Open',
    naac: 'A++',
    nirf: 42,
    established: 1998,
    affiliation: 'Autonomous',
    desc: 'A leading engineering institute known for its research output and industry partnerships.',
    ugc: true, aicte: true, pci: false, nmc: false,
    created: '14 Jan 2026',
    courses: [
      { name: 'B.Tech Computer Science', degree: 'B.Tech', duration: '4 years', fee: 180000 },
      { name: 'B.Tech Electronics & Communication', degree: 'B.Tech', duration: '4 years', fee: 165000 },
    ],
    placement: {
      available: true, highest: 42, average: 8.5, percentage: 91, officer: 'Neha Kapoor',
      recruiters: [{ name: 'TCS' }, { name: 'Infosys' }, { name: 'Microsoft' }],
    },
  },
  {
    id: 2,
    name: 'Meridian College of Engineering',
    state: 'Karnataka',
    city: 'Bengaluru',
    status: 'Open',
    naac: 'A+',
    nirf: 67,
    established: 2004,
    affiliation: 'Autonomous',
    desc: "A growing engineering college with strong placement ties to Bengaluru's tech corridor.",
    ugc: true, aicte: true, pci: false, nmc: false,
    created: '09 Feb 2026',
    courses: [
      { name: 'B.Tech Mechanical', degree: 'B.Tech', duration: '4 years', fee: 140000 },
      { name: 'B.Tech AI & ML', degree: 'B.Tech', duration: '4 years', fee: 195000 },
    ],
    placement: {
      available: true, highest: 38, average: 7.2, percentage: 87, officer: 'Arjun Malhotra',
      recruiters: [{ name: 'Wipro' }, { name: 'Bosch' }, { name: 'L&T' }],
    },
  },
  {
    id: 3,
    name: 'Silverline Medical College',
    state: 'Tamil Nadu',
    city: 'Chennai',
    status: 'Closed',
    naac: 'A++',
    nirf: 18,
    established: 1985,
    affiliation: 'Deemed University',
    desc: "One of South India's oldest medical colleges, affiliated with a 900-bed teaching hospital.",
    ugc: true, aicte: false, pci: false, nmc: true,
    created: '22 Nov 2025',
    courses: [
      { name: 'MBBS', degree: 'MBBS', duration: '5.5 years', fee: 950000 },
      { name: 'MD General Medicine', degree: 'MD', duration: '3 years', fee: 620000 },
    ],
    placement: {
      available: true, highest: 18, average: 9.6, percentage: 95, officer: 'Dr. Priya Nair',
      recruiters: [{ name: 'Apollo Hospitals' }, { name: 'Fortis Healthcare' }],
    },
  },
  {
    id: 4,
    name: 'Crestwood College of Pharmacy',
    state: 'Gujarat',
    city: 'Ahmedabad',
    status: 'Open',
    naac: 'A',
    nirf: 121,
    established: 2010,
    affiliation: 'Affiliated',
    desc: 'A pharmacy college with dedicated labs for pharmaceutical chemistry and quality assurance.',
    ugc: true, aicte: false, pci: true, nmc: false,
    created: '03 Mar 2026',
    courses: [
      { name: 'B.Pharm', degree: 'B.Pharm', duration: '4 years', fee: 95000 },
      { name: 'M.Pharm', degree: 'M.Pharm', duration: '2 years', fee: 110000 },
    ],
    placement: {
      available: true, highest: 12, average: 5.4, percentage: 78, officer: 'Ramesh Iyer',
      recruiters: [{ name: 'Cipla' }, { name: 'Sun Pharma' }],
    },
  },
  {
    id: 5,
    name: 'Bluepeak University',
    state: 'Delhi NCR',
    city: 'New Delhi',
    status: 'Upcoming',
    naac: 'A+',
    nirf: 55,
    established: 1995,
    affiliation: 'Autonomous',
    desc: 'A multi-disciplinary university with a dedicated corporate relations office.',
    ugc: true, aicte: false, pci: false, nmc: false,
    created: '27 Mar 2026',
    courses: [
      { name: 'BBA', degree: 'BBA', duration: '3 years', fee: 120000 },
      { name: 'MBA', degree: 'MBA', duration: '2 years', fee: 240000 },
    ],
    placement: {
      available: true, highest: 32, average: 9.8, percentage: 89, officer: 'Kavita Rao',
      recruiters: [{ name: 'Deloitte' }, { name: 'Accenture' }, { name: 'HDFC Bank' }],
    },
  },
  {
    id: 6,
    name: 'Northgate College of Business',
    state: 'Telangana',
    city: 'Hyderabad',
    status: 'Open',
    naac: 'B++',
    nirf: 210,
    established: 2012,
    affiliation: 'Affiliated',
    desc: 'A commerce and business college focused on regional SME hiring pipelines.',
    ugc: true, aicte: false, pci: false, nmc: false,
    created: '11 Apr 2026',
    courses: [
      { name: 'BBA', degree: 'BBA', duration: '3 years', fee: 85000 },
      { name: 'B.Com Honours', degree: 'B.Com', duration: '3 years', fee: 70000 },
    ],
    placement: { available: false, highest: null, average: null, percentage: null, officer: '', recruiters: [] },
  },
  {
    id: 7,
    name: 'Everfield Institute of Design',
    state: 'Maharashtra',
    city: 'Mumbai',
    status: 'Open',
    naac: 'A',
    nirf: 88,
    established: 2008,
    affiliation: 'Autonomous',
    desc: 'A design school with studio-based teaching across communication and product design.',
    ugc: true, aicte: false, pci: false, nmc: false,
    created: '02 May 2026',
    courses: [
      { name: 'B.Des Communication Design', degree: 'B.Des', duration: '4 years', fee: 210000 },
      { name: 'M.Des Product Design', degree: 'M.Des', duration: '2 years', fee: 260000 },
    ],
    placement: {
      available: true, highest: 15, average: 6.8, percentage: 82, officer: 'Ananya Sen',
      recruiters: [{ name: 'Ogilvy' }, { name: 'Zomato' }],
    },
  },
  {
    id: 8,
    name: 'Rosemont Dental College',
    state: 'Kerala',
    city: 'Kochi',
    status: 'Closed',
    naac: 'B+',
    nirf: null,
    established: 2001,
    affiliation: 'Affiliated',
    desc: 'A dental college with an attached outpatient clinic serving the greater Kochi area.',
    ugc: true, aicte: false, pci: false, nmc: true,
    created: '19 May 2026',
    courses: [
      { name: 'BDS', degree: 'BDS', duration: '5 years', fee: 780000 },
      { name: 'MDS Orthodontics', degree: 'MDS', duration: '3 years', fee: 940000 },
    ],
    placement: {
      available: true, highest: 20, average: 11.2, percentage: 90, officer: 'Dr. Vikram Shah',
      recruiters: [{ name: 'Apollo Dental' }, { name: 'Clove Dental' }],
    },
  },
  {
    id: 9,
    name: 'Ashgrove College of Law',
    state: 'Rajasthan',
    city: 'Jaipur',
    status: 'Open',
    naac: 'A',
    nirf: 95,
    established: 1992,
    affiliation: 'Autonomous',
    desc: 'A law college with active moot court programs and litigation clinics.',
    ugc: true, aicte: false, pci: false, nmc: false,
    created: '30 May 2026',
    courses: [
      { name: 'BA LLB', degree: 'BA LLB', duration: '5 years', fee: 130000 },
      { name: 'LLM', degree: 'LLM', duration: '1 year', fee: 90000 },
    ],
    placement: {
      available: true, highest: 22, average: 8.4, percentage: 85, officer: 'Meera Iyengar',
      recruiters: [{ name: 'Khaitan & Co' }, { name: 'AZB & Partners' }],
    },
  },
];

export const mockStateAdmissions = [
  ['Maharashtra', 340], ['Karnataka', 265], ['Tamil Nadu', 230], ['Delhi NCR', 195],
  ['Telangana', 160], ['Gujarat', 140], ['Kerala', 95], ['Rajasthan', 80],
];

export const mockPopularCourses = [
  ['B.Tech CS', 480], ['MBA', 390], ['B.Sc Nursing', 310], ['B.Pharm', 275],
  ['BBA', 240], ['B.Tech Mech', 205], ['B.Des', 150],
];

export const mockActivity = [
  { icon: 'check', text: 'Silverline Medical College was published', time: '2 hours ago' },
  { icon: 'briefcase', text: 'New recruiter added to Horizon Institute of Technology', time: '5 hours ago' },
  { icon: 'graduation', text: 'Course B.Tech AI & ML added to Meridian College of Engineering', time: 'Yesterday' },
  { icon: 'clipboard', text: 'Admission status changed to Closed for Rosemont Dental College', time: 'Yesterday' },
  { icon: 'userplus', text: '12 new leads received for Bluepeak University', time: '2 days ago' },
  { icon: 'pencil', text: 'Crestwood College of Pharmacy profile updated', time: '3 days ago' },
];
