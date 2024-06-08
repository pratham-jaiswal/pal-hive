import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFF9D0",
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            style={{
              borderRadius: 25,
              width: 30,
              aspectRatio: 1,
              paddingLeft: 1,
              marginTop: 1,
              marginRight: 7,
              justifyContent: "center",
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF9D0" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
          },
          contentStyle: { backgroundColor: "#5AB2FF" },
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerTitle: "Messages",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
          },
          contentStyle: { backgroundColor: "#5AB2FF" },
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="users/[account]"
        options={({ route }) => ({
          headerTitle: `@${route.params.account}`,
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
          },
          contentStyle: { backgroundColor: "#5AB2FF" },
          headerShown: true,
          headerShadowVisible: false,
        })}
      />
    </Stack>
  );
}
