import {useEffect, useRef} from 'react';
import {Animated, Easing, ViewStyle, Platform} from 'react-native';

export const useLoginAnimation = () => {
  const circle1Animation = useRef(new Animated.Value(0)).current;
  const circle2Animation = useRef(new Animated.Value(0)).current;
  const circle3Animation = useRef(new Animated.Value(0)).current;
  const circle4Animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (value: Animated.Value, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver:
              Platform.OS === 'ios' ||
              parseInt(Platform.Version.toString(), 10) >= 21,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver:
              Platform.OS === 'ios' ||
              parseInt(Platform.Version.toString(), 10) >= 21,
          }),
        ]),
      );
    };

    try {
      createAnimation(circle1Animation, 6000).start();
      createAnimation(circle2Animation, 10000).start();
      createAnimation(circle3Animation, 8000).start();
      createAnimation(circle4Animation, 13000).start();
    } catch (error) {
      console.warn('Animation error:', error);
    }
  }, [circle1Animation, circle2Animation, circle3Animation, circle4Animation]);

  const getAnimatedStyle = (
    animation: Animated.Value,
  ): Animated.WithAnimatedValue<ViewStyle> => {
    return {
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 20],
          }),
        },
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 15],
          }),
        },
      ],
    };
  };

  return {
    circle1Animation,
    circle2Animation,
    circle3Animation,
    circle4Animation,
    getAnimatedStyle,
  };
};
