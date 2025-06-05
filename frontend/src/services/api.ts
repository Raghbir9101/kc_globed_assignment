import api from '@/lib/axios';
import { Note } from '@/types';
import {
    setLoading,
    setError,
    loginSuccess,
    registerSuccess,
    logout
} from '@/store/slices/authSlice';
import {
    addNote,
    updateNote as updateNoteAction,
    deleteNote as deleteNoteAction,
    setError as setNotesError,
    setNotes
} from '@/store/slices/notesSlice';
import { AppDispatch } from '@/store';
import { toast } from "sonner"

export class AuthService {
    static async login(dispatch: AppDispatch, credentials: { email: string; password: string }) {
        dispatch(setLoading(true));
        try {
            const responsePromise = api.post('/login', credentials);
            toast.promise(responsePromise, {
                loading: 'Logging in...',
                success: 'Login successful',
                error: 'Login failed',
            });
            const response = await responsePromise;
            dispatch(loginSuccess(response.data));
        } catch (err: any) {
            dispatch(setError(err.response?.data?.error || 'Login failed'));
            throw err;
        }
    }

    static async register(dispatch: AppDispatch, userData: { email: string; password: string; username: string }) {
        dispatch(setLoading(true));
        try {
            const responsePromise = api.post('/register', userData);
            toast.promise(responsePromise, {
                loading: 'Registering...',
                success: 'Registration successful',
                error: 'Registration failed',
            });
            const response = await responsePromise;
            dispatch(registerSuccess());
            return response.data;
        } catch (err: any) {
            dispatch(setError(err.response?.data?.error || 'Registration failed'));
            throw err;
        }
    }    logout(dispatch: AppDispatch) {
        dispatch(setNotes([]));  // Clear notes first
        dispatch(logout());
        toast.success('Logout successful', {
            description: 'You have been logged out.',
            duration: 5000,
        });
    }
};

export class NotesService {
    static async fetchNotes(dispatch: AppDispatch) {
        dispatch(setLoading(true));
        try {
            const responsePromise = api.get('/notes');
            toast.promise(responsePromise, {
                loading: 'Loading notes...',
                success: 'Notes loaded successfully',
                error: 'Failed to load notes',
            });
            const response = await responsePromise;
            dispatch(setNotes(response.data));
        } catch (err: any) {
            dispatch(setNotesError(err.response?.data?.error || 'Failed to fetch notes'));
            throw err;
        }
    }

    static async createNote(dispatch: AppDispatch, noteData: Partial<Note>) {
        try {
            const responsePromise = api.post('/notes', noteData);
            toast.promise(responsePromise, {
                loading: 'Creating note...',
                success: 'Note created successfully',
                error: 'Failed to create note',
            });
            const response = await responsePromise;
            dispatch(addNote(response.data));
            return response.data;
        } catch (err: any) {
            dispatch(setNotesError(err.response?.data?.error || 'Failed to create note'));
            throw err;
        }
    }

    static async updateNote(dispatch: AppDispatch, id: number | string, noteData: Partial<Note>) {
        try {
            const responsePromise = api.put(`/notes/${id}`, noteData);
            toast.promise(responsePromise, {
                loading: 'Updating note...',
                success: 'Note updated successfully',
                error: 'Failed to update note',
            });
            const response = await responsePromise;
            dispatch(updateNoteAction(response.data));
            return response.data;
        } catch (err: any) {
            dispatch(setNotesError(err.response?.data?.error || 'Failed to update note'));
            throw err;
        }
    }

    static async deleteNote(dispatch: AppDispatch, id: number) {
        try {
            const responsePromise = api.delete(`/notes/${id}`);
            toast.promise(responsePromise, {
                loading: 'Deleting note...',
                success: 'Note deleted successfully',
                error: 'Failed to delete note',
            });
            await responsePromise
            dispatch(deleteNoteAction(id));
        } catch (err: any) {
            dispatch(setNotesError(err.response?.data?.error || 'Failed to delete note'));
            throw err;
        }
    }
};
