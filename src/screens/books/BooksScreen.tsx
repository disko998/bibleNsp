import React, { useContext, useLayoutEffect } from 'react';
import { ScrollView } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BooksStackParamList } from '../../AppContainer';
import DefaultLayout from '../../components/DefaultLayout';
import BooksAccordion from '../../components/BooksAccordion';
import { routes } from '../../const/routes';
import { BooksContext } from '../../context/Books';

type Props = NativeStackScreenProps<BooksStackParamList, routes.CHAPTERS> & {};

const BooksScreen = ({ navigation }: Props) => {
  const { groupedBooks, setSelectedBook } = useContext(BooksContext);

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
            onPress={item => {
              setSelectedBook(item);
              navigation.navigate(routes.CHAPTERS);
            }}
          />
        ))}
      </ScrollView>
    </DefaultLayout>
  );
};

export default BooksScreen;
