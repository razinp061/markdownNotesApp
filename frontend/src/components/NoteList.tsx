import type { Note } from '../types/note';
import { NoteListItem } from './NoteListItem';

interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteList({
  notes,
  selectedId,
  onSelect,
  onDelete,
}: NoteListProps) {
  if (notes.length === 0) {
    return <div className="note-list-empty">No notes yet.</div>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          isSelected={note.id === selectedId}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
