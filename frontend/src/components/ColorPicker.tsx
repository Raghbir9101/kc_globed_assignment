import React from 'react';
import { NoteColor } from '../types';
import { Circle } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: NoteColor;
  onColorSelect: (color: NoteColor) => void;
}

const colors: { value: NoteColor; label: string; className: string }[] = [
  { value: 'default', label: 'Default', className: 'bg-white border border-gray-200' },
  { value: 'red', label: 'Red', className: 'bg-red-100' },
  { value: 'orange', label: 'Orange', className: 'bg-orange-100' },
  { value: 'yellow', label: 'Yellow', className: 'bg-yellow-100' },
  { value: 'green', label: 'Green', className: 'bg-green-100' },
  { value: 'teal', label: 'Teal', className: 'bg-teal-100' },
  { value: 'blue', label: 'Blue', className: 'bg-blue-100' },
  { value: 'purple', label: 'Purple', className: 'bg-purple-100' },
  { value: 'pink', label: 'Pink', className: 'bg-pink-100' },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {colors.map((color) => (
        <button
          key={color.value}
          aria-label={`Select ${color.label} color`}
          title={color.label}
          className={`${
            color.className
          } h-7 w-7 rounded-full flex items-center justify-center transition-transform ${
            selectedColor === color.value ? 'ring-2 ring-gray-400 scale-110' : ''
          } hover:scale-110`}
          onClick={() => onColorSelect(color.value)}
        >
          {selectedColor === color.value && (
            <Circle className="h-3 w-3 fill-current text-gray-500" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;