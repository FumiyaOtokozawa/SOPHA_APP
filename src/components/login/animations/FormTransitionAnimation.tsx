import {useRef, useCallback} from 'react';
import {Animated, Dimensions, Platform, ViewStyle} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

type Direction = 'left' | 'right';

export const useFormTransitionAnimation = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateTransition = useCallback(
    (direction: Direction, onComplete: () => void) => {
      // 現在のフォームをスライドアウト
      Animated.timing(slideAnim, {
        toValue: direction === 'left' ? -screenWidth : screenWidth,
        duration: 200,
        useNativeDriver:
          Platform.OS === 'ios' ||
          parseInt(Platform.Version.toString(), 10) >= 21,
      }).start(() => {
        // フォーム切り替えのコールバックを実行
        onComplete();
        // アニメーション値を瞬時に反対側へ移動
        slideAnim.setValue(direction === 'left' ? screenWidth : -screenWidth);
        // 新しいフォームをスライドイン
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver:
            Platform.OS === 'ios' ||
            parseInt(Platform.Version.toString(), 10) >= 21,
        }).start();
      });
    },
    [slideAnim],
  );

  const getAnimatedStyle =
    useCallback((): Animated.WithAnimatedValue<ViewStyle> => {
      return {
        transform: [
          {
            translateX: slideAnim,
          },
        ],
        width: screenWidth,
      };
    }, [slideAnim]);

  return {
    animateTransition,
    getAnimatedStyle,
  };
};
