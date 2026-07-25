import { Trash2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

/** Confirm-delete dialog shown before removing a college row. */
export default function DeleteCollegeModal({ college, onCancel, onConfirm }) {
  return (
    <Modal open={!!college} onClose={onCancel}>
      <div className="p-7">
        <div className="w-11 h-11 rounded-[10px] bg-destructive-soft text-destructive flex items-center justify-center mb-4">
          <Trash2 size={20} />
        </div>
        <h3 className="text-base font-semibold mb-1.5">Delete this college?</h3>
        <p className="text-[13.5px] text-ink-secondary mb-[22px]">
          This removes "{college?.name}" and all of its courses, media, and placement data. This can't be undone.
        </p>
        <div className="flex gap-2.5 justify-end">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={() => onConfirm(college)}>Delete</Button>
        </div>
      </div>
    </Modal>
  );
}
