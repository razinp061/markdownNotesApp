import type { Note } from '../types/note';
import { cleanTags } from '../utils/tags';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteListItem({
  note,
  isSelected,
  onSelect,
  onDelete,
}: NoteListItemProps) {
  const tags = cleanTags(note.tags);

  return (
    <li className={`note-list-item${isSelected ? ' selected' : ''}`}>
      <button className="note-list-item-main" onClick={() => onSelect(note.id)}>
        <div className="note-list-item-title">{note.title || 'Untitled'}</div>
        {tags.length > 0 && (
          <div className="note-list-item-tags">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="note-list-item-date">
          {new Date(note.updatedAt).toLocaleString()}
        </div>
      </button>
      <button
        className="note-list-item-delete"
        aria-label="Delete note"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        ×
      </button>
    </li>
  );
}
