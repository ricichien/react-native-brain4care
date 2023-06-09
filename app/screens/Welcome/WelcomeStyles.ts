import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

// import { StyleSheet } from "react-native";
// import { colors } from "../../constants/theme";

// export const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     backgroundColor: colors.white
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 40,
//     fontFamily: "SourceSansPro_200ExtraLight",
//     fontWeight: "normal",
//     fontStyle: "normal",
//     color: colors.secondary,
//     marginBottom: 20,
//   },
//   button: {
//     marginTop: 10,
//     padding: 10,
//     borderRadius: 50,
//     backgroundColor: "transparent",
//   },
//   buttonContent: {
//     padding: 10,
//   },
// });