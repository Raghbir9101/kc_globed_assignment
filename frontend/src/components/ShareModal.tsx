import React, { useState } from 'react';
import { Note } from '../types';
import { Mail, X, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, note }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    // Here we'd normally send the actual email, but we're just simulating
    setIsSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Share Note</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {isSubmitted ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={24} />
            </div>
            <p className="text-center text-gray-700 mb-2">Note shared successfully!</p>
            <p className="text-center text-gray-500 text-sm">
              An email has been sent to {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                Share "{note.title || 'Untitled Note'}" via email
              </p>
              
              <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400">
                <div className="p-3 bg-gray-50 border-r">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValid(true);
                  }}
                  placeholder="Enter email address"
                  className="flex-1 p-3 outline-none"
                  required
                />
              </div>
              
              {!isValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Share
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShareModal;