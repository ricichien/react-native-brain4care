import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: "contain",
      backgroundColor: colors.white
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white
    },
    text: {
      fontSize: 40,
      fontFamily: "SourceSansPro_200ExtraLight",
      fontWeight: "normal",
      fontStyle: "normal",
      color: colors.secondary,
      marginBottom: 20,
    },
    button: {
      marginTop: 10,
      padding: 10,
      borderRadius: 50,
      backgroundColor: "transparent",
    },
    buttonContent: {
      padding: 10,
    },
  });