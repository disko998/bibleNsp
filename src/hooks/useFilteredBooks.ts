import React from 'react';
import { BookGroups, FilterBooks } from '../const/enums';
import { useBooksStore } from '../store/booksStore';
import { useSearchStore } from '../store/searchStore';

export default function useFilteredBooks() {
  const selectedGroup = useSearchStore(state => state.selectedGroup);
  const books = useBooksStore(state => state.books);

  const filteredBooks = React.useMemo(() => {
    switch (selectedGroup) {
      case FilterBooks.ALL:
        return books;
      case FilterBooks.OLD_TESTAMENT:
        return books.filter(b =>
          [BookGroups.TORA, BookGroups.PROPHETS, BookGroups.WRITINGS].includes(
            b.group,
          ),
        );
      case FilterBooks.TORA:
        return books.filter(b => b.group === BookGroups.TORA);
      case FilterBooks.PROPHETS:
        return books.filter(b => b.group === BookGroups.PROPHETS);
      case FilterBooks.WRITINGS:
        return books.filter(b => b.group === BookGroups.WRITINGS);
      case FilterBooks.NEW_TESTAMENT:
        return books.filter(b => b.group === BookGroups.NEW_TESTAMENT);
      default:
        return books;
    }
  }, [selectedGroup, books]);

  return filteredBooks;
}
