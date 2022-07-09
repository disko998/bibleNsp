import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorMode, useColorModeValue, useTheme } from 'native-base';

import { routes } from '../const/routes';
import Development from '../screens/Development';
import DrawerMenu from '../screens/DrawerMenu';
import TabNavigator from './TabNavigator';

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
