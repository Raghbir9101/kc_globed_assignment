import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearchQuery
} from '@/store/slices/notesSlice';
const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(state => state.notes);
  const [query, setQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(query));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    dispatch(setSearchQuery(""));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`max-w-md w-full mx-auto flex items-center bg-gray-100 rounded-lg px-3 transition-all ${isFocused ? 'bg-white shadow-md' : ''
        }`}
    >
      <Search
        size={18}
        className={`text-gray-500 mr-2 ${isFocused ? 'text-gray-700' : ''}`}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search notes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="py-2.5 px-0 flex-1 bg-transparent outline-none text-gray-800"
      />
      {query && (
        <button
          onClick={handleClear}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;