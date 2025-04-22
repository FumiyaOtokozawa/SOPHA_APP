import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {EventScreen} from '../screens/EventScreen';
import {SofixScreen} from '../screens/SofixScreen';
import {CizScreen} from '../screens/CizScreen';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
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
