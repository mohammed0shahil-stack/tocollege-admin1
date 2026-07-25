import { useState } from 'react';
import { PlayCircle, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';
import { parseVideoUrl } from '../../utils/formatters';
import { useToast } from '../../hooks/useToast';

/** Paste a YouTube/Vimeo link, parse it, and show a live embedded preview. */
export default function VideoEmbedInput({ videos, onAdd, onRemove }) {
  const [url, setUrl] = useState('');
  const { showToast } = useToast();

  function handleAdd() {
    const parsed = parseVideoUrl(url.trim());
    if (!parsed) {
      showToast('Paste a valid YouTube or Vimeo link');
      return;
    }
    onAdd(parsed);
    setUrl('');
  }

  return (
    <div>
      <div className="flex gap-2.5 mb-2.5">
        <Input
          className="flex-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=... or vimeo.com/..."
        />
        <Button variant="secondary" className="flex-shrink-0 self-start" onClick={handleAdd}>Add video</Button>
      </div>
      {videos.map((v, i) => (
        <div key={i} className="mb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <Badge tone="closed"><PlayCircle size={13} className="mr-1" />{v.type}</Badge>
            <IconButton icon={Trash2} label="Remove video" danger size={7} onClick={() => onRemove(i)} />
          </div>
          <div className="rounded-md overflow-hidden border border-border bg-black aspect-video">
            <iframe src={v.embed} className="w-full h-full border-0" allowFullScreen loading="lazy" title={`Video ${i + 1}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
