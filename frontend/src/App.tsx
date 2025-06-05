import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesApp from './components/NotesApp';
import './styles/animations.css';
import { useAppSelector } from './store/hooks';
import api from './lib/axios';
import { refreshLogin } from './store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

function App() {
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      let responsePromise = api.get('/refreshLogin');
      toast.promise(responsePromise, {
        loading: 'Loading user data...',
        success: 'User loaded successfully',
        error: 'Failed to refresh login',
      });

      responsePromise.then(response => {
        if (response.data) {
          dispatch(refreshLogin({ user: response.data }));
        }
      })

    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/notes"
        element={
          <RequireAuth>
            <NotesApp />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/notes" replace />} />
    </Routes>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(state => state.auth.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;