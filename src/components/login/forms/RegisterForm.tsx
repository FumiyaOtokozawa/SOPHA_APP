import React, {useState, useRef} from 'react';
import {View, Text, Pressable, ScrollView, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import type {AppTheme} from '../../../theme';
import {styles} from '../../../styles/screens/common/LoginScreenStyle';
import {useAuth} from '../../../contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {register} = useAuth();

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

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('エラー', '全ての項目を入力してください');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致していません');
      return;
    }

    if (password.length < 6) {
      Alert.alert('エラー', 'パスワードは6文字以上で設定してください');
      return;
    }

    setLoading(true);
    try {
      const {error} = await register(email, password);

      if (error) {
        Alert.alert('登録エラー', error.message || '登録に失敗しました');
      } else {
        Alert.alert(
          '登録完了',
          'アカウントが作成されました。メールアドレスの確認を行ってください。',
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
        新規登録
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
      <TextInput
        ref={passwordInputRef}
        style={styles.loginScreen__input}
        placeholder="パスワード"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
      <TextInput
        ref={confirmPasswordInputRef}
        style={styles.loginScreen__input}
        placeholder="パスワード（確認）"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        mode="outlined"
        secureTextEntry={!showConfirmPassword}
        contentStyle={styles.loginScreen__input__content}
        label=""
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
        left={<TextInput.Icon icon={() => inputIcon({name: 'lock'})} />}
        right={
          <TextInput.Icon
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            icon={() =>
              inputIcon({
                name: showConfirmPassword ? 'visibility' : 'visibility-off',
              })
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
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        theme={{roundness: 9}}>
        登録する
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
