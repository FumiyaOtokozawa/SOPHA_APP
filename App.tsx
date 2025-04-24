/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppNavigator} from './src/navigation/AppNavigator';
import {theme} from './src/theme';
import {AuthProvider} from './src/contexts/AuthContext';

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}

export default App;
