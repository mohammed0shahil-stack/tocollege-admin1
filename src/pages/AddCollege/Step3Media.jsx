import { Image as ImageIcon, FileText } from 'lucide-react';
import UploadBox from '../../components/ui/UploadBox';
import GalleryUploader from '../../components/wizard/GalleryUploader';
import VideoEmbedInput from '../../components/wizard/VideoEmbedInput';
import { formatBytes } from '../../utils/formatters';
import { Trash2 } from 'lucide-react';
import IconButton from '../../components/ui/IconButton';

/** Step 3 — writes to the `college_media` table: cover, gallery, videos, brochure. */
export default function Step3Media({ wizard }) {
  const {
    mediaCover, handleMediaCoverFile, setMediaCover,
    gallery, addGalleryFiles, removeGalleryImage, reorderGallery,
    videos, addVideo, removeVideo,
    brochure, handleBrochureFile, setBrochure,
  } = wizard;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Media</h2>
      <p className="text-[13.5px] text-ink-secondary mb-8">Photos and video help students picture campus life before they apply.</p>

      <div className="flex flex-col gap-1.5">
        <span className="text-[12.5px] font-medium">Cover image</span>
        <UploadBox
          icon={ImageIcon}
          subtitle="Shown at the top of the college page"
          preview={mediaCover?.preview}
          onFile={handleMediaCoverFile}
          onRemove={() => setMediaCover(null)}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-[14.5px] font-semibold">Gallery images</h4>
        <p className="text-xs text-ink-tertiary mt-0.5 mb-4">Drag to reorder. Drag and drop or click to add more.</p>
        <GalleryUploader images={gallery} onAddFiles={addGalleryFiles} onReorder={reorderGallery} onRemove={removeGalleryImage} />
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-[14.5px] font-semibold">Campus videos</h4>
        <p className="text-xs text-ink-tertiary mt-0.5 mb-4">Paste a YouTube or Vimeo link.</p>
        <VideoEmbedInput videos={videos} onAdd={addVideo} onRemove={removeVideo} />
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-[14.5px] font-semibold">College brochure</h4>
        <p className="text-xs text-ink-tertiary mt-0.5 mb-4">PDF format, up to 10MB.</p>
        {brochure ? (
          <div className="flex items-center gap-3 p-3.5 px-4 border border-border rounded-md bg-[#FBFBFA]">
            <div className="w-[38px] h-[38px] rounded-[9px] bg-destructive-soft text-destructive flex items-center justify-center flex-shrink-0">
              <FileText size={17} />
            </div>
            <div className="flex-1">
              <b className="text-[13px] block">{brochure.name}</b>
              <span className="text-xs text-ink-tertiary">{formatBytes(brochure.size)}</span>
            </div>
            <IconButton icon={Trash2} label="Remove brochure" danger onClick={() => setBrochure(null)} />
          </div>
        ) : (
          <UploadBox
            icon={FileText}
            title="Click or drag to upload PDF"
            subtitle="Prospectus, fee structure, etc."
            accept="application/pdf"
            onFile={handleBrochureFile}
          />
        )}
      </div>
    </div>
  );
}
