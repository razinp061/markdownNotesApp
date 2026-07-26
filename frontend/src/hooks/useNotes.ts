import { useCallback, useEffect, useState } from 'react';
import { notesApi } from '../api/notes';
import type { CreateNoteDto, Note, UpdateNoteDto } from '../types/note';
import { deriveTagOptions } from '../utils/tags';

export function useNotes() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAll = useCallback(async () => {
    const result = await notesApi.list();
    setAllNotes(result);
    return result;
  }, []);

  const refreshFiltered = useCallback(
    async (tag: string | undefined, unfiltered: Note[]) => {
      if (!tag) {
        setNotes(unfiltered);
        return;
      }
      const result = await notesApi.list(tag);
      setNotes(result);
    },
    [],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await refreshAll();
      await refreshFiltered(selectedTag, result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [refreshAll, refreshFiltered, selectedTag]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);

  const createNote = useCallback(
    async (dto: CreateNoteDto) => {
      setError(null);
      try {
        const created = await notesApi.create(dto);
        await refresh();
        return created;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create note');
        throw err;
      }
    },
    [refresh],
  );

  const updateNote = useCallback(
    async (id: string, dto: UpdateNoteDto) => {
      setError(null);
      try {
        const updated = await notesApi.update(id, dto);
        await refresh();
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update note');
        throw err;
      }
    },
    [refresh],
  );

  const deleteNote = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await notesApi.remove(id);
        await refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete note');
        throw err;
      }
    },
    [refresh],
  );

  return {
    notes,
    allNotes,
    tagOptions: deriveTagOptions(allNotes),
    selectedTag,
    setSelectedTag,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
  };
}
