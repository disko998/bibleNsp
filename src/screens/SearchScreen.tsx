import {
  Box,
  Input,
  Button,
  Icon,
  Radio,
  Select,
  Text,
  Center,
  Pressable,
  useColorModeValue,
  Spinner,
} from 'native-base';
import React, { useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { routes } from '../const/routes';
import DefaultLayout from '../components/DefaultLayout';
import { BooksAlias, FilterBooks } from '../const/enums';
import { useSearchStore } from '../store/searchStore';
import useFilteredBooks from '../hooks/useFilteredBooks';
import useSearch from '../hooks/useSearch';
import VerseList from '../components/VersesList';
import { Keyboard } from 'react-native';

type Props = NativeStackScreenProps<any, routes.SEARCH> & {};

export const filterBooks = [
  FilterBooks.ALL,
  FilterBooks.OLD_TESTAMENT,
  FilterBooks.TORA,
  FilterBooks.PROPHETS,
  FilterBooks.WRITINGS,
  FilterBooks.NEW_TESTAMENT,
];

export default function SearchScreen({ navigation }: Props) {
  const selectedGroup = useSearchStore(state => state.selectedGroup);
  const selectedBook = useSearchStore(state => state.selectedBook);
  const showFilters = useSearchStore(state => state.showFilters);
  const setShowFilters = useSearchStore(state => state.setShowFilters);
  const selectBookFilter = useSearchStore(state => state.selectBookFilter);
  const changeGroupFilter = useSearchStore(state => state.changeGroupFilter);
  const filteredBooks = useFilteredBooks();
  const { onSearch, result } = useSearch();

  const [searchTerm, setSearchTerm] = useState('');
  const tintColor = useColorModeValue('black', 'white');

  const handleSearch = () => {
    Keyboard.dismiss();
    setShowFilters(false);
    let searchableBooks = filteredBooks;
    if (selectedBook) {
      const book = filteredBooks.find(b => b.alias === selectedBook);
      if (book) {
        searchableBooks = [book];
      }
    }
    onSearch(searchableBooks, searchTerm);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Претрага',
      headerLeft: () => (
        <Pressable p="5px" onPress={() => setShowFilters(!showFilters)}>
          <Icon
            as={MaterialCommunityIcons}
            name={showFilters ? 'filter' : 'filter-off'}
            size={'25px'}
            color={tintColor}
          />
        </Pressable>
      ),
    });
  }, [navigation, showFilters, setShowFilters, tintColor]);

  return (
    <DefaultLayout>
      <Box p="20px">
        <Input
          fontWeight={600}
          bg={'white'}
          color={'black'}
          fontSize={15}
          type="text"
          maxH={50}
          w="100%"
          placeholder="Претражи..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          _focus={{
            bg: 'white',
          }}
          InputLeftElement={
            selectedBook ? (
              <Center
                px="5px"
                h="full"
                borderRightWidth={1}
                borderColor={'gray.300'}>
                <Text fontWeight={600} color={'black'}>
                  {selectedBook}
                </Text>
              </Center>
            ) : undefined
          }
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              bg="brand.primary"
              onPress={handleSearch}>
              <Icon as={MaterialIcons} name="search" color="white" size="md" />
            </Button>
          }
        />

        {!!result.length && <Text>Резулати претраге: {result.length}</Text>}

        {showFilters && (
          <Box mt="10px">
            <Radio.Group
              onChange={val => changeGroupFilter(val as FilterBooks)}
              defaultValue={selectedGroup}
              name="bookGroups"
              accessibilityLabel="books groups">
              {filterBooks.map(option => (
                <Radio
                  key={option}
                  size="lg"
                  colorScheme="red"
                  value={option}
                  my={2}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>

            <Select
              mt="10px"
              bg={'white'}
              variant="unstyled"
              selectedValue={selectedBook || ''}
              w="100%"
              placeholder="Књиге"
              color={'black'}
              fontSize={16}
              fontWeight={600}
              _selectedItem={{
                bg: 'brand.primary',
              }}
              onValueChange={itemValue =>
                selectBookFilter(
                  itemValue ? (itemValue as BooksAlias) : undefined,
                )
              }>
              <Select.Item
                _text={{ fontSize: 18 }}
                label={'Све Kњиге'}
                value={''}
              />
              {filteredBooks.map(book => (
                <Select.Item
                  _text={{ fontSize: 18 }}
                  label={book.title}
                  value={book.alias}
                />
              ))}
            </Select>
          </Box>
        )}
      </Box>

      <VerseList
        verses={result}
        searchWords={[searchTerm.toLocaleLowerCase().trim()]}
      />
    </DefaultLayout>
  );
}
