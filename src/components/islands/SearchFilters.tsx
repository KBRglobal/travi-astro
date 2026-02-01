import { useState } from 'react';

interface SearchFiltersProps {
  lang: string;
  filters: Record<string, string>;
  searchPlaceholder: string;
  searchButton: string;
}

export default function SearchFilters({
  lang,
  filters,
  searchPlaceholder,
  searchButton,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery, 'Filters:', activeFilters);
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
        <div className="flex gap-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
          >
            {searchButton}
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(filters).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              activeFilters.includes(key)
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-accent'
            }`}
          >
            {label as string}
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {filters[filter]}
              <button
                onClick={() => toggleFilter(filter)}
                className="hover:text-primary/80"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => setActiveFilters([])}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
