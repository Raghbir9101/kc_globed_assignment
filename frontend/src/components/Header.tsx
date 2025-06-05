import React from 'react';
import { StickyNote, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { AuthService } from '@/services/api';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.prototype.logout(dispatch);
    navigate('/login');
  };

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

          <div className="flex items-center gap-2">

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="sm:hidden"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;