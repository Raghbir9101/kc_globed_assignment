import React, { useEffect } from 'react';
import Note from './Note';
import { StickyNote } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NotesService } from '@/services/api';

const NoteGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notes, searchQuery } = useAppSelector(state => state.notes);

  useEffect(() => {
    NotesService.fetchNotes(dispatch);
  }, [dispatch]);

  const filteredNotes = searchQuery
    ? notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : notes;
  
  const pinnedNotes = (filteredNotes || []).filter(note => note.is_pinned);
  const unpinnedNotes = (filteredNotes || []).filter(note => !note.is_pinned);

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <StickyNote size={64} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-700 mb-2">No notes yet</h2>
        <p className="text-gray-500">
          {filteredNotes.length === 0
            ? "Add your first note to get started"
            : "No notes match your search"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {filteredNotes.length > 0 && <div className="mb-8">
        <div className="mb-2 px-2 flex items-center">
          <span className="text-lg font-medium text-gray-500">Your Notes</span>
          <div className="ml-2 h-px bg-gray-200 flex-1"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pinnedNotes.map((note: any) => (
            <Note key={note.id} note={note} />
          ))}
          {unpinnedNotes.map((note: any) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>}
    </div>
  );
};

export default NoteGrid;