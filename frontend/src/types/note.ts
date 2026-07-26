export interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  body: string;
  tags?: string[];
}

export type UpdateNoteDto = Partial<CreateNoteDto>;
