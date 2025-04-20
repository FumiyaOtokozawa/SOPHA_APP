import React from 'react';
import {View, Dimensions, Text, Pressable, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';
import {useLoginAnimation} from '../components/login/animations/LoginScreenAnimation';
import {LoginScreenBgDesign} from '../components/login/background/LoginScreenBgDesign';
import {styles} from '../styles/screens/common/LoginScreenStyle';

export const LoginScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const windowWidth = Dimensions.get('window').width;
  const logoSize = Math.min(windowWidth * 0.6, 300);
  const {
    circle1Animation,
    circle2Animation,
    circle3Animation,
    circle4Animation,
    getAnimatedStyle,
  } = useLoginAnimation();

  return (
    <View
      style={[styles.loginScreen, {backgroundColor: theme.colors.background}]}>
      <LoginScreenBgDesign
        theme={theme}
        circle1Animation={circle1Animation}
        circle2Animation={circle2Animation}
        circle3Animation={circle3Animation}
        circle4Animation={circle4Animation}
        getAnimatedStyle={getAnimatedStyle}
      />

      <View style={styles.loginScreen__container}>
        <View style={styles.loginScreen__logo}>
          <Image
            source={require('../assets/images/logo.png')}
            style={[
              styles.loginScreen__logo__image,
              {width: logoSize, height: logoSize},
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginScreen__form}>
          <TextInput
            style={styles.loginScreen__input}
            placeholder="メールアドレス"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            outlineStyle={styles.loginScreen__input__outline}
            contentStyle={styles.loginScreen__input__content}
            label=""
          />
          <TextInput
            style={styles.loginScreen__input}
            placeholder="パスワード"
            mode="outlined"
            secureTextEntry
            outlineStyle={styles.loginScreen__input__outline}
            contentStyle={styles.loginScreen__input__content}
            label=""
          />
          <Button
            mode="contained"
            style={[
              styles.loginScreen__button,
              {backgroundColor: theme.colors.primary},
            ]}
            onPress={() => {}}
            theme={{roundness: 9}}>
            ログイン
          </Button>
          <View style={styles.loginScreen__links}>
            <Pressable
              onPress={() => {}}
              style={styles.loginScreen__links__item}>
              <Text
                style={[
                  styles.loginScreen__links__text,
                  {color: theme.colors.text},
                ]}>
                新規登録はこちら
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {}}
              style={styles.loginScreen__links__item}>
              <Text
                style={[
                  styles.loginScreen__links__text,
                  {color: theme.colors.text},
                ]}>
                パスワードをお忘れの方
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
