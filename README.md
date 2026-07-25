# ToCollege — Admin Dashboard

A production-structured React + Vite admin dashboard for managing colleges on the ToCollege platform. This is a **frontend conversion** of the original HTML prototype into a proper component architecture — Supabase is scaffolded but intentionally **not connected yet**.

## Tech stack

- React 18 + Vite
- Tailwind CSS (design tokens configured in `tailwind.config.js` to match the original prototype exactly — same colors, radii, shadows)
- React Router 7
- Supabase JS client (installed, not connected — see below)
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

The app runs entirely on mock data (`src/utils/mockData.js`) out of the box — no environment variables required. Every list, stat, and chart you see comes from that file plus the in-memory state the service layer keeps on top of it.

## Folder structure

```
src/
  components/
    layout/      Sidebar, Topbar, Footer, DashboardLayout (the authenticated app shell)
    ui/           Generic design-system primitives: Button, Card, Modal, Input, Textarea,
                   Dropdown, Checkbox, Toggle, Badge, Table, UploadBox, ProgressIndicator,
                   LoadingSpinner, EmptyState, Toast, IconButton, PlaceholderPage
    dashboard/    StatCard, AdmissionsByStateChart, PopularCoursesChart, ActivityFeed
    colleges/     CollegeTable, DeleteCollegeModal
    wizard/       CourseCard, RecruiterCard, GalleryUploader, VideoEmbedInput, PublishModal
  pages/          One folder per route (see Routes below)
  services/       Supabase client + placeholder CRUD/storage functions (see below)
  hooks/          useToast, useCollegeWizard (owns all Add/Edit College wizard state)
  contexts/       ToastContext
  utils/          cn (classnames helper), formatters, mockData
```

Every page is intentionally thin — it wires hooks and services to components, not markup. All real UI lives in `components/`.

## Routes

| Path            | Page                                    |
|------------------|------------------------------------------|
| `/dashboard`     | Dashboard.jsx                            |
| `/colleges`      | CollegeList.jsx                          |
| `/colleges/add`  | AddCollege.jsx (also handles editing)    |
| `/students`      | Students.jsx (placeholder)               |
| `/counselors`    | Counselors.jsx (placeholder)             |
| `/admissions`    | Admissions.jsx (placeholder)             |
| `/reports`       | Reports.jsx (placeholder)                |
| `/settings`      | Settings.jsx (placeholder)               |
| `/login`         | Login.jsx — **bonus**, see note below    |

`/colleges/add` handles both "Add" and "Edit": clicking Edit on a table row navigates there with `{ state: { editId } }`, and the wizard pre-fills from `getCollegeById`.

> **Note on `/login`:** this wasn't in the requested route list, and Authentication is called out as future scope — but the original prototype had a login screen, and "convert the existing prototype" implied keeping it. It's a faithful port with no real session logic (`Login.jsx` just navigates to `/dashboard`). Delete `src/pages/Login` and the `/login` route in `App.jsx` if you'd rather it not exist yet.

## Connecting Supabase

Nothing in this codebase talks to a real backend yet. Every function in `src/services/*.js` is a placeholder that resolves with mock/in-memory data after an artificial delay (so loading states are real and visible). Each one has the real Supabase call already sketched in a comment directly above the mock fallback — connecting is meant to be a find-and-uncomment exercise, not a rewrite:

1. Create a Supabase project and the five tables from the ER diagram (`colleges`, `college_courses`, `college_media`, `college_placements`, `recruiters`), plus storage buckets for logos/covers/gallery/brochures.
2. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
3. In each `services/*.js` file, uncomment the real Supabase call and delete the mock fallback beneath it. `isSupabaseConfigured` (from `services/supabase.js`) is already the guard used everywhere, so nothing else needs to change.

## Known trade-offs

- **Auth**: not implemented (by design — it's listed as future scope). Logout currently just routes to `/login`.
- **react-router-dom** is pinned to the latest release (7.18.1), which carries one high-severity advisory — but it's specific to RSC (React Server Components) mode, which this project doesn't use anywhere (no `.server`/`.client` conventions, no framework mode, just `<BrowserRouter>`). Downgrading to dodge it actually lands inside a much larger set of ~14 advisories covering versions 6.0–7.17, so staying current is the safer choice here. Worth re-checking `npm audit` before shipping.
- Students / Counselors / Admissions / Reports / Settings are intentionally placeholder pages (`components/ui/PlaceholderPage.jsx`) — real ones should follow the same pattern as `CollegeManagement` (table page + service file + Supabase table).
