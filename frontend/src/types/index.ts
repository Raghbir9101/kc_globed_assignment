export type NoteColor = 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink';

export interface Note {
  id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  color: NoteColor;
  user: {
    id: number;
    email: string;
    username: string;
  };
  created_at: string;
  updated_at: string;
}