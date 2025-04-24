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
import {useAuth} from '../contexts/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';

// @ts-ignore
const Stack = createNativeStackNavigator();

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
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        {user ? (
          // 認証済みユーザー向け画面
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Event" component={EventScreen} />
            <Stack.Screen name="Sofix" component={SofixScreen} />
            <Stack.Screen name="Ciz" component={CizScreen} />
          </>
        ) : (
          // 未認証ユーザー向け画面
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
