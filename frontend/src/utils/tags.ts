export function cleanTags(tags: (string | undefined)[] | undefined): string[] {
  if (!tags) return [];
  return tags
    .map((tag) => tag?.trim() ?? '')
    .filter((tag) => tag.length > 0);
}

export function deriveTagOptions(notes: { tags: string[] }[]): string[] {
  const set = new Set<string>();
  for (const note of notes) {
    for (const tag of cleanTags(note.tags)) {
      set.add(tag);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
