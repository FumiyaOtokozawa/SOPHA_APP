import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import type {AppTheme} from '../../../theme';
import {styles} from '../../../styles/screens/common/LoginScreenStyle';
import {useAuth} from '../../../contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type LoginFormProps = {
  theme: AppTheme;
  onRegister: () => void;
  onForgot: () => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  theme,
  onRegister,
  onForgot,
  scrollViewRef,
}) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {login} = useAuth();

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

  const inputIcon = ({name}: {name: string}) => (
    <MaterialIcons name={name} size={24} color={theme.colors.text} />
  );

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('メールアドレスとパスワードを入力してください');
      return;
    }

    setLoading(true);
    try {
      const {error} = await login(email, password);

      if (error) {
        setErrorMessage(
          'ログインに失敗しました。\nメールアドレスとパスワードをご確認ください',
        );
      } else {
        // ナビゲーションを行わない - AuthContextのonAuthStateChangeが自動的に処理
      }
    } catch (error) {
      setErrorMessage('予期せぬエラーが発生しました。通信環境をご確認ください');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginScreen__form}>
      <Text
        style={[styles.loginScreen__form__title, {color: theme.colors.text}]}>
        ログイン
      </Text>

      {errorMessage && (
        <View style={styles.loginScreen__errorContainer}>
          <MaterialIcons name="error" size={20} color="rgb(225, 102, 108)" />
          <Text style={[styles.loginScreen__errorText]}>{errorMessage}</Text>
        </View>
      )}

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
        onChangeText={text => {
          const filteredText = text.replace(/[^a-zA-Z0-9@._\-]/g, '');
          setEmail(filteredText);
          setErrorMessage(null);
        }}
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
      <TextInput
        ref={passwordInputRef}
        style={styles.loginScreen__input}
        placeholder="パスワード"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        mode="outlined"
        secureTextEntry={!showPassword}
        contentStyle={styles.loginScreen__input__content}
        value={password}
        onChangeText={text => {
          setPassword(text);
          setErrorMessage(null);
        }}
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
        left={<TextInput.Icon icon={() => inputIcon({name: 'lock'})} />}
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            icon={() =>
              inputIcon({name: showPassword ? 'visibility' : 'visibility-off'})
            }
          />
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
        loading={loading}
        disabled={loading}
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
            新規登録はこちら ＞
          </Text>
        </Pressable>
        <Pressable onPress={onForgot} style={styles.loginScreen__links__item}>
          <Text
            style={[
              styles.loginScreen__links__text,
              {color: theme.colors.text},
            ]}>
            パスワードを忘れた方はこちら ＞
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
