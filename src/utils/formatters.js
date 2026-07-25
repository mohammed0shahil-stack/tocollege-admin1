/**
 * Shared formatting helpers used across pages/components.
 * Keeping these in one place avoids re-implementing the same
 * currency/date/initials logic in every component.
 */

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function formatFee(amount) {
  if (amount === null || amount === undefined || amount === '') return '—';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDateShort(date = new Date()) {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Parses a YouTube or Vimeo URL into an embeddable iframe src, or null if unrecognized. */
export function parseVideoUrl(url) {
  if (!url) return null;
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
  if (m) return { type: 'YouTube', embed: `https://www.youtube.com/embed/${m[1]}` };
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return { type: 'Vimeo', embed: `https://player.vimeo.com/video/${m[1]}` };
  return null;
}
