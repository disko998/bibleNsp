import create from 'zustand';

import { Book } from '../const/types';
import { books } from '../_data';

export type BooksState = {
  books: Book[];
  selectedBook: Book;
  selectedChapter: number;
  setSelectedBook: (book: Book) => void;
  setSelectedChapter: (chapter: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export const useBooksStore = create<BooksState>(set => ({
  books: books,
  selectedBook: books[0],
  selectedChapter: 1,
  setSelectedBook: (book: Book) => set({ selectedBook: book }),
  setSelectedChapter: (chapter: number) => set({ selectedChapter: chapter }),
  onNext: () => {
    set(state => {
      const nextChapter = state.selectedChapter + 1;
      const lastChapter = Object.keys(state.selectedBook.chapters).length + 1;

      if (nextChapter > lastChapter) {
        // next book
        const currentBookIndex = books.findIndex(
          b => b.title === state.selectedBook.title,
        );
        const nextBook = books[currentBookIndex + 1];

        if (nextBook) {
          return {
            selectedBook: nextBook,
            selectedChapter: 1,
          };
        }
      } else {
        // next chapter
        console.log(nextChapter);
        return {
          selectedChapter: nextChapter,
        };
      }

      return state;
    });
  },
  onPrev: () => {
    set(state => {
      const prevChapter = state.selectedChapter - 1;

      if (prevChapter < 1) {
        // prev book
        const currentBookIndex = books.findIndex(
          b => b.title === state.selectedBook.title,
        );
        const prevBook = books[currentBookIndex - 1];

        if (prevBook) {
          return {
            selectedBook: prevBook,
            selectedChapter: Object.keys(prevBook.chapters).length + 1,
          };
        }
      } else {
        // prev chapter
        return {
          selectedChapter: prevChapter,
        };
      }

      return state;
    });
  },
}));
