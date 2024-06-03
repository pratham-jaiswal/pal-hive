import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        statusBarTranslucent: true,
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(screens)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
