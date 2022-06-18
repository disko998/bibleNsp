import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Text, useColorMode, useColorModeValue } from 'native-base';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import { routes } from '../../const/routes';
import { useBooksStore } from '../../store/booksStore';

type Props = NativeStackScreenProps<BooksStackParamList, routes.CHAPTERS> & {};

const ChaptersScreen: React.FC<Props> = ({ navigation }) => {
  const selectedBook = useBooksStore(state => state.selectedBook);
  const setSelectedChapter = useBooksStore(state => state.setSelectedChapter);
  const bgColor = useColorModeValue('bg.dark', 'bg.light');
  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedBook.title,
    });
  }, [navigation, selectedBook.title]);

  const onChapterPress = (chapter: string) => {
    setSelectedChapter(parseInt(chapter, 10));
    navigation.navigate(routes.VERSES);
  };

  return (
    <DefaultLayout>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        numColumns={4}
        data={Object.keys(selectedBook.chapters)}
        keyExtractor={item => item}
        columnWrapperStyle={{
          margin: 5,
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChapterPress(item)}>
            <Center
              w="65px"
              h="65px"
              borderWidth={2}
              borderColor={bgColor}
              borderRadius="5px">
              <Text fontSize="xl" fontWeight="bold">
                {item}
              </Text>
              <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.500'}>
                Глава
              </Text>
            </Center>
          </TouchableOpacity>
        )}
      />
    </DefaultLayout>
  );
};

export default ChaptersScreen;
