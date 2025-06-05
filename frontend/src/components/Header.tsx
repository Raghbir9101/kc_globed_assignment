import React, { useState, useRef, useEffect } from 'react';
import { StickyNote, LogOut, User } from 'lucide-react';
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthService } from '@/services/api';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    AuthService.prototype.logout(dispatch);
    navigate('/login');
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-shrink-0">
            <StickyNote className="h-6 w-6 text-yellow-500 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hidden sm:block">QuickNotes</h1>
          </div>

          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">

            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User className="h-5 w-5 text-gray-600" />
              </Button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;