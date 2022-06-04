import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { books } from '../../_data';
import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import BooksAccordion from '../../components/BooksAccordion';
import { booksToArray, groupBooks } from '../../utils/helpers';
import { routes } from '../../utils/routes';

type Props = NativeStackScreenProps<BooksStackParamList, routes.CHAPTERS> & {};

const BooksScreen = ({ navigation }: Props) => {
  const groupedBooks = groupBooks(booksToArray(books));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Kњиге',
    });
  }, [navigation]);

  return (
    <DefaultLayout>
      <ScrollView>
        {Object.keys(groupedBooks).map(group => (
          <BooksAccordion
            key={group}
            title={group}
            data={groupedBooks[group]}
            onPress={item =>
              navigation.navigate(routes.CHAPTERS, {
                book: item,
              })
            }
          />
        ))}
      </ScrollView>
    </DefaultLayout>
  );
};

export default BooksScreen;
