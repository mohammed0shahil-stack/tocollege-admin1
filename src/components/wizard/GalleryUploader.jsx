import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Multi-image dropzone + reorderable thumbnail grid. Controlled by the
 * parent: `images` is an array of { preview } objects; reordering and
 * removal are reported back up rather than managed locally, so the
 * wizard's single source of truth stays in one place.
 */
export default function GalleryUploader({ images, onAddFiles, onReorder, onRemove }) {
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) onAddFiles(e.dataTransfer.files);
  }

  function handleThumbDrop(dropIndex) {
    if (dragIndex === null || dragIndex === dropIndex) return;
    const next = [...images];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(dropIndex, 0, moved);
    onReorder(next);
    setDragIndex(null);
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('gallery-file-input').click()}
        className={cn(
          'border-[1.5px] border-dashed rounded-md p-5 flex items-center gap-3.5 cursor-pointer transition-colors',
          dragOver ? 'border-primary bg-primary-soft' : 'border-border-strong hover:border-primary hover:bg-primary-soft'
        )}
      >
        <input
          id="gallery-file-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files.length && onAddFiles(e.target.files)}
        />
        <div className="w-[42px] h-[42px] rounded-[10px] bg-gray-100 text-ink-secondary flex items-center justify-center flex-shrink-0">
          <UploadCloud size={20} strokeWidth={1.75} />
        </div>
        <div>
          <b className="block text-[13.5px] font-semibold">Drag &amp; drop images here</b>
          <span className="text-xs text-ink-tertiary">or click to browse — multiple files supported</span>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5">
          {images.map((img, i) => (
            <div
              key={i}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleThumbDrop(i)}
              className={cn('relative aspect-square rounded-[10px] overflow-hidden border border-border cursor-grab', dragIndex === i && 'opacity-40')}
            >
              <img src={img.preview} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1.5 right-1.5 w-[22px] h-[22px] rounded-full bg-ink/55 text-white flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
