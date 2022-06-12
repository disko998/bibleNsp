import React from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {
  onPrev: () => void;
  onNext: () => void;
  title: string;
  chapter: number;
  onChapterPress?: () => void;
  onBookPress?: () => void;
};

const ReaderNavigation = ({
  onPrev,
  onNext,
  title,
  chapter,
  onChapterPress,
  onBookPress,
}: Props) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'bg.darkSecondary')}
      borderBottomWidth={0.5}
      borderBottomColor={useColorModeValue('gray.300', 'gray.800')}
      flexDirection="row"
      justify="space-between"
      pt={getStatusBarHeight()}>
      <IconButton
        onPress={onPrev}
        icon={
          <Feather
            name="chevrons-left"
            color={useColorModeValue('black', 'white')}
            size={30}
          />
        }
      />

      <Flex flexDirection="row" flex={1} align="center" mx="5px">
        <Box
          borderRadius="5px"
          bg={useColorModeValue('gray.200', 'gray.700')}
          flex={1}>
          <TouchableOpacity onPress={onBookPress}>
            <Heading
              h="40px"
              p="10px"
              ellipsizeMode="tail"
              fontSize={13}
              numberOfLines={1}>
              {title}
            </Heading>
          </TouchableOpacity>
        </Box>

        <TouchableOpacity onPress={onChapterPress}>
          <Center
            ml="5px"
            h="40px"
            w="40px"
            borderRadius="5px"
            bg={useColorModeValue('gray.200', 'gray.700')}
            p="10px">
            <Heading fontSize={15}>{chapter}</Heading>
          </Center>
        </TouchableOpacity>
      </Flex>

      <IconButton
        onPress={onNext}
        icon={
          <Feather
            name="chevrons-right"
            color={useColorModeValue('black', 'white')}
            size={30}
          />
        }
      />
    </Flex>
  );
};

export default ReaderNavigation;
