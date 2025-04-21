import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AppTheme} from '../../../theme';
import type {RootStackParamList} from '../../../navigation/types';
import {styles} from '../../../styles/screens/common/LoginScreenStyle';

type LoginFormProps = {
  theme: AppTheme;
  onRegister: () => void;
  onForgot: () => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export const LoginForm: React.FC<LoginFormProps> = ({
  theme,
  onRegister,
  onForgot,
  scrollViewRef,
}) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const handleFocus = (inputRef: React.RefObject<any>) => {
    if (inputRef.current && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 200,
        animated: true,
      });
    }
  };

  const handleLogin = () => {
    // TODO: ログイン処理を実装
    // ここでは仮実装としてメイン画面に遷移
    navigation.replace('Main');
  };

  return (
    <View style={styles.loginScreen__form}>
      <Text
        style={[styles.loginScreen__form__title, {color: theme.colors.text}]}>
        ログイン
      </Text>
      <TextInput
        ref={emailInputRef}
        style={styles.loginScreen__input}
        placeholder="メールアドレス"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        contentStyle={styles.loginScreen__input__content}
        label=""
        onFocus={() => {
          setIsEmailFocused(true);
          handleFocus(emailInputRef);
        }}
        onBlur={() => setIsEmailFocused(false)}
        outlineStyle={
          isEmailFocused
            ? styles.loginScreen__input__outline__focused
            : styles.loginScreen__input__outline
        }
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.loginScreen__input}
        placeholder="パスワード"
        mode="outlined"
        secureTextEntry
        contentStyle={styles.loginScreen__input__content}
        label=""
        onFocus={() => {
          setIsPasswordFocused(true);
          handleFocus(passwordInputRef);
        }}
        onBlur={() => setIsPasswordFocused(false)}
        outlineStyle={
          isPasswordFocused
            ? styles.loginScreen__input__outline__focused
            : styles.loginScreen__input__outline
        }
      />
      <Button
        mode="contained"
        style={[
          styles.loginScreen__button,
          {backgroundColor: theme.colors.primary},
        ]}
        labelStyle={styles.loginScreen__button__label}
        contentStyle={styles.loginScreen__button__content}
        onPress={handleLogin}
        theme={{roundness: 9}}>
        ログイン
      </Button>
      <View style={styles.loginScreen__links}>
        <Pressable onPress={onRegister} style={styles.loginScreen__links__item}>
          <Text
            style={[
              styles.loginScreen__links__text,
              {color: theme.colors.text},
            ]}>
            新規登録はこちら
          </Text>
        </Pressable>
        <Pressable onPress={onForgot} style={styles.loginScreen__links__item}>
          <Text
            style={[
              styles.loginScreen__links__text,
              {color: theme.colors.text},
            ]}>
            パスワードを忘れた方はこちら
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
