import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Drag-and-drop (or click-to-browse) file upload with an image preview.
 * Fully controlled: the parent owns the preview URL and passes it back in,
 * so re-opening the wizard on an existing college can pre-fill this too.
 *
 * Props:
 *  - icon: lucide icon component shown when empty
 *  - title / subtitle: helper copy inside the dropzone
 *  - accept: input accept attribute
 *  - preview: current preview URL, or null/undefined when empty
 *  - onFile(file): called with the raw File when one is selected/dropped
 *  - onRemove(): called when the remove button on the preview is clicked
 *  - previewHeight: tailwind height class for the preview image
 */
export default function UploadBox({
  icon: Icon,
  title = 'Click or drag to upload',
  subtitle,
  accept = 'image/*',
  preview,
  onFile,
  onRemove,
  previewHeight = 'h-[150px]',
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const file = fileList?.[0];
    if (file) onFile(file);
  }

  if (preview) {
    return (
      <div className={cn('relative w-full rounded-md overflow-hidden border border-border', previewHeight)}>
        <img src={preview} alt="Uploaded preview" className="w-full h-full object-cover" />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/55 backdrop-blur flex items-center justify-center text-white hover:bg-ink/75 transition-colors"
          aria-label="Remove image"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'relative border-[1.5px] border-dashed rounded-md p-5 flex items-center gap-3.5 cursor-pointer transition-colors',
        dragOver ? 'border-primary bg-primary-soft' : 'border-border-strong hover:border-primary hover:bg-primary-soft'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="w-[42px] h-[42px] rounded-[10px] bg-gray-100 text-ink-secondary flex items-center justify-center flex-shrink-0">
        {Icon && <Icon size={20} strokeWidth={1.75} />}
      </div>
      <div>
        <b className="block text-[13.5px] font-semibold">{title}</b>
        {subtitle && <span className="text-xs text-ink-tertiary">{subtitle}</span>}
      </div>
    </div>
  );
}
