import { BookGroups, BooksAlias } from './enums';

export type Book = {
  title: string;
  original_title: string;
  group: BookGroups;
  hebrew_title: string;
  chapters: {
    [key: string]: { [key: string]: string };
  };
  alias: BooksAlias;
  bookIndex: number;
};

export type Verse = {
  text: string;
  book_title: string;
  chapter: string;
  verse: string;
};

export type Marker = {
  color: string;
  label: string;
};

export type MarkedVerse = {
  verseKey: string;
  marker: Marker;
};
