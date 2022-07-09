import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { Heading, useColorModeValue, useTheme } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { routes } from '../const/routes';
import BooksScreen from '../screens/books/BooksScreen';
import ChaptersScreen from '../screens/books/ChaptersScreen';
import VersesScreen from '../screens/books/VersesScreen';

export type BooksStackParamList = {
  [routes.BOOKS]: undefined;
  [routes.CHAPTERS]: undefined;
  [routes.VERSES]: undefined;
};

const Stack = createNativeStackNavigator<BooksStackParamList>();

export default function BooksStack({ navigation }: any) {
  const { colors } = useTheme();
  const tintColorValue = useColorModeValue('black', 'white');

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: ({ tintColor, children }) => (
          <Heading
            ellipsizeMode="tail"
            maxW="220px"
            fontSize="lg"
            color={tintColor}>
            {children}
          </Heading>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" color={tintColorValue} size={30} />
          </TouchableOpacity>
        ),
        headerTintColor: tintColorValue,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: useColorModeValue(
            colors.bg.light,
            colors.bg.darkSecondary,
          ),
        },
      }}>
      <Stack.Screen name={routes.BOOKS} component={BooksScreen} />
      <Stack.Screen name={routes.CHAPTERS} component={ChaptersScreen} />
      <Stack.Screen name={routes.VERSES} component={VersesScreen} />
    </Stack.Navigator>
  );
}
