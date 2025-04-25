import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import type {AppTheme} from '../../../theme';
import {styles} from '../../../styles/screens/common/LoginScreenStyle';
import {useAuth} from '../../../contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {forgotPassword} = useAuth();

  const emailInputRef = useRef<any>(null);

  const handleFocus = (inputRef: React.RefObject<any>) => {
    if (inputRef.current && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 200,
        animated: true,
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('エラー', 'メールアドレスを入力してください');
      return;
    }

    setLoading(true);
    try {
      const {error} = await forgotPassword(email);

      if (error) {
        Alert.alert(
          'エラー',
          error.message || 'パスワードリセットに失敗しました',
        );
      } else {
        Alert.alert(
          'パスワードリセット',
          'パスワードリセットのリンクをメールで送信しました。メールをご確認ください。',
          [{text: 'OK', onPress: onBackToLogin}],
        );
      }
    } catch (error) {
      Alert.alert('エラー', '予期せぬエラーが発生しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputIcon = ({name}: {name: string}) => (
    <MaterialIcons name={name} size={24} color={theme.colors.text} />
  );

  return (
    <View style={styles.loginScreen__form}>
      <Text
        style={[styles.loginScreen__form__title, {color: theme.colors.text}]}>
        パスワードをリセット
      </Text>
      <Text
        style={[
          styles.loginScreen__form__description,
          {color: theme.colors.text},
        ]}>
        登録したメールアドレスを入力してください。{'\n'}
        パスワードリセットのリンクを送信します。
      </Text>
      <TextInput
        ref={emailInputRef}
        style={styles.loginScreen__input}
        placeholder="メールアドレス"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        contentStyle={styles.loginScreen__input__content}
        label=""
        value={email}
        onChangeText={setEmail}
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
        left={<TextInput.Icon icon={() => inputIcon({name: 'email'})} />}
      />
      <Button
        mode="contained"
        style={[
          styles.loginScreen__button,
          {backgroundColor: theme.colors.primary},
        ]}
        labelStyle={styles.loginScreen__button__label}
        contentStyle={styles.loginScreen__button__content}
        onPress={handleForgotPassword}
        loading={loading}
        disabled={loading}
        theme={{roundness: 9}}>
        リセットリンクを送信
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
