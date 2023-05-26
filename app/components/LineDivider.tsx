import React from "react";
import { View, StyleSheet } from "react-native";

const LineDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    backgroundColor: "#d5d5d5",
  },
});

export default LineDivider;
