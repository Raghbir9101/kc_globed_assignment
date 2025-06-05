import React, { useState } from 'react';
import { Note as NoteType, NoteColor } from '../types';
import { Trash, Share, Pin, Palette } from 'lucide-react';
import ShareModal from './ShareModal';
import ColorPicker from './ColorPicker';
import NoteForm from './NoteForm';
import { NotesService } from '@/services/api';
import { useAppDispatch } from '@/store/hooks';

interface NoteProps {
  note: NoteType;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const deleteNote = async (id: number) => {
    NotesService.deleteNote(dispatch, id)
  };
  const pinNote = (id: number) => {
    NotesService.updateNote(dispatch, id, { is_pinned: !note.is_pinned });
  };
  const changeNoteColor = async (id: number, color: NoteColor) => {
    NotesService.updateNote(dispatch, id, { color });
  }
  const getColorClass = () => {
    switch (note.color) {
      case 'red': return 'bg-red-100 hover:bg-red-200';
      case 'orange': return 'bg-orange-100 hover:bg-orange-200';
      case 'yellow': return 'bg-yellow-100 hover:bg-yellow-200';
      case 'green': return 'bg-green-100 hover:bg-green-200';
      case 'teal': return 'bg-teal-100 hover:bg-teal-200';
      case 'blue': return 'bg-blue-100 hover:bg-blue-200';
      case 'purple': return 'bg-purple-100 hover:bg-purple-200';
      case 'pink': return 'bg-pink-100 hover:bg-pink-200';
      default: return 'bg-white hover:bg-gray-50';
    }
  };

  if (isEditing) {
    return (
      <div className="animate-fade-in h-full">
        <NoteForm
          noteId={note.id}
          initialTitle={note.title}
          initialContent={note.content}
          initialColor={note.color}
          isEditing={true}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={`${getColorClass()} relative rounded-lg border border-gray-200 shadow-sm 
          transition-all duration-200 flex flex-col h-full group hover:shadow-md`}
      >
        {note.is_pinned && (
          <div className="absolute top-0 right-0">
            <div className="w-0 h-0 border-t-[24px] border-t-gray-800 border-l-[24px] border-l-transparent"></div>
          </div>
        )}
        <div
          className="p-4 cursor-pointer flex-1 flex flex-col"
          onClick={() => setIsEditing(true)}
        >
          {note.title && (
            <h3 className="font-medium text-gray-900 mb-1 break-words">{note.title}</h3>
          )}
          <p className="text-gray-700 whitespace-pre-wrap break-words flex-1">{note.content}</p>
        </div>

        <div className="p-2 flex justify-between items-center border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-1">
            <button
              aria-label="Delete note"
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
            >
              <Trash size={16} />
            </button>
            <button
              aria-label="Pin note"
              className={`p-1.5 hover:bg-gray-200 rounded-full transition-colors ${note.is_pinned ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={(e) => {
                e.stopPropagation();
                pinNote(note.id);
              }}
            >
              <Pin size={16} />
            </button>
            <div className="relative">
              <button
                aria-label="Change note color"
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                }}
              >
                <Palette size={16} />
              </button>

              {showColorPicker && (
                <div
                  className="absolute bottom-full left-0 bg-white shadow-lg rounded-lg z-10 border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ColorPicker
                    selectedColor={note.color}
                    onColorSelect={(color: NoteColor) => {
                      changeNoteColor(note.id, color);
                      setShowColorPicker(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <span className="text-xs text-gray-400">
            {new Date(note.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        note={note}
      />
    </>
  );
};

export default Note;