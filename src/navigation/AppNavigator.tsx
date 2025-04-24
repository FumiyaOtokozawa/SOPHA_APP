import React from 'react';
// @ts-ignore
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {EventScreen} from '../screens/EventScreen';
import {SofixScreen} from '../screens/SofixScreen';
import {CizScreen} from '../screens/CizScreen';

// @ts-ignore
const Stack = createNativeStackNavigator();

// 開発環境用の初期ルートを設定
const INITIAL_ROUTE = __DEV__ ? 'Home' : 'Login';

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={INITIAL_ROUTE}
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Sofix" component={SofixScreen} />
        <Stack.Screen name="Ciz" component={CizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
