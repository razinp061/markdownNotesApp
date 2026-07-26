import { useEffect, useState } from 'react';
import type { CreateNoteDto, Note } from '../types/note';
import { cleanTags } from '../utils/tags';
import { MarkdownPreview } from './MarkdownPreview';

interface NoteEditorProps {
  note: Note | null;
  onSave: (dto: CreateNoteDto) => Promise<unknown>;
  onDelete?: () => Promise<unknown>;
  onCancel: () => void;
}

export function NoteEditor({
  note,
  onSave,
  onDelete,
  onCancel,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [body, setBody] = useState(note?.body ?? '');
  const [tagsInput, setTagsInput] = useState(
    cleanTags(note?.tags).join(', '),
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(note?.title ?? '');
    setBody(note?.body ?? '');
    setTagsInput(cleanTags(note?.tags).join(', '));
  }, [note]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        title,
        body,
        tags: cleanTags(tagsInput.split(',')),
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm('Delete this note?')) return;
    await onDelete();
  };

  return (
    <div className="note-editor">
      <div className="note-editor-fields">
        <input
          className="note-title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="note-tags-input"
          placeholder="Tags (comma separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div className="note-editor-split">
        <textarea
          className="note-body-input"
          placeholder="Write markdown here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <MarkdownPreview body={body} />
      </div>

      <div className="note-editor-actions">
        <button onClick={handleSave} disabled={saving || !title.trim()}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        {note && onDelete && (
          <button
            className="danger"
            onClick={handleDelete}
            disabled={saving}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
