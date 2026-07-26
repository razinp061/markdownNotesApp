import { useState } from 'react';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { TagFilterDropdown } from './components/TagFilterDropdown';
import { useNotes } from './hooks/useNotes';
import type { Note } from './types/note';

function App() {
  const {
    notes,
    allNotes,
    tagOptions,
    selectedTag,
    setSelectedTag,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const [selectedNoteId, setSelectedNoteId] = useState<string | 'new' | null>(
    null,
  );

  const selectedNote: Note | null =
    selectedNoteId && selectedNoteId !== 'new'
      ? (allNotes.find((n) => n.id === selectedNoteId) ?? null)
      : null;

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this note?')) return;
    await deleteNote(id);
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Markdown Notes</h1>
        <TagFilterDropdown
          tags={tagOptions}
          value={selectedTag}
          onChange={setSelectedTag}
        />
        <button onClick={() => setSelectedNoteId('new')}>New Note</button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="app-layout">
        <aside className="app-sidebar">
          {loading ? (
            <div className="note-list-empty">Loading...</div>
          ) : (
            <NoteList
              notes={notes}
              selectedId={
                selectedNoteId && selectedNoteId !== 'new'
                  ? selectedNoteId
                  : null
              }
              onSelect={setSelectedNoteId}
              onDelete={handleDelete}
            />
          )}
        </aside>

        <main className="app-main">
          {selectedNoteId ? (
            <NoteEditor
              note={selectedNote}
              onSave={async (dto) => {
                if (selectedNoteId === 'new') {
                  const created = await createNote(dto);
                  setSelectedNoteId(created.id);
                } else {
                  await updateNote(selectedNoteId, dto);
                }
              }}
              onDelete={
                selectedNoteId !== 'new'
                  ? () => handleDelete(selectedNoteId)
                  : undefined
              }
              onCancel={() => setSelectedNoteId(null)}
            />
          ) : (
            <div className="note-editor-placeholder">
              Select a note or create a new one.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
