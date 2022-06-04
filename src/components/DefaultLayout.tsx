import React from 'react';
import { Box, useColorModeValue } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

type Props = InterfaceBoxProps & {};

const DefaultLayout: React.FC<Props> = ({ children, ...boxProps }) => {
  return (
    <Box flex={1} bg={useColorModeValue('bg.light', 'bg.dark')} {...boxProps}>
      {children}
    </Box>
  );
};

export default DefaultLayout;
