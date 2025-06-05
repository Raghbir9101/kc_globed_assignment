import { Note } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setSearchQuery,
  clearError
} = notesSlice.actions;

export default notesSlice.reducer;
