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

import { Verse } from '../const/types';
import { useVersesStore } from '../store/versesStore';
import { stringifyVerse } from '../utils/helpers';

type Props = {
  verses: Verse[];
  hideChapter?: boolean;
};

const VerseList = React.forwardRef(
  ({ verses, hideChapter }: Props, ref: any) => {
    const favorites = useVersesStore(state => state.favorites);
    const marked = useVersesStore(state => state.marked);
    const markers = useVersesStore(state => state.markers);

    const bg = useColorModeValue('bg.lightSecondary', 'bg.darkSecondary');
    const borderColor = useColorModeValue('bg.dark', 'bg.light');
    const { isOpen, onOpen, onClose } = useDisclose();
    const [selected, setSelected] = useState<Verse>();
    const verseString = stringifyVerse(selected);
    const selectedVerseMarker = marked.find(m => m.verseKey === verseString);

    const toggleFavorite = useVersesStore(state => state.toggleFavorite);
    const markVerse = useVersesStore(state => state.markVerse);

    console.log(markers);

    return (
      <>
        <FlatList
          ref={ref}
          data={verses}
          keyExtractor={item => item.text}
          renderItem={({ item, index }) => {
            const itemKey = stringifyVerse(item);
            const isFavorite = favorites.includes(itemKey);
            const markerVerse = marked.find(m => m.verseKey === itemKey);

            return (
              <TouchableOpacity
                onLongPress={() => {
                  setSelected(item);
                  onOpen();
                }}>
                <Flex
                  flexDirection="row"
                  bg={
                    markerVerse
                      ? markerVerse.marker.color
                      : index % 2 === 0
                      ? bg
                      : 'transparent'
                  }
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

                {isFavorite && (
                  <Icon
                    position="absolute"
                    right={2}
                    top={-4}
                    as={MaterialCommunityIcons}
                    name="bookmark"
                    color="brand.primary"
                    size="7"
                  />
                )}
              </TouchableOpacity>
            );
          }}
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
                {verseString}
              </Text>
            </Box>

            <Actionsheet.Item
              onPress={() => {
                Clipboard.setString(verseString);
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
              onPress={() => markVerse(stringifyVerse(selected), markers[0])}
              startIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="marker"
                  color={
                    selectedVerseMarker
                      ? selectedVerseMarker.marker.color
                      : 'trueGray.400'
                  }
                  mr="1"
                  size="6"
                />
              }>
              Маркер
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                if (selected) {
                  toggleFavorite(selected);
                }
              }}
              startIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="bookmark"
                  color={
                    favorites.includes(stringifyVerse(selected))
                      ? 'brand.primary'
                      : 'trueGray.400'
                  }
                  mr="1"
                  size="6"
                />
              }>
              Омиљено
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                Share.open({
                  message: verseString,
                  title: 'Подели стих',
                });
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
