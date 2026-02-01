import { useState, useMemo } from 'react';

interface SearchFiltersProps {
  lang: string;
  filters: Record<string, string>;
  searchPlaceholder: string;
  searchButton: string;
  items?: any[]; // Optional - items to filter
  onFilterChange?: (filtered: any[]) => void; // Optional callback
}

export default function SearchFilters({
  lang,
  filters,
  searchPlaceholder,
  searchButton,
  items = [],
  onFilterChange,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Filter items based on search query and active filters
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    let filtered = items;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        // Search in title, name, description
        const searchable = [
          item.title,
          item.name,
          item.description,
          item.excerpt,
          item.category,
          item.cuisine,
          item.tags?.join(' '),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchable.includes(query);
      });
    }

    // Apply category filters
    if (activeFilters.length > 0 && !activeFilters.includes('all')) {
      filtered = filtered.filter((item) => {
        // Check if item matches any active filter
        return activeFilters.some((filter) => {
          // Match by category
          if (item.category?.toLowerCase() === filter.toLowerCase()) {
            return true;
          }

          // Match by cuisine (for restaurants)
          if (item.cuisine?.toLowerCase() === filter.toLowerCase()) {
            return true;
          }

          // Match by star rating (for hotels)
          if (filter === 'luxury' && item.starRating === 5) {
            return true;
          }
          if (filter === 'upscale' && item.starRating === 4) {
            return true;
          }
          if (filter === 'midrange' && item.starRating === 3) {
            return true;
          }
          if (filter === 'budget' && item.starRating <= 2) {
            return true;
          }

          return false;
        });
      });
    }

    return filtered;
  }, [items, searchQuery, activeFilters]);

  // Notify parent component when filters change
  useMemo(() => {
    if (onFilterChange) {
      onFilterChange(filteredItems);
    }
  }, [filteredItems, onFilterChange]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => {
      // If clicking 'all', clear all filters
      if (filter === 'all') {
        return [];
      }

      // If filter is already active, remove it
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      }

      // Add new filter
      return [...prev, filter];
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveFilters([]);
    setShowResults(false);
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(false);
              }}
              placeholder={searchPlaceholder}
              className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
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
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              activeFilters.includes(key) || (key === 'all' && activeFilters.length === 0)
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-background hover:bg-accent hover:border-primary/30'
            }`}
          >
            {label as string}
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span className="text-sm text-muted-foreground font-medium">
            {lang === 'he' || lang === 'ar' ? 'מסננים פעילים:' : 'Active filters:'}
          </span>
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {filters[filter]}
              <button
                onClick={() => toggleFilter(filter)}
                className="hover:text-primary/80 ml-1"
                aria-label="Remove filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m18 6-12 12" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </span>
          ))}
          <button
            onClick={() => setActiveFilters([])}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            {lang === 'he' || lang === 'ar' ? 'נקה הכל' : 'Clear all'}
          </button>
        </div>
      )}

      {/* Search Results Summary */}
      {items.length > 0 && (searchQuery || activeFilters.length > 0) && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {lang === 'he' || lang === 'ar' ? (
              <>
                מציג <span className="font-semibold text-foreground">{filteredItems.length}</span> מתוך{' '}
                <span className="font-semibold">{items.length}</span> תוצאות
              </>
            ) : (
              <>
                Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> of{' '}
                <span className="font-semibold">{items.length}</span> results
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
