import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BackHandler, StatusBar } from "react-native";
import { colors } from "./app/constants/theme";

import LoginScreen from "./app/screens/Login/LoginScreen";
import WelcomeScreen from "./app/screens/Welcome/WelcomeScreen";
import TabNavigator from "./app/navigations/TabNavigator";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={({}) => ({
            drawerItemStyle: { height: 0 },
            headerTitle: "",
            headerStyle: {
              backgroundColor: colors.primary,
              elevation: 1,
            },
          })}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={({}) => ({
            drawerItemStyle: { height: 0 },
            headerTitle: "",
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({}) => ({
            headerShown: false,
            title: "Log out",
            headerBackground: () => (
              <>
                <StatusBar
                  barStyle="dark-content"
                  backgroundColor="transparent"
                  translucent
                />
              </>
            ),
            headerStatusBarHeight: StatusBar.currentHeight,
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
