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
import {CreateEventScreen} from '../screens/CreateEventScreen';
import {useAuth} from '../contexts/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';

// @ts-ignore
const Stack = createNativeStackNavigator();

// 認証済みユーザー用のスタックナビゲーター
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="Sofix" component={SofixScreen} />
      <Stack.Screen name="Ciz" component={CizScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    </Stack.Navigator>
  );
};

// 未認証ユーザー用のスタックナビゲーター
const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const {user, loading} = useAuth();
  const theme = useTheme<AppTheme>();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};
