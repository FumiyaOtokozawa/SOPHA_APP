import React, {useState, useRef} from 'react';
import {
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {AppTheme} from '../theme';
import {useLoginAnimation} from '../components/login/animations/LoginScreenAnimation';
import {useFormTransitionAnimation} from '../components/login/animations/FormTransitionAnimation';
import {LoginScreenBgDesign} from '../components/login/background/LoginScreenBgDesign';
import {RegisterForm} from '../components/login/forms/RegisterForm';
import {ForgotPasswordForm} from '../components/login/forms/ForgotPasswordForm';
import {LoginForm} from '../components/login/forms/LoginForm';
import {styles} from '../styles/screens/common/LoginScreenStyle';

type FormType = 'login' | 'register' | 'forgot';

export const LoginScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const windowWidth = Dimensions.get('window').width;
  const logoSize = Math.min(windowWidth * 0.6, 300);
  const [formType, setFormType] = useState<FormType>('login');
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    circle1Animation,
    circle2Animation,
    circle3Animation,
    circle4Animation,
    getAnimatedStyle,
  } = useLoginAnimation();
  const {animateTransition, getAnimatedStyle: getFormAnimatedStyle} =
    useFormTransitionAnimation();

  const handleFormChange = (
    newFormType: FormType,
    direction: 'left' | 'right',
  ) => {
    animateTransition(direction, () => {
      setFormType(newFormType);
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.loginScreen__container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.loginScreen__scroll}
        keyboardShouldPersistTaps="handled">
        <SafeAreaView
          style={[
            styles.loginScreen,
            {backgroundColor: theme.colors.background},
          ]}>
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

          <Animated.View
            style={[
              styles.loginScreen__form__container,
              getFormAnimatedStyle(),
            ]}>
            {formType === 'login' ? (
              <LoginForm
                theme={theme}
                onRegister={() => handleFormChange('register', 'left')}
                onForgot={() => handleFormChange('forgot', 'left')}
                scrollViewRef={scrollViewRef}
              />
            ) : formType === 'register' ? (
              <RegisterForm
                theme={theme}
                onBackToLogin={() => handleFormChange('login', 'right')}
                scrollViewRef={scrollViewRef}
              />
            ) : (
              <ForgotPasswordForm
                theme={theme}
                onBackToLogin={() => handleFormChange('login', 'right')}
                scrollViewRef={scrollViewRef}
              />
            )}
          </Animated.View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
