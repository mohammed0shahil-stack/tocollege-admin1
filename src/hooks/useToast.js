import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

/** Access the app-wide toast: const { showToast } = useToast(); showToast('Saved'); */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
