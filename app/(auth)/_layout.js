import { Tabs } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../_layout";

export default function TabLayout() {
  const { accountData } = useContext(AccountContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5AB2FF",
        tabBarInactiveTintColor: "#FFF9D0",
        tabBarActiveBackgroundColor: "#FFF9D0",
        tabBarIconStyle: { display: "none" },
        tabBarStyle: {
          height: 60,
          position: "absolute",
          backgroundColor: "#A0DEFF",
        },
        tabBarLabelStyle: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlignVertical: "center",
          fontSize: 16,
        },
        headerTitle: "Pal Hive",
        headerShadowVisible: false,
      }}
      sceneContainerStyle={{
        backgroundColor: "#5AB2FF",
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          tabBarLabel: "Login",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          tabBarLabel: "Register",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
