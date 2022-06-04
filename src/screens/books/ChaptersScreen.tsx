import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Text, useColorModeValue } from 'native-base';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import { routes } from '../../utils/routes';

type Props = NativeStackScreenProps<BooksStackParamList, routes.CHAPTERS> & {};

const ChaptersScreen: React.FC<Props> = ({ route, navigation }) => {
  const bgColor = useColorModeValue('bg.dark', 'bg.light');
  const book = route.params.book;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: book.title,
    });
  }, [navigation, book.title]);

  const onChapterPress = (chapter: string) => {
    navigation.navigate(routes.VERSES, {
      chapter: chapter,
      book: book,
    });
  };

  return (
    <DefaultLayout>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        numColumns={4}
        data={Object.keys(book.chapters)}
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
              <Text color="gray.300">Глава</Text>
            </Center>
          </TouchableOpacity>
        )}
      />
    </DefaultLayout>
  );
};

export default ChaptersScreen;
