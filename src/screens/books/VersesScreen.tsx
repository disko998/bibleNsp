import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Heading } from 'native-base';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import ReaderNavigation from '../../components/ReaderNavigation';
import VerseList from '../../components/VersesList';
import { routes } from '../../const/routes';
import { Verse } from '../../const/types';
import { useBooksStore } from '../../store/booksStore';

type Props = NativeStackScreenProps<BooksStackParamList, routes.VERSES> & {};

const VersesScreen: React.FC<Props> = ({ navigation }) => {
  const selectedChapter = useBooksStore(state => state.selectedChapter);
  const selectedBook = useBooksStore(state => state.selectedBook);
  const onNext = useBooksStore(state => state.onNext);
  const onPrev = useBooksStore(state => state.onPrev);

  const chapter = selectedBook.chapters[selectedChapter];
  const verses: Verse[] = Object.keys(chapter).map(verse => ({
    book_title: selectedBook.title,
    chapter: selectedChapter.toString(),
    text: chapter[verse],
    verse,
  }));

  const listRef = useRef<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      header: () => {
        return (
          <ReaderNavigation
            onChapterPress={() => navigation.navigate(routes.CHAPTERS)}
            onBookPress={() => navigation.navigate(routes.BOOKS)}
            chapter={selectedChapter}
            onNext={onNext}
            onPrev={onPrev}
            title={`${selectedBook.title}`}
          />
        );
      },
      headerTitle: ({ children }) => {
        return (
          <Center bg="blue.500" left={0} right={0}>
            <Heading fontSize={15}>{children}</Heading>
          </Center>
        );
      },
    });
  }, [onNext, onPrev, selectedChapter, selectedBook, navigation]);

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [selectedChapter, selectedBook]);

  return (
    <DefaultLayout>
      <VerseList ref={listRef} verses={verses} hideChapter />
    </DefaultLayout>
  );
};

export default VersesScreen;
