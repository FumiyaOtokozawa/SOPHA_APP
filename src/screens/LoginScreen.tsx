import React, {useState, useRef} from 'react';
import {View, Dimensions, Text, Pressable, Image, Animated} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';
import {useLoginAnimation} from '../components/login/animations/LoginScreenAnimation';
import {LoginScreenBgDesign} from '../components/login/background/LoginScreenBgDesign';
import {styles} from '../styles/screens/common/LoginScreenStyle';

type FormType = 'login' | 'register' | 'forgot';

export const LoginScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const windowWidth = Dimensions.get('window').width;
  const logoSize = Math.min(windowWidth * 0.6, 300);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [formType, setFormType] = useState<FormType>('login');
  const {
    circle1Animation,
    circle2Animation,
    circle3Animation,
    circle4Animation,
    getAnimatedStyle,
  } = useLoginAnimation();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleFormChange = (newFormType: FormType) => {
    // ログインフォームから他のフォームへの遷移は右スライド
    // 他のフォームからログインフォームへの遷移は左スライド
    const toValue = formType === 'login' ? windowWidth : -windowWidth;

    // 現在のフォームをスライドアウト
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setFormType(newFormType);
      // スライドアニムの位置を反対側に瞬時に移動
      slideAnim.setValue(-toValue);
      // 新しいフォームをスライドイン
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderLoginForm = () => (
    <Animated.View
      style={[
        styles.loginScreen__form,
        {
          transform: [{translateX: slideAnim}],
        },
      ]}>
      <TextInput
        style={styles.loginScreen__input}
        placeholder="メールアドレス"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        contentStyle={styles.loginScreen__input__content}
        label=""
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
        outlineStyle={
          isEmailFocused
            ? styles.loginScreen__input__outline__focused
            : styles.loginScreen__input__outline
        }
      />
      <TextInput
        style={styles.loginScreen__input}
        placeholder="パスワード"
        mode="outlined"
        secureTextEntry
        contentStyle={styles.loginScreen__input__content}
        label=""
        onFocus={() => setIsPasswordFocused(true)}
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
        onPress={() => {}}
        theme={{roundness: 9}}>
        ログイン
      </Button>
      <View style={styles.loginScreen__links}>
        <Pressable
          onPress={() => handleFormChange('register')}
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
          onPress={() => handleFormChange('forgot')}
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
    </Animated.View>
  );

  const renderRegisterForm = () => (
    <Animated.View
      style={[
        styles.loginScreen__form,
        {
          transform: [{translateX: slideAnim}],
        },
      ]}>
      <Text
        style={[
          styles.loginScreen__form__title,
          {color: theme.colors.text, marginBottom: 16},
        ]}>
        新規アカウント登録
      </Text>
      <Text
        style={[
          styles.loginScreen__form__description,
          {color: theme.colors.text, marginBottom: 24},
        ]}>
        以下の情報を入力して、新規アカウントを作成してください。
      </Text>
      <TextInput
        style={styles.loginScreen__input}
        placeholder="メールアドレス"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        contentStyle={styles.loginScreen__input__content}
        label=""
        outlineStyle={styles.loginScreen__input__outline}
      />
      <TextInput
        style={styles.loginScreen__input}
        placeholder="パスワード"
        mode="outlined"
        secureTextEntry
        contentStyle={styles.loginScreen__input__content}
        label=""
        outlineStyle={styles.loginScreen__input__outline}
      />
      <TextInput
        style={styles.loginScreen__input}
        placeholder="パスワード（確認用）"
        mode="outlined"
        secureTextEntry
        contentStyle={styles.loginScreen__input__content}
        label=""
        outlineStyle={styles.loginScreen__input__outline}
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
          onPress={() => handleFormChange('login')}
          style={styles.loginScreen__links__item}>
          <Text
            style={[
              styles.loginScreen__links__text,
              {color: theme.colors.text},
            ]}>
            ログイン画面に戻る
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );

  const renderForgotPasswordForm = () => (
    <Animated.View
      style={[
        styles.loginScreen__form,
        {
          transform: [{translateX: slideAnim}],
        },
      ]}>
      <Text
        style={[
          styles.loginScreen__form__title,
          {color: theme.colors.text, marginBottom: 16},
        ]}>
        パスワード再設定
      </Text>
      <Text
        style={[
          styles.loginScreen__form__description,
          {color: theme.colors.text, marginBottom: 24},
        ]}>
        ご登録のメールアドレスを入力してください。
        パスワード再設定用のメールをお送りします。
      </Text>
      <TextInput
        style={styles.loginScreen__input}
        placeholder="メールアドレス"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        contentStyle={styles.loginScreen__input__content}
        label=""
        outlineStyle={styles.loginScreen__input__outline}
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
          onPress={() => handleFormChange('login')}
          style={styles.loginScreen__links__item}>
          <Text
            style={[
              styles.loginScreen__links__text,
              {color: theme.colors.text},
            ]}>
            ログイン画面に戻る
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );

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

      <View style={styles.loginScreen__container}>
        {formType === 'login'
          ? renderLoginForm()
          : formType === 'register'
          ? renderRegisterForm()
          : renderForgotPasswordForm()}
      </View>
    </View>
  );
};
