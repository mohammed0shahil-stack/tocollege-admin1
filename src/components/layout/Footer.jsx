/** Thin footer for the dashboard shell — mostly a placeholder for legal/version text. */
export default function Footer() {
  return (
    <footer className="px-7 py-4 text-xs text-ink-tertiary border-t border-border">
      © {new Date().getFullYear()} ToCollege. All rights reserved.
    </footer>
  );
}
