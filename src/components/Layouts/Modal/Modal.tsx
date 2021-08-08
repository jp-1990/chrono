import React, { useState, useEffect, ReactNode } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import constants from "expo-constants";

import { colors, screenSize } from "../../../styles";

interface Props {
  setActive: (arg: boolean) => void;
  active: boolean;
  contentSize: {
    width: number;
    height: number;
  };
  children: ReactNode;
}

const Modal: React.FC<Props> = ({
  setActive,
  active,
  contentSize,
  children,
}) => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  // close modal
  const handleClose = () => {
    contentHeight.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        runOnJS(setModalActive)(false);
        runOnJS(setActive)(false);
      }
    });
  };

  const opacity = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const borderRadius = useSharedValue(20);

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

  const autoOffset = 150;
  const gestureModfier = 1.5;
  const animationOptions = {
    duration: 500,
    easing: Easing.out(Easing.exp),
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { currentHeight: number }) => {
      ctx.currentHeight = contentHeight.value;
    },
    onActive: (event, ctx) => {
      if (
        ctx.currentHeight - event.translationY * gestureModfier <
        autoOffset
      ) {
        return runOnJS(handleClose)();
      }
      if (
        ctx.currentHeight - event.translationY * gestureModfier >
        screenSize.height - autoOffset
      ) {
        contentHeight.value = withTiming(
          screenSize.height - constants.statusBarHeight,
          {
            duration: 300,
            easing: Easing.out(Easing.exp),
          }
        );
        borderRadius.value = 0;
        return;
      }
      borderRadius.value = 20;
      contentHeight.value = withTiming(
        ctx.currentHeight - event.translationY * gestureModfier,
        {
          duration: 300,
          easing: Easing.out(Easing.exp),
        }
      );
    },
    onEnd: (event, ctx) => {
      if (
        ctx.currentHeight - event.translationY * gestureModfier <
        autoOffset
      ) {
        return runOnJS(handleClose)();
      }
      if (
        ctx.currentHeight - event.translationY * gestureModfier >
        screenSize.height - autoOffset
      ) {
        contentHeight.value = withTiming(
          screenSize.height - constants.statusBarHeight,
          animationOptions
        );
        borderRadius.value = 0;
        return;
      }
      borderRadius.value = 20;
      contentHeight.value = withTiming(
        ctx.currentHeight - event.translationY * gestureModfier,
        animationOptions
      );
    },
  });

  return (
    <>
      <Pressable
        style={[
          {
            height: modalActive ? "100%" : 0,
            width: "100%",
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
          },
        ]}
        onPress={handleClose}
      >
        <Animated.View
          style={[
            { height: modalActive ? "100%" : 0 },
            styles.background,
            animatedOpacity,
          ]}
        ></Animated.View>
      </Pressable>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedContentHeight, styles.container]}>
          <Animated.View style={[animatedBorderRadius, styles.headerContainer]}>
            <View style={styles.whiteBar}></View>
            <View style={styles.blueBar}></View>
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
    width: "100%",
    backgroundColor: colors.modalBackground,
  },
  container: {
    zIndex: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    width: "100%",
    height: 36,
    backgroundColor: colors.menuSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteBar: {
    height: 7,
    width: 210,
    backgroundColor: colors.backgroundColor,
    marginBottom: 2,
    borderRadius: 1,
  },
  blueBar: {
    height: 4,
    width: 210,
    backgroundColor: colors.buttonPrimary,
    borderRadius: 1,
    marginBottom: 3,
  },
  contentContainer: {
    height: "auto",
    width: "100%",
    backgroundColor: colors.backgroundColor,
  },
  content: {},
});
