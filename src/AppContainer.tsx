import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BooksScreen from './screens/books/BooksScreen';
import ChaptersScreen from './screens/books/ChaptersScreen';
import VersesScreen from './screens/books/VersesScreen';
import { Book } from './_data';
import Development from './screens/Development';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DrawerMenu from './components/DrawerMenu';
import { routes } from './utils/routes';

export type BooksStackParamList = {
  [routes.BOOKS]: undefined;
  [routes.CHAPTERS]: { book: Book };
  [routes.VERSES]: { book: Book; chapter: string };
};

const Stack = createNativeStackNavigator<BooksStackParamList>();

function BooksStack({ navigation }: any) {
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
      initialRouteName={routes.BOOKS + 'Stack'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case routes.BOOKS + 'Stack':
              return <FontAwesome name="book" size={size} color={color} />;

            case routes.SEARCH:
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
            case routes.BOOKS + 'Stack':
              return (
                <Text fontSize={10} color={color}>
                  Библија
                </Text>
              );

            case routes.SEARCH:
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
      <Tab.Screen name={routes.BOOKS + 'Stack'} component={BooksStack} />
      <Tab.Screen name={routes.SEARCH} component={Development} />
      <Tab.Screen name={routes.HEBREW} component={Development} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function AppContainer() {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const MyTheme = {
    ...DefaultTheme,
    dark: colorMode === 'dark',
    colors: {
      ...DefaultTheme.colors,
      background: useColorModeValue(colors.bg.light, colors.bg.dark),
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style={useColorModeValue('dark', 'light')} />

      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: useColorModeValue(colors.bg.light, colors.bg.dark),
          },
        }}
        drawerContent={props => <DrawerMenu {...props} />}>
        <Drawer.Screen name={routes.HOME} component={TabNavigator} />
        <Drawer.Screen name={routes.SETTINGS} component={Development} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
