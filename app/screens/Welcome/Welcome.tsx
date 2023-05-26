import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
} from "@expo-google-fonts/source-sans-pro";
import { colors } from "../../constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Easing } from "react-native";
import GradientText from "../../components/GradientText";
import { styles } from "./WelcomeStyles";

const Welcome = () => {
  const navigation = useNavigation<any>();
  const [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
  });

  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    fadeInAnimation.start();

    return () => {
      fadeInAnimation.stop();
    };
  }, []);

  const handleWelcomePress = () => {
    Animated.parallel([
      Animated.timing(buttonScale, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate("Login");
      buttonScale.setValue(1);
      textOpacity.setValue(1);
    });
  };

  const startPulsateAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacity, {
          toValue: 3,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startPulsateAnimation();
    return () => {
      buttonScale.stopAnimation();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../../assets/sensor-background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
          <GradientText
            text="let's get started"
            colors={[colors.secondary, colors.green]}
            style={{
              fontSize: 40,
              fontFamily: "SourceSansPro_200ExtraLight",
              fontWeight: "normal",
              fontStyle: "normal",
            }}
          />
        </Animated.Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleWelcomePress}
          activeOpacity={0.8}
          onPressIn={startPulsateAnimation}
          onPressOut={() => buttonScale.setValue(1)}
        >
          <Animated.View
            style={[
              styles.buttonContent,
              { transform: [{ scale: buttonScale }] },
            ]}
          >
            <FontAwesome5 name="brain" size={30} color={colors.primary} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: "contain",
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

export default Welcome;
