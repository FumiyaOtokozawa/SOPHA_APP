import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }

    setLoading(true);
    try {
      const {error} = await login(email, password);

      if (error) {
        Alert.alert(
          'ログインエラー',
          error.message || 'ログインに失敗しました',
        );
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('エラー', '予期せぬエラーが発生しました');
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
      <TextInput
        ref={emailInputRef}
        style={styles.loginScreen__input}
        placeholder="メールアドレス"
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
        left={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons name="email" size={24} color={theme.colors.text} />
            )}
          />
        }
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.loginScreen__input}
        placeholder="パスワード"
        mode="outlined"
        secureTextEntry={!showPassword}
        contentStyle={styles.loginScreen__input__content}
        label=""
        value={password}
        onChangeText={setPassword}
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
        left={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons name="lock" size={24} color={theme.colors.text} />
            )}
          />
        }
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color={theme.colors.text}
              />
            )}
            onPress={() => setShowPassword(!showPassword)}
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
