import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

interface LineDividerProps {
  text: string;
}

const LineDividerText: React.FC<LineDividerProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d5d5d5",
    opacity: 0.5,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 13,
    color: "#d5d5d5",
    opacity: 0.99,
  },
});

export default LineDividerText;
