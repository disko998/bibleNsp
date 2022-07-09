import React from 'react';
import { Book, Verse } from '../const/types';

export default function useSearch() {
  const [result, setResult] = React.useState<Verse[]>([]);

  const onSearch = React.useCallback(
    async (searchableBooks: Book[], searchTerm: string) => {
      let searchResults: Verse[] = [];
      const search = searchTerm.toLowerCase().trim();

      if (search) {
        searchableBooks.forEach(book => {
          Object.keys(book.chapters).forEach(chapter => {
            Object.keys(book.chapters[chapter]).forEach(verse => {
              const text = book.chapters[chapter][verse];
              if (text.toLowerCase().trim().includes(search)) {
                // save the result
                searchResults.push({
                  book_title: book.title,
                  chapter: chapter,
                  verse: verse,
                  text: text,
                });
              }
            });
          });
        });
      }

      setResult(searchResults);
    },
    [],
  );

  return { onSearch, result };
}
