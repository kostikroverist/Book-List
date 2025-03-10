export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: string; // ISO date string
  editedAt?: string | null; // ISO date string | undefined
  isActive: boolean;
}


