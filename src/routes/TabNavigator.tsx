import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, useColorModeValue, useTheme } from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Development from '../screens/Development';
import { routes } from '../const/routes';
import BooksStack from './BooksStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();
  const tabInactiveTintColor = useColorModeValue(
    colors.black,
    colors.lightText,
  );
  const tabBarColor = useColorModeValue(
    colors.bg.light,
    colors.bg.darkSecondary,
  );

  return (
    <Tab.Navigator
      initialRouteName={routes.BOOKS_STACK}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case routes.BOOKS_STACK:
              return <FontAwesome name="book" size={size} color={color} />;

            case routes.SEARCH_STACK:
              return (
                <Ionicons name="ios-search-sharp" size={size} color={color} />
              );

            case routes.HEBREW:
              return (
                <MaterialCommunityIcons
                  name="abjad-hebrew"
                  size={size}
                  color={color}
                />
              );
          }
        },
        tabBarLabel: ({ color }) => {
          switch (route.name) {
            case routes.BOOKS_STACK:
              return (
                <Text fontSize={10} color={color}>
                  Библија
                </Text>
              );

            case routes.SEARCH_STACK:
              return (
                <Text fontSize={10} color={color}>
                  Претрага
                </Text>
              );

            case routes.HEBREW:
              return (
                <Text fontSize={10} color={color}>
                  Хебрејски
                </Text>
              );
          }
        },
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: tabInactiveTintColor,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: tabBarColor,
        },
      })}>
      <Tab.Screen name={routes.BOOKS_STACK} component={BooksStack} />
      <Tab.Screen name={routes.SEARCH_STACK} component={SearchStack} />
      <Tab.Screen name={routes.HEBREW} component={Development} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
