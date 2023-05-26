import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.white,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    searchBar: {
      flex: 1,
      position: "relative",
    },
    searchInput: {
      height: 40,
      backgroundColor: colors.white,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderColor: colors.primary,
    },
    content: {
      flex: 1,
    },
    list: {
      flexGrow: 1,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    icon: {
      marginRight: 8,
    },
    itemContent: {
      flex: 1,
    },
    itemLabel: {
      fontWeight: "bold",
      marginBottom: 4,
    },
    itemText: {
      marginBottom: 8,
    },
    boxItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    iconContainer: {
      backgroundColor: colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },
    reportBoxContent: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      marginBottom: 4,
    },
    label: {
      fontWeight: "bold",
      marginRight: 4,
    },
    text: {
      flex: 1,
    },
  });