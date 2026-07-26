import { request } from './client';
import type { CreateNoteDto, Note, UpdateNoteDto } from '../types/note';

export const notesApi = {
  list(tag?: string): Promise<Note[]> {
    const query = tag ? `?tag=${encodeURIComponent(tag)}` : '';
    return request<Note[]>(`/notes${query}`);
  },

  get(id: string): Promise<Note> {
    return request<Note>(`/notes/${id}`);
  },

  create(dto: CreateNoteDto): Promise<Note> {
    return request<Note>('/notes', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  update(id: string, dto: UpdateNoteDto): Promise<Note> {
    return request<Note>(`/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
  },

  remove(id: string): Promise<void> {
    return request<void>(`/notes/${id}`, { method: 'DELETE' });
  },
};
