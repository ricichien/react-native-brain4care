import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Animated,
  ImageBackground,
  GestureResponderEvent,
} from "react-native";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "../../components/GradientText";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import LineDivider from "../../components/LineDivider";
import LineDividerText from "../../components/LineDividerText";
import { colors } from "../../constants/theme";
import { styles } from "./LoginStyles";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
} from "@expo-google-fonts/source-sans-pro";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();
  const [usernameBorderColor, setUsernameBorderColor] = useState(
    colors.lightGray
  );
  const [passwordBorderColor, setPasswordBorderColor] = useState(
    colors.lightGray
  );
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleUsernameFocus = () => {
    setUsernameBorderColor(colors.secondary);
  };

  const handleUsernameBlur = () => {
    setUsernameBorderColor(colors.lightGray);
  };

  const handlePasswordFocus = () => {
    setPasswordBorderColor(colors.secondary);
  };

  const handlePasswordBlur = () => {
    setPasswordBorderColor(colors.lightGray);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleForget = (event: GestureResponderEvent) => void {};

  const handleSignUp = (event: GestureResponderEvent) => void {};

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://dzfaq4l3wb.execute-api.us-east-1.amazonaws.com/qa-deployment-stage/login",
        {
          documento: username,
          senha: password,
        }
      );

      const { dados, token } = response.data;

      const decodedToken = jwtDecode(token);

      setUsername("");
      setPassword("");

      navigation.navigate("Tab", {
        token: token,
        dados: dados,
        decodedToken: decodedToken,
      });
    } catch (error: any) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert(
            "Error",
            "Invalid request",
            [
              {
                text: "OK",
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
        } else if (error.response.status === 403) {
          Alert.alert(
            "Error",
            "Invalid credentials",
            [
              {
                text: "OK",
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
        } else {
          Alert.alert(
            "Error",
            "An error occurred. Please try again later.",
            [
              {
                text: "OK",
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
        }
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response received from the server. Please check your internet connection.",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          "Error",
          "An error occurred. Please try again later.",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
      }

      console.error("Login failed:", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../../assets/sensor-background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.box}>
          <View style={styles.boxContent}>
            <GradientText
              text="access"
              colors={[colors.secondary, colors.green]}
              style={{
                fontSize: 80,
                fontFamily: "SourceSansPro_200ExtraLight",
                fontWeight: "normal",
                fontStyle: "normal",
              }}
            />
            <GradientText
              text="your brain4care account"
              colors={[colors.secondary, colors.green]}
              style={{ fontSize: 13, marginTop: -3 }}
            />
            <LineDivider></LineDivider>

            <View>
              <Text style={styles.text}>
                User (ID for US or CPF for Brazil)
              </Text>
              <TextInput
                keyboardType="numeric"
                placeholder="ID"
                value={username}
                onChangeText={(text) => setUsername(text)}
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
                style={[
                  styles.input,
                  { borderColor: usernameBorderColor, paddingLeft: 35 },
                ]}
              />
              <AntDesign
                name="user"
                size={18}
                color="#bababa"
                style={styles.iconUser}
              />
            </View>
            <View>
              <Text style={styles.text}>Your password:</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  secureTextEntry={!showPassword}
                  style={[
                    styles.input,
                    {
                      borderColor: passwordBorderColor,
                      paddingLeft: 35,
                    },
                  ]}
                />
                <AntDesign
                  name="lock1"
                  size={18}
                  color="#bababa"
                  style={styles.iconPassword}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.toggleButton}
                >
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={18}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleForget} style={styles.button}>
              <Text style={styles.buttonForgot}>Forgot your password?</Text>
            </TouchableOpacity>

            <Animated.View
              style={[styles.buttonContainer, { opacity: buttonOpacity }]}
            >
              <LinearGradient
                colors={[colors.secondary, "#00d7a4"]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text style={styles.buttonText}>Log in to portal</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>

            <LineDividerText text="or"></LineDividerText>

            <Animated.View style={[styles.buttonContainer]}>
              <TouchableOpacity
                onPress={handleSignUp}
                style={styles.buttonSignUp}
              >
                <Text style={styles.buttonSignUpText}>Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
