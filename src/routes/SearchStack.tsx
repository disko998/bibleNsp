import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { Heading, useColorModeValue, useTheme } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { routes } from '../const/routes';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator<any>();

export default function SearchStack({ navigation }: any) {
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
      <Stack.Screen name={routes.SEARCH} component={SearchScreen} />
    </Stack.Navigator>
  );
}
