import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { MaskedViewBase } from "@react-native-community/masked-view";
import MaskedView from "@react-native-masked-view/masked-view";

import { TextStyle } from "react-native";

interface GradientTextProps {
  text: string;
  colors: string[];
  style: TextStyle;
}

const GradientText: React.FC<GradientTextProps> = ({ text, colors, style }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]}>{text}</Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: style.fontSize,
            opacity: 0,
            fontWeight: style.fontWeight,
            fontFamily: style.fontFamily,
            fontStyle: style.fontStyle,
            marginTop: style.marginTop,
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
