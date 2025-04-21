import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import type {AppTheme} from '../../../theme';
import {styles} from '../../../styles/screens/common/LoginScreenStyle';

type ForgotPasswordFormProps = {
  theme: AppTheme;
  onBackToLogin: () => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  theme,
  onBackToLogin,
  scrollViewRef,
}) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const emailInputRef = useRef<any>(null);

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
        パスワード再設定
      </Text>
      <Text
        style={[
          styles.loginScreen__form__description,
          {color: theme.colors.text},
        ]}>
        ご登録のメールアドレスを入力してください。{'\n'}
        パスワード再設定用のメールをお送りします。
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
        送信
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
