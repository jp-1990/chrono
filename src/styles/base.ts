import { ViewStyle, TextStyle, Dimensions } from "react-native";

interface StyleTypes {
  defaultInput: TextStyle;
  screen: ViewStyle;
  contentWrapper: ViewStyle;
  border: ViewStyle;
}

export const base: StyleTypes = {
  defaultInput: {
    backgroundColor: "#EBEBEB",
    paddingVertical: 6,
    paddingHorizontal: 16,
    margin: 5,
    width: 250,
    fontSize: 14,
    fontFamily: "lato-regular",
    color: "#705E57",
    borderRadius: 3,
  },
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  border: {
    borderRadius: 3,
  },
};

export const screenSize = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
};

export const colors = {
  accentPrimary: "#818CA0",
  menuPrimary: "#818CA0",
  menuSecondary: "#454851",
  buttonPrimary: "#3DB6F9",
  buttonSecondary: "#5484CB",
  buttonText: "#F5F5F5",
  buttonPrimaryRipple: "#99D9FD",
  buttonSecondaryRipple: "#B5D2FD",
  buttonTextRipple: "#EBEBEB",
  textPrimary: "#454851",
  textSecondary: "#818CA0",
  headingPrimary: "#705E57",
  headingSecondary: "#B7B7B7",
  backgroundColor: "#fff",
  transparent: "transparent",
  positive: "#00C31F",
  negative: "#C90000",
  modalBackground: "rgba(69,72,81,0.6)",
  newActivityBackground: "rgba(218,218,218,1)",
};

export const text = {
  h1: {
    fontSize: 34,
    fontFamily: "lato-light",
    color: colors.headingPrimary,
  },
  h2: {
    fontSize: 27,
    fontFamily: "lato-light",
    color: colors.headingPrimary,
  },
  h3: {
    fontSize: 22,
    fontFamily: "lato-light",
    color: colors.headingPrimary,
  },
  h4: {
    fontSize: 18,
    fontFamily: "lato-light",
    color: colors.headingSecondary,
  },
  main: {
    fontSize: 14,
    fontFamily: "lato-regular",
    color: colors.textPrimary,
  },
  sp: {
    fontSize: 12,
    fontFamily: "lato-regular",
    color: colors.headingSecondary,
  },
  ssp: {
    fontSize: 10,
    fontFamily: "lato-regular",
    color: colors.headingSecondary,
  },
};
