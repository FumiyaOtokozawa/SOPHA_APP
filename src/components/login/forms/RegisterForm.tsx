import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import type {AppTheme} from '../../../theme';
import {styles} from '../../../styles/screens/common/LoginScreenStyle';

type RegisterFormProps = {
  theme: AppTheme;
  onBackToLogin: () => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  theme,
  onBackToLogin,
  scrollViewRef,
}) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);

  const handleFocus = (inputRef: React.RefObject<any>) => {
    if (inputRef.current && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 200,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.loginScreen__form}>
      <Text
        style={[styles.loginScreen__form__title, {color: theme.colors.text}]}>
        新規アカウント登録
      </Text>
      <Text
        style={[
          styles.loginScreen__form__description,
          {color: theme.colors.text},
        ]}>
        以下の情報を入力してください。{'\n'}
        メールアドレス宛に認証メールが届きます。
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
      <TextInput
        ref={confirmPasswordInputRef}
        style={styles.loginScreen__input}
        placeholder="パスワード（確認用）"
        mode="outlined"
        secureTextEntry
        contentStyle={styles.loginScreen__input__content}
        label=""
        onFocus={() => {
          setIsConfirmPasswordFocused(true);
          handleFocus(confirmPasswordInputRef);
        }}
        onBlur={() => setIsConfirmPasswordFocused(false)}
        outlineStyle={
          isConfirmPasswordFocused
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
        onPress={() => {}}
        theme={{roundness: 9}}>
        新規登録
      </Button>
      <View style={styles.loginScreen__links}>
        <Pressable
          onPress={onBackToLogin}
          style={styles.loginScreen__links__item}>
          <Text
            style={[
              styles.loginScreen__links__text,
              {color: theme.colors.text},
            ]}>
            ＜ ログイン画面に戻る
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
