import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Heading } from 'native-base';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import ReaderNavigation from '../../components/ReaderNavigation';
import VerseList from '../../components/VersesList';
import { routes } from '../../const/routes';
import { VerseItem } from '../../const/types';
import { BooksContext } from '../../context/Books';

type Props = NativeStackScreenProps<BooksStackParamList, routes.VERSES> & {};

const VersesScreen: React.FC<Props> = ({ navigation }) => {
  const listRef = useRef<any>();
  const { selectedChapter, onNext, onPrev, selectedBook } =
    useContext(BooksContext);
  const chapter = selectedBook.chapters[selectedChapter];
  const verses: VerseItem[] = Object.keys(chapter).map(verse => ({
    book: selectedBook,
    chapter: selectedChapter,
    text: chapter[verse],
    verse,
  }));

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
