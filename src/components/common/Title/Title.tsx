import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../Text/Text";

import { colors } from "../../../styles";

interface Props {
  title: string;
  subtitle: string;
}

const Title: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}></View>
      </View>
      <View>
        <Text variant="h2" style={styles.text}>
          {title}
        </Text>
        <Text variant="sp">{subtitle}</Text>
      </View>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 18,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.accentPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: "#D3D3D3",
    borderWidth: 1,
    borderColor: "white",
  },
  text: {
    textTransform: "uppercase",
  },
});
