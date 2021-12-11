import React, { useState, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Keyboard,
  BackHandler,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import constants from 'expo-constants';

import { colors, screenSize } from '../../../styles';

interface Props {
  close: () => void;
  active: boolean;
  contentSize: {
    width: number;
    height: number;
  };
  accentColor?: string;
  children: ReactNode;
}

const Modal: React.FC<Props> = ({
  active,
  close,
  contentSize,
  accentColor = colors.buttonPrimary,
  children,
}) => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const opacity = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const borderRadius = useSharedValue(20);

  // animated styles
  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const animatedContentHeight = useAnimatedStyle(() => {
    return {
      height: contentHeight.value,
    };
  });
  const animatedBorderRadius = useAnimatedStyle(() => {
    return {
      borderTopRightRadius: borderRadius.value,
      borderTopLeftRadius: borderRadius.value,
    };
  });

  useEffect(() => {
    if (active) {
      if (!modalActive) setModalActive(true);
      opacity.value = withTiming(1);
      contentHeight.value = withTiming(
        contentSize.height + (contentSize.height > 0 ? 36 : 1),
        animationOptions
      );
    }
  }, [active, contentSize]);

  useEffect(() => {
    if (!active) {
      if (modalActive) {
        handleBackgroundPressClose();
      }
    }
  }, [active]);

  useEffect(() => {
    const onHardwareBack = () => {
      handleBackgroundPressClose();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onHardwareBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onHardwareBack);
    };
  }, []);

  // variables
  const autoCloseThreshold = 150;
  const gestureModfier = 1.5;
  const animationOptions = {
    duration: 500,
    easing: Easing.out(Easing.exp),
  };

  // close modal from ui
  const handleClose = () => {
    Keyboard.dismiss();
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        runOnJS(setModalActive)(false);
        runOnJS(close)();
      }
    });
  };

  // close modal via background press
  const handleBackgroundPressClose = () => {
    Keyboard.dismiss();
    contentHeight.value = withTiming(0, animationOptions);
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        runOnJS(setModalActive)(false);
        runOnJS(close)();
      }
    });
  };

  interface GestureContext {
    currentHeight: number;
  }

  // gesture handling function
  const handleOnGesture = (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    ctx: GestureContext,
    state: 'START' | 'ACTIVE' | 'END'
  ) => {
    'worklet';
    const height = ctx.currentHeight;
    const gestureY = event.translationY;

    const shouldClose = height - gestureY * gestureModfier < autoCloseThreshold;
    const shouldFillScreen =
      height - gestureY * gestureModfier >
      screenSize.height - autoCloseThreshold;

    if (shouldClose) {
      contentHeight.value = withTiming(0, animationOptions);
      if (state === 'END') runOnJS(handleClose)();
      return;
    }

    if (shouldFillScreen) {
      contentHeight.value = withTiming(
        screenSize.height - constants.statusBarHeight,
        animationOptions
      );
      borderRadius.value = withTiming(0, animationOptions);
      return;
    }

    borderRadius.value = 20;
    contentHeight.value = withTiming(height - gestureY * gestureModfier, {
      ...animationOptions,
      duration: 300,
    });
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { currentHeight: number }) => {
      ctx.currentHeight = contentHeight.value;
    },
    onActive: (event, ctx) => {
      handleOnGesture(event, ctx, 'ACTIVE');
    },
    onEnd: (event, ctx) => {
      handleOnGesture(event, ctx, 'END');
    },
  });

  return (
    <>
      <Pressable
        style={[
          {
            height: modalActive ? '100%' : 0,
            width: '100%',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
          },
        ]}
        onPress={handleBackgroundPressClose}
      >
        <Animated.View
          style={[
            { height: modalActive ? '100%' : 0 },
            styles.background,
            animatedOpacity,
          ]}
        ></Animated.View>
      </Pressable>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedContentHeight, styles.container]}>
          <Animated.View style={[animatedBorderRadius, styles.headerContainer]}>
            <View style={styles.whiteBar}></View>
            <View
              style={[styles.colorBar, { backgroundColor: accentColor }]}
            ></View>
          </Animated.View>
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Modal;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    backgroundColor: colors.modalBackground,
  },
  container: {
    zIndex: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    width: '100%',
    height: 36,
    backgroundColor: colors.menuSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBar: {
    height: 7,
    width: 210,
    backgroundColor: colors.backgroundColor,
    marginBottom: 2,
    borderRadius: 1,
  },
  colorBar: {
    height: 4,
    width: 210,
    borderRadius: 1,
    marginBottom: 3,
  },
  contentContainer: {
    height: 'auto',
    width: '100%',
    backgroundColor: colors.backgroundColor,
  },
});
