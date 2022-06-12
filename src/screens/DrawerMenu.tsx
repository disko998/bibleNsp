import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Divider,
  MoonIcon,
  SunIcon,
  useColorMode,
  useColorModeValue,
  useTheme,
} from 'native-base';

import { routes } from '../const/routes';

export default function DrawerMenu(props: any) {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  const tintColor = useColorModeValue(colors.darkText, colors.lightText);
  const bgColor = useColorModeValue('black', 'white');

  const tabsItems = [
    {
      label: 'Библија',
      icon: (
        <FontAwesome
          name="book"
          size={24}
          color={useColorModeValue('black', 'white')}
        />
      ),
      onPress: () => props.navigation.navigate(routes.BOOKS),
    },
    {
      label: 'Претрага',
      icon: (
        <Ionicons
          name="ios-search-sharp"
          size={24}
          color={useColorModeValue('black', 'white')}
        />
      ),
      onPress: () => props.navigation.navigate(routes.SEARCH),
    },
    {
      label: 'Хебрејски',
      icon: (
        <MaterialCommunityIcons
          name="abjad-hebrew"
          size={24}
          color={useColorModeValue('black', 'white')}
        />
      ),
      onPress: () => props.navigation.navigate(routes.HEBREW),
    },
    {
      label: 'Омиљено',
      icon: (
        <Ionicons
          name="bookmark"
          size={24}
          color={useColorModeValue('black', 'white')}
        />
      ),
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      {tabsItems.map(({ label, icon, onPress }) => (
        <DrawerItem
          key={label}
          activeTintColor={colors.brand.primary}
          inactiveTintColor={tintColor}
          label={label}
          onPress={onPress as any}
          icon={() => icon}
        />
      ))}
      <Divider />

      <DrawerItem
        onPress={() => props.navigation.navigate(routes.SETTINGS)}
        activeTintColor={colors.brand.primary}
        inactiveTintColor={useColorModeValue(colors.darkText, colors.lightText)}
        label="Подешавања"
        icon={() => (
          <Ionicons name="settings-sharp" size={24} color={bgColor} />
        )}
      />

      <DrawerItem
        onPress={toggleColorMode}
        activeTintColor={colors.brand.primary}
        inactiveTintColor={useColorModeValue(colors.darkText, colors.lightText)}
        labelStyle={{
          textTransform: 'capitalize',
        }}
        label={colorMode === 'dark' ? `Ноћна Tema` : `Светла Тема`}
        icon={() =>
          colorMode === 'light' ? (
            <SunIcon color="brand.primary" size="lg" />
          ) : (
            <MoonIcon color="brand.primary" size="lg" />
          )
        }
      />
    </DrawerContentScrollView>
  );
}
