import React, { useState, useRef, useEffect } from 'react';
import { NoteColor } from '../types';
import { Palette } from 'lucide-react';
import ColorPicker from './ColorPicker';
import { useAppDispatch } from '@/store/hooks';
import { NotesService } from '@/services/api';

interface NoteFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialColor?: NoteColor;
  noteId?: string | number;
  onCancel?: () => void;
  isEditing?: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({
  initialTitle = '',
  initialContent = '',
  initialColor = 'default',
  noteId,
  onCancel,
  isEditing = false,
}) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(!!initialTitle || !!initialContent || isEditing);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [color, setColor] = useState<NoteColor>(initialColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  // Get color background class based on the selected color
  const getColorClass = () => {
    switch (color) {
      case 'red': return 'bg-red-100';
      case 'orange': return 'bg-orange-100';
      case 'yellow': return 'bg-yellow-100';
      case 'green': return 'bg-green-100';
      case 'teal': return 'bg-teal-100';
      case 'blue': return 'bg-blue-100';
      case 'purple': return 'bg-purple-100';
      case 'pink': return 'bg-pink-100';
      default: return 'bg-white';
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, title, content]);

  const handleFocus = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => {
        if (contentInputRef.current) {
          contentInputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle || trimmedContent) {
      try {
        if (isEditing && noteId) {
          await NotesService.updateNote(dispatch, noteId, {
            title: trimmedTitle,
            content: trimmedContent,
            color
          });
        } else {
          await NotesService.createNote(dispatch, {
            title: trimmedTitle,
            content: trimmedContent,
            color,
            is_pinned: false
          });
        }

        if (onCancel) {
          onCancel();
        } else {
          setTitle('');
          setContent('');
          setColor('default');
          setIsExpanded(false);
          setShowColorPicker(false);
        }
      } catch (error) {
        // Error is handled by the notes reducer
        console.error('Failed to save note:', error);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setTitle('');
      setContent('');
      setColor('default');
      setIsExpanded(false);
      setShowColorPicker(false);
    }
  };

  return (
    <form
      ref={formRef}
      className={`${getColorClass()} rounded-lg shadow-md transition-all overflow-hidden mb-6 mx-auto max-w-md border border-gray-200`}
    >
      {isExpanded && (
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 outline-none font-medium text-lg ${getColorClass()}`}
        />
      )}
      <div onClick={handleFocus} className="cursor-text">
        <textarea
          ref={contentInputRef}
          placeholder={isExpanded ? "Take a note..." : "Take a note..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full p-3 outline-none resize-none ${getColorClass()} min-h-[40px] ${isExpanded ? 'h-32' : 'h-12'
            }`}
        />
      </div>

      {isExpanded && (
        <div className="flex justify-between items-center p-2 border-t border-gray-200">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Change note color"
              className="text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Palette size={18} />
            </button>

            {showColorPicker && (
              <div className="absolute mt-10 bg-white shadow-lg rounded-lg z-10 border border-gray-200">
                <ColorPicker selectedColor={color} onColorSelect={(newColor) => {
                  setColor(newColor);
                  setShowColorPicker(false);
                }} />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-1.5 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              onClick={handleSubmit}
            >
              {isEditing ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NoteForm;