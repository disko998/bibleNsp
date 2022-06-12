import {
  Center,
  Flex,
  Text,
  useColorModeValue,
  Actionsheet,
  Box,
  useDisclose,
  Icon,
} from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VerseItem } from '../const/types';

type Props = {
  verses: VerseItem[];
  hideChapter?: boolean;
};

const VerseList = React.forwardRef(
  ({ verses, hideChapter }: Props, ref: any) => {
    const bg = useColorModeValue('bg.lightSecondary', 'bg.darkSecondary');
    const borderColor = useColorModeValue('bg.dark', 'bg.light');
    const { isOpen, onOpen, onClose } = useDisclose();
    const [selected, setSelected] = useState<VerseItem>();
    const copyText = `${selected?.book.alias} ${selected?.chapter}:${selected?.verse}\n${selected?.text}`;

    const toggleFavorite = async () => {
      // try {
      //   await AsyncStorage.setItem('@favorites', JSON.stringify(selected));
      // } catch (e) {
      //   // saving error
      // }
    };

    const toggleMarker = async () => {
      // try {
      //   await AsyncStorage.setItem('@favorites', JSON.stringify(selected));
      // } catch (e) {
      //   // saving error
      // }
    };

    return (
      <>
        <FlatList
          ref={ref}
          data={verses}
          keyExtractor={item => item.text}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onLongPress={() => {
                setSelected(item);
                onOpen();
              }}>
              <Flex
                flexDirection="row"
                bg={index % 2 === 0 ? bg : 'transparent'}
                padding="18px">
                <Center
                  borderRadius="5px"
                  borderWidth="2px"
                  borderColor={borderColor}
                  h="23px"
                  w="23px"
                  mr="15px">
                  <Text fontWeight="bold" fontSize="10px">
                    {!hideChapter
                      ? `${item.chapter}:${item.verse}`
                      : item.verse}
                  </Text>
                </Center>
                <Text textAlign="left" flex={1} fontSize="18px">
                  {item.text}
                </Text>
              </Flex>
            </TouchableOpacity>
          )}
        />

        <Actionsheet
          isOpen={isOpen}
          onClose={onClose}
          disableOverlay={false}
          hideDragIndicator={true}>
          <Actionsheet.Content borderTopRadius="20px">
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: 'gray.300',
                }}>
                {copyText}
              </Text>
            </Box>

            <Actionsheet.Item
              onPress={() => {
                Clipboard.setString(copyText);
                onClose();
              }}
              startIcon={
                <Icon
                  as={MaterialIcons}
                  name="content-copy"
                  color="trueGray.400"
                  mr="1"
                  size="6"
                />
              }>
              Копирај
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                toggleMarker();
                // onClose();
              }}
              startIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="marker"
                  color="trueGray.400"
                  mr="1"
                  size="6"
                />
              }>
              Маркер
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                toggleFavorite();
                // onClose();
              }}
              startIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="bookmark"
                  color="trueGray.400"
                  mr="1"
                  size="6"
                />
              }>
              Омиљено
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                Share.open({
                  message: copyText,
                  title: 'Подели стих',
                }).catch(err => {});
              }}
              startIcon={
                <Icon
                  as={MaterialIcons}
                  name="share"
                  color="trueGray.400"
                  mr="1"
                  size="6"
                />
              }>
              Подели
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </>
    );
  },
);

export default VerseList;
