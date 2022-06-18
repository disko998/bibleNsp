import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import AppContainer from './AppContainer';
import theme from './style/theme';
import colorModeManager from './style/colorManager';
// import seed from './_data/seeder';

const App = () => {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <AppContainer />
    </NativeBaseProvider>
  );
};

export default App;
