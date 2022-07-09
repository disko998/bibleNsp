import create from 'zustand';
import { BooksAlias, FilterBooks } from './../const/enums';

export type SearchState = {
  selectedGroup: FilterBooks;
  selectedBook?: BooksAlias;
  changeGroupFilter: (group: FilterBooks) => void;
  selectBookFilter: (book?: BooksAlias) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

export const useSearchStore = create<SearchState>(set => ({
  selectedGroup: FilterBooks.ALL,
  showFilters: true,
  changeGroupFilter: (group: FilterBooks) => set({ selectedGroup: group }),
  selectBookFilter: (book?: BooksAlias) => set({ selectedBook: book }),
  setShowFilters: (show: boolean) =>
    set({
      showFilters: show,
    }),
}));
