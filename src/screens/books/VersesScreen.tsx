import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Flex, Heading, Text, useColorModeValue } from 'native-base';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import ReaderNavigation from '../../components/ReaderNavigation';
import { routes } from '../../const/routes';
import { BooksContext } from '../../context/Books';

type Props = NativeStackScreenProps<BooksStackParamList, routes.VERSES> & {};

const VersesScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedChapter, onNext, onPrev, selectedBook } =
    useContext(BooksContext);
  const verses = selectedBook.chapters[selectedChapter];

  const lighterBg = useColorModeValue('bg.lightSecondary', 'bg.darkSecondary');
  const bgColor = useColorModeValue('bg.dark', 'bg.light');
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
              <Text textAlign="left" flex={1} fontSize="18px">
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
