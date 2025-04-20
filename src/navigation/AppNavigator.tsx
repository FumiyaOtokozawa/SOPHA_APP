import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen.tsx';
import {MainScreen} from '../screens/MainScreen.tsx';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(91, 99, 211)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerTitle: 'SOPHA'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
