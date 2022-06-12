import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import AppContainer from './AppContainer';
import theme from './style/theme';
import colorModeManager from './style/colorManager';
import BooksProvider from './context/Books';
// import seed from './_data/seeder';

const App = () => {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <BooksProvider>
        <AppContainer />
      </BooksProvider>
    </NativeBaseProvider>
  );
};

export default App;
