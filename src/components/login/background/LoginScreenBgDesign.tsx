import React from 'react';
import {StyleSheet, Animated, ViewStyle} from 'react-native';
import type {AppTheme} from '../../../theme';

type LoginScreenBgDesignProps = {
  theme: AppTheme;
  circle1Animation: Animated.Value;
  circle2Animation: Animated.Value;
  circle3Animation: Animated.Value;
  circle4Animation: Animated.Value;
  getAnimatedStyle: (
    animation: Animated.Value,
  ) => Animated.WithAnimatedValue<ViewStyle>;
};

export const LoginScreenBgDesign: React.FC<LoginScreenBgDesignProps> = ({
  theme,
  circle1Animation,
  circle2Animation,
  circle3Animation,
  circle4Animation,
  getAnimatedStyle,
}) => {
  return (
    <>
      <Animated.View
        style={[
          styles.loginScreen__bgCircle,
          styles.loginScreen__bgCircle1,
          {backgroundColor: theme.colors.primary},
          getAnimatedStyle(circle1Animation),
        ]}
      />
      <Animated.View
        style={[
          styles.loginScreen__bgCircle,
          styles.loginScreen__bgCircle2,
          {backgroundColor: theme.colors.primary},
          getAnimatedStyle(circle2Animation),
        ]}
      />
      <Animated.View
        style={[
          styles.loginScreen__bgCircle,
          styles.loginScreen__bgCircle3,
          {backgroundColor: theme.colors.primary},
          getAnimatedStyle(circle3Animation),
        ]}
      />
      <Animated.View
        style={[
          styles.loginScreen__bgCircle,
          styles.loginScreen__bgCircle4,
          {backgroundColor: theme.colors.primary},
          getAnimatedStyle(circle4Animation),
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loginScreen__bgCircle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.15,
  },
  loginScreen__bgCircle1: {
    width: 400,
    height: 400,
    top: -100,
    right: -100,
  },
  loginScreen__bgCircle2: {
    width: 300,
    height: 300,
    bottom: -50,
    left: -50,
  },
  loginScreen__bgCircle3: {
    width: 250,
    height: 250,
    top: '40%',
    right: -120,
  },
  loginScreen__bgCircle4: {
    width: 200,
    height: 200,
    top: '20%',
    left: -80,
  },
});
