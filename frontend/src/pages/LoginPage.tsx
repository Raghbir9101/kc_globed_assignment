import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StickyNote } from 'lucide-react';
import { AuthService } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector(state => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await AuthService.login(dispatch, { email, password });
      navigate('/notes');
    } catch (err) {
      // Error is handled by the auth reducer
    }
  };

  if(user) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <StickyNote className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to QuickNotes
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your notes
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;