interface TagFilterDropdownProps {
  tags: string[];
  value: string | undefined;
  onChange: (tag: string | undefined) => void;
}

export function TagFilterDropdown({
  tags,
  value,
  onChange,
}: TagFilterDropdownProps) {
  return (
    <select
      className="tag-filter-dropdown"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || undefined)}
    >
      <option value="">All tags</option>
      {tags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}
