import { useState, useEffect } from 'react';
import Header from './Header';
import NoteForm from './NoteForm';
import NoteGrid from './NoteGrid';
import Toast from './Toast';

function NotesApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toast, setToast] = useState({
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
    isVisible: false,
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-xl mx-auto mb-6 sm:mb-8">
          <NoteForm />
        </div>
        
        <NoteGrid />
      </main>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}

export default NotesApp;