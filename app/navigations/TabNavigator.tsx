import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "react-native";

import { colors } from "../constants/theme";
import NearbyDevicesScreen from "../screens/NearbyDevices/NearbyDevicesScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ReportListScreen from "../screens/ReportList/ReportListScreen";

const tabs = [
  {
    name: "Home",
    screen: HomeScreen,
  },
  {
    name: "Reports",
    screen: ReportListScreen,
  },
  {
    name: "Sensors",
    screen: NearbyDevicesScreen,
  },
];

const Tab = createMaterialTopTabNavigator();

const TabNavigator: React.FC = ({ route }: any) => {
  const { token, dados } = route.params;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarPosition="top"
        screenOptions={{
          tabBarPressOpacity: 1,
          tabBarShowLabel: true,
          tabBarPressColor: "transparent",
          tabBarStyle: {
            elevation: 1,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            backgroundColor: colors.primary,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      >
        {tabs.map(({ name, screen }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={screen}
            options={{
              tabBarLabel: name,
              tabBarLabelStyle: {
                color: colors.white,
              },
            }}
            initialParams={{ token, dados }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
