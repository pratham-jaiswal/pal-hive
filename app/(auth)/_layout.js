import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../_layout";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Pal Hive",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#5AB2FF" },
        }}
      />
      <Stack.Screen
        name="accountSetUp"
        options={{
          headerTitle: "Account Setup",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#5AB2FF" },
        }}
      />
    </Stack>
  );
}
