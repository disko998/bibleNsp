import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Box, Flex, Heading, useColorModeValue } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Book } from '../const/types';

type Props = {
  title: string;
  hebrew?: string;
  translation?: string;
  onPress: (item: Book) => void;
  data: Book[];
};

export default function BooksAccordion({ title, data, onPress }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Flex
          justify="space-between"
          flexDirection="row"
          bg={useColorModeValue('gray.200', 'gray.700')}
          p="20px">
          <Heading fontSize="xl">{title}</Heading>
          <Ionicons
            name={`chevron-${expanded ? 'down' : 'up'}`}
            size={30}
            color={useColorModeValue('black', 'white')}
          />
        </Flex>
      </TouchableOpacity>

      {expanded && (
        <Flex>
          {data.map(item => (
            <TouchableOpacity key={item.title} onPress={() => onPress(item)}>
              <Flex p="20px" flexDir={'row'} justify="space-between">
                <Heading mr="10px" flex={1} fontSize="lg">
                  {`${item.title}\n(${item.original_title})`}
                </Heading>

                <Heading fontWeight="normal" color="gray.400" fontSize="xl">
                  {item.hebrew_title}
                </Heading>
              </Flex>
            </TouchableOpacity>
          ))}
        </Flex>
      )}
    </Box>
  );
}
