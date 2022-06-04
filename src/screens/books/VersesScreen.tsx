import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Flex, Heading, Text, useColorModeValue } from 'native-base';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import ReaderNavigation from '../../components/ReaderNavigation';
import { routes } from '../../utils/routes';
import { books } from '../../_data';

type Props = NativeStackScreenProps<BooksStackParamList, routes.VERSES> & {};

const VersesScreen: React.FC<Props> = ({ route, navigation }) => {
  const { chapter, book } = route.params;
  const lighterBg = useColorModeValue('bg.lightSecondary', 'bg.darkSecondary');
  const bgColor = useColorModeValue('bg.dark', 'bg.light');
  const [currentChapter, setCurrentChapter] = useState(parseInt(chapter, 2));
  const [currentBook] = useState(books[book.title as keyof typeof books]);
  const verses = currentBook.chapters[currentChapter] || [];
  const listRef = useRef<any>();

  const onNext = useCallback(() => {
    const nextChapter = currentChapter + 1;

    if (nextChapter > Object.keys(currentBook.chapters).length + 1) {
      // next book
      // setCurrentBook()
    } else {
      // next chapter
      setCurrentChapter(nextChapter);
    }

    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [currentChapter, currentBook]);

  const onPrev = useCallback(() => {
    const prevChapter = currentChapter - 1;

    if (prevChapter < 1) {
      // prev book
      // setCurrentBook()
    } else {
      // prev chapter
      setCurrentChapter(prevChapter);
    }

    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [currentChapter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      header: () => {
        return (
          <ReaderNavigation
            onChapterPress={() =>
              navigation.navigate(routes.CHAPTERS, { book })
            }
            onBookPress={() => navigation.navigate(routes.BOOKS)}
            chapter={currentChapter}
            onNext={onNext}
            onPrev={onPrev}
            title={`${book.title}`}
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
  }, [onNext, onPrev, currentChapter, book, navigation]);

  return (
    <DefaultLayout>
      <FlatList
        ref={listRef}
        data={Object.keys(verses)}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity>
            <Flex
              flexDirection="row"
              bg={index % 2 === 0 ? lighterBg : 'transparent'}
              padding="18px">
              <Center
                borderRadius="5px"
                borderWidth="2px"
                borderColor={bgColor}
                h="23px"
                w="23px"
                mr="15px">
                <Text fontWeight="bold" fontSize="10px">
                  {item}
                </Text>
              </Center>
              <Text textAlign="justify" flex={1} fontSize="18px">
                {`${verses[item]}`}
              </Text>
            </Flex>
          </TouchableOpacity>
        )}
      />
    </DefaultLayout>
  );
};

export default VersesScreen;
