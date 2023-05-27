import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    box: {
      backgroundColor: colors.white,
      borderRadius: 3,
      paddingHorizontal: 25,
      paddingBottom: 30,
      position: "relative",
      zIndex: 1,
    },
    boxContent: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    input: {
      color: "#888696",
      fontSize: 12,
      backgroundColor: "transparent",
      borderBottomWidth: 0.5,
      borderColor: colors.lightGray,
      marginBottom: 10,
      padding: 3,
      width: 300,
      position: "relative",
    },
    buttonContainer: {
      marginTop: 8,
      width: 300,
      borderRadius: 8,
      overflow: "hidden",
    },
    button: {
      padding: 8,
    },
    buttonText: {
      color: colors.white,
      fontSize: 12,
      alignItems: "center",
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
    },
    buttonSignUp: {
      marginTop: 1,
      borderColor: colors.gray,
      borderWidth: 1,
      padding: 13,
      alignItems: "center",
      borderRadius: 8,
      opacity: 0.4
    },
    buttonSignUpText: {
      color: "#bababa",
      fontSize: 12,
      fontWeight: "400",
      // opacity: 1,
    },
    buttonForgot: {
      marginTop: -5,
      fontSize: 13,
      color: colors.secondary,
      marginBottom: 2,
    },
    text: {
      marginLeft: 1,
      marginBottom: -2,
      fontSize: 12,
      color: colors.primary,
      alignItems: "flex-start",
    },
    toggleButton: {
      position: "absolute",
      top: 2,
      right: 1,
      padding: 5,
    },
    iconUser: {
      position: "absolute",
      top: 18,
      right: 275,
      padding: 5,
    },
    iconPassword: {
      position: "absolute",
      top: 2,
      right: 275,
      padding: 5,
    },
    passwordInputContainer: {
      position: "relative",
    },
  });