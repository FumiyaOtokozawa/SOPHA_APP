/**
 * AppNavigator.tsx
 * アプリケーションのナビゲーション設定を提供するコンポーネント
 * ヘッダーとフッターを固定し、中央のコンテンツ部分のみ遷移するレイアウト
 */
import React, {useState, useCallback, useEffect} from 'react';
// @ts-ignore
import {NavigationContainer, useNavigation} from '@react-navigation/native';
// @ts-ignore
import {
  createNativeStackNavigator,
  // @ts-ignore
} from '@react-navigation/native-stack';
// @ts-ignore
import {
  CardStyleInterpolators,
  // @ts-ignore
  TransitionPresets,
} from '@react-navigation/stack';
import {Easing, View, StyleSheet} from 'react-native';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {EventScreen} from '../screens/EventScreen';
import {SofixScreen} from '../screens/SofixScreen';
import {CizScreen} from '../screens/CizScreen';
import {CreateEventScreen} from '../screens/CreateEventScreen';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';
import {Header} from '../components/common/Header';
import {Footer} from '../components/common/Footer';
import {AnimatedLoader} from '../components/common/AnimatedLoader';

// @ts-ignore
const Stack = createNativeStackNavigator();

// 最適化されたトランジション設定
const transitionConfig = {
  animation: 'timing',
  config: {
    duration: 200, // 少し短くして軽快感を出す
    easing: Easing.out(Easing.poly(4)),
    useNativeDriver: true,
  },
};

// 共通のスクリーンオプション
const screenOptions = {
  headerShown: false, // ヘッダーは別途実装するので非表示
  gestureEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: transitionConfig,
    close: transitionConfig,
  },
  animationEnabled: true,
  detachPreviousScreen: false,
  presentation: 'card',
  ...(TransitionPresets ? TransitionPresets.SlideFromRightIOS : {}),
};

// ローディングインジケーター
const LoadingIndicator = React.memo(({theme}: {theme: AppTheme}) => (
  <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
    <AnimatedLoader
      size="large"
      color={theme.colors.primary}
      message="読み込み中..."
      iconName="rocket"
    />
  </View>
));

// ナビゲーションのスタックを定義
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="Sofix" component={SofixScreen} />
      <Stack.Screen name="Ciz" component={CizScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    </Stack.Navigator>
  );
};

// 認証スタック
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// アプリコンテナ（認証済み状態用）
const AuthenticatedContainer = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('home');

  // 現在のルートに基づいてアクティブタブを更新
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      // @ts-ignore
      const route = e.data?.state?.routes[e.data?.state?.index];
      if (route) {
        const routeName = route.name.toLowerCase();
        if (['home', 'event', 'sofix', 'ciz'].includes(routeName)) {
          setActiveTab(routeName);
        }
      }
    });

    return unsubscribe;
  }, [navigation]);

  // タブプレスハンドラー
  const handleTabPress = useCallback(
    (tabKey: string) => {
      setActiveTab(tabKey);
      // @ts-ignore
      navigation.navigate(tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AppStack />
      </View>
      <Footer activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

// メインのナビゲーターコンポーネント
export const AppNavigator: React.FC = () => {
  const {user, loading} = useAuth();
  const theme = useTheme<AppTheme>();

  if (loading) {
    return <LoadingIndicator theme={theme} />;
  }

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <AuthenticatedContainer />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
