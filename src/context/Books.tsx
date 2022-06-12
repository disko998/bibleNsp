import React, { FC, useCallback, useState } from 'react';

import { Book } from '../const/types';
import { groupBooks } from '../utils/helpers';
import { books } from '../_data';

const groupedBooks = groupBooks(books);

export type BooksContextType = {
  books: Book[];
  groupedBooks: { [key: string]: Book[] };
  selectedBook: Book;
  setSelectedBook: (book: Book) => void;
  selectedChapter: number;
  setSelectedChapter: (chapter: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export const BooksContext = React.createContext<BooksContextType>({
  books: [],
  groupedBooks: {},
  setSelectedBook: () => {},
  setSelectedChapter: () => {},
  selectedChapter: 1,
  selectedBook: books[0],
  onPrev: () => {},
  onNext: () => {},
});

const BooksProvider: FC = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const onNext = useCallback(() => {
    const nextChapter = selectedChapter + 1;

    if (nextChapter > Object.keys(selectedBook.chapters).length + 1) {
      // next book
      const currentBookIndex = books.findIndex(
        b => b.title === selectedBook.title,
      );
      const nextBook = books[currentBookIndex + 1];
      if (nextBook) {
        setSelectedBook(nextBook);
        setSelectedChapter(1);
      }
    } else {
      // next chapter
      setSelectedChapter(nextChapter);
    }
  }, [selectedChapter, setSelectedChapter, selectedBook]);

  const onPrev = useCallback(() => {
    const prevChapter = selectedChapter - 1;

    if (prevChapter < 1) {
      // prev book
      const currentBookIndex = books.findIndex(
        b => b.title === selectedBook.title,
      );
      const prevBook = books[currentBookIndex - 1];
      if (prevBook) {
        setSelectedBook(prevBook);
        setSelectedChapter(Object.keys(prevBook.chapters).length + 1);
      }
    } else {
      // prev chapter
      setSelectedChapter(prevChapter);
    }
  }, [selectedChapter, setSelectedChapter, selectedBook]);

  return (
    <BooksContext.Provider
      value={{
        groupedBooks,
        books,
        selectedBook,
        setSelectedBook,
        selectedChapter,
        setSelectedChapter,
        onNext,
        onPrev,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
