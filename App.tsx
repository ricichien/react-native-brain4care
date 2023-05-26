import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "react-native";
import { colors } from "./app/constants/theme";

import Login from "./app/screens/Login/Login";
import Welcome from "./app/screens/Welcome/Welcome";
import TabNavigator from "./app/navigations/TabNavigator";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.white,
            width: 240,
          },
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
          component={Welcome}
          options={({}) => ({
            drawerItemStyle: { height: 0 },
            headerTitle: "",
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
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
