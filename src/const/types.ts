import { BookGroups, BooksAlias } from './enums';

export type Book = {
  title: string;
  original_title: string;
  group: BookGroups;
  hebrew_title: string;
  chapters: Chapter;
  alias: BooksAlias;
  bookIndex: number;
};

export type Chapter = {
  [key: string]: Verses;
};

export type Verses = {
  [key: string]: string;
};

export type VerseItem = {
  text: string;
  book: Book;
  chapter: number | string;
  verse: number | string;
};
