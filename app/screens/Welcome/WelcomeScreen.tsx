import React, { useEffect, useRef } from "react";
import {
  View,
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

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
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
        Animated.timing(buttonScale, {
          toValue: 0.9,
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
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require("../../../assets/sensor-background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
            <GradientText
              text="Let's get started"
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
    </Animated.View>
  );
};

export default WelcomeScreen;

// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   ImageBackground,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import {
//   useFonts,
//   SourceSansPro_200ExtraLight,
// } from "@expo-google-fonts/source-sans-pro";
// import { colors } from "../../constants/theme";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Easing } from "react-native";
// import GradientText from "../../components/GradientText";
// import { styles } from "./WelcomeStyles";

// const WelcomeScreen = () => {
//   const navigation = useNavigation<any>();
//   const [fontsLoaded] = useFonts({
//     SourceSansPro_200ExtraLight,
//   });

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;
//   const buttonScale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   useEffect(() => {
//     const fadeInAnimation = Animated.timing(textOpacity, {
//       toValue: 1,
//       duration: 1000,
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: true,
//     });

//     fadeInAnimation.start();

//     return () => {
//       fadeInAnimation.stop();
//     };
//   }, []);

//   const handleWelcomePress = () => {
//     Animated.parallel([
//       Animated.timing(buttonScale, {
//         toValue: 0.4,
//         duration: 500,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }),
//       Animated.timing(buttonScale, {
//         toValue: 1.2,
//         duration: 200,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }),
//       // Animated.timing(textOpacity, {
//       //   toValue: 1.2,
//       //   duration: 200,
//       //   easing: Easing.inOut(Easing.ease),
//       //   useNativeDriver: true,
//       // }),
//     ]).start(() => {
//       navigation.navigate("Login");
//       buttonScale.setValue(1);
//       textOpacity.setValue(1);
//     });
//   };

//   const startPulsateAnimation = () => {
//     Animated.loop(
//       Animated.sequence([
//         // Animated.timing(textOpacity, {
//         //   toValue: 3,
//         //   duration: 1000,
//         //   easing: Easing.inOut(Easing.ease),
//         //   useNativeDriver: true,
//         // }),
//         Animated.timing(buttonScale, {
//           toValue: 0.9,
//           duration: 500,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//         Animated.timing(buttonScale, {
//           toValue: 1,
//           duration: 500,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   useEffect(() => {
//     startPulsateAnimation();
//     return () => {
//       buttonScale.stopAnimation();
//     };
//   }, []);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <ImageBackground
//         source={require("../../../assets/sensor-background.png")}
//         style={styles.backgroundImage}
//       >
//         <View style={styles.container}>
//           <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
//             <GradientText
//               text="Let's get started"
//               colors={[colors.secondary, colors.green]}
//               style={{
//                 fontSize: 40,
//                 fontFamily: "SourceSansPro_200ExtraLight",
//                 fontWeight: "normal",
//                 fontStyle: "normal",
//               }}
//             />
//           </Animated.Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleWelcomePress}
//             activeOpacity={0.8}
//             onPressIn={startPulsateAnimation}
//             onPressOut={() => buttonScale.setValue(1)}
//           >
//             <Animated.View
//               style={[
//                 styles.buttonContent,
//                 { transform: [{ scale: buttonScale }] },
//               ]}
//             >
//               <FontAwesome5 name="brain" size={30} color={colors.primary} />
//             </Animated.View>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </Animated.View>
//   );
// };

// export default WelcomeScreen;
