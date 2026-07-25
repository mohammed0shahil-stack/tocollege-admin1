/**
 * Tiny classnames combiner so components can compose conditional Tailwind
 * classes without pulling in an extra dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
