import { Book, Verse } from '../const/types';

export const groupBooks = (books: Book[]): { [key: string]: Book[] } => {
  let groups: { [key: string]: Book[] } = {};

  books.forEach(book => {
    groups[book.group] = [...(groups[book.group] || []), book];
  });

  return groups;
};

export const booksToArray = (books: { [key: string]: any }): Book[] => {
  return Object.keys(books).map(key => ({ ...books[key], title: key }));
};

export const stringifyVerse = (verse?: Verse): string =>
  `${verse?.book_title} ${verse?.chapter}:${verse?.verse}\n${verse?.text}`;

export const parseVerse = (verseId: string): Verse => {
  const [metadata, text] = verseId.split('\n');
  const [bookTitle, rest] = metadata.split(' ');
  const [chapter, verse] = rest.split(':');

  return {
    book_title: bookTitle,
    chapter: chapter,
    verse: verse,
    text,
  };
};
