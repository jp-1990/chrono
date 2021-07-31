import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { colors } from "../../../../styles";

const Segment = ({ percentage, color, rotation }) => {
  // export to seperate file?
  // luminance
  const [r, g, b] = color.replace(/[^\d,]/g, "").split(",");
  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

  const rotateTriangle = 360 * (percentage / 100) * -1;

  const segment = [];
  if (percentage >= 50) {
    segment.push(
      <View
        key={1}
        style={{
          ...styles.container,
          transform: [{ rotate: `${rotation * -1}deg` }],
        }}
      >
        <View style={{ ...styles.segmentHalf, backgroundColor: color }}></View>
        <View
          style={{
            ...styles.triangleOver50,
            transform: [
              { translateX: -125 },
              { rotate: `${rotateTriangle}deg` },
              { translateX: 125 },
            ],
            backgroundColor: color,
          }}
        ></View>
      </View>
    );
  }
  if (percentage < 50) {
    segment.push(
      <View
        key={1}
        style={{
          ...styles.container,
          transform: [{ rotate: `${rotation * -1}deg` }],
        }}
      >
        <View style={styles.segmentHalfTransparent}>
          <View
            style={{
              ...styles.triangleUnder50,
              transform: [
                { translateX: -125 },
                { rotate: `${rotateTriangle}deg` },
                { translateX: 125 },
              ],
              backgroundColor: color,
            }}
          >
            <Pressable
              onPress={() => console.log(color)}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1,
              }}
            ></Pressable>
          </View>
        </View>
      </View>
    );
  }
  return segment;
};

export default Segment;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    backgroundColor: colors.transparent,
    position: "absolute",
    top: 0,
    left: 0,
  },
  segmentHalf: {
    width: 250,
    height: 250,
    position: "absolute",
    left: -125,
    top: 0,
  },
  segmentHalfTransparent: {
    width: 250,
    height: 250,
    position: "relative",
    left: -125,
    top: 0,
    backgroundColor: colors.transparent,
    overflow: "hidden",
  },
  triangleOver50: {
    position: "absolute",
    height: 250,
    width: 250,
    top: 0,
    left: 125,
  },
  triangleUnder50: {
    position: "relative",
    height: 250,
    width: 250,
    top: 0,
    left: 250,
  },
});
