import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5AB2FF",
        tabBarInactiveTintColor: "#FFF9D0",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 16,
          backgroundColor: "#A0DEFF",
        },
      }}
      sceneContainerStyle={{
        backgroundColor: "#5AB2FF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Pal Hive",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },          
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: (data) => (
            <Ionicons
              name="home"
              size={24}
              color={data.color}
              style={[
                styles.tabIcon,
                {
                  backgroundColor: data.focused
                    ? "rgba(255, 249, 208, 0.8)"
                    : "transparent",
                  opacity: data.focused ? 1 : 0.9,
                },
              ]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: "/(screens)/chat" })}
            >
              <Ionicons
                name="chatbox-ellipses"
                size={24}
                style={{
                  color: "#FFF9D0",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  marginRight: 20,
                  textAlign: "center",
                  borderRadius: 25,
                  marginLeft: "5%",
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Explore",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          tabBarIcon: (data) => (
            <Ionicons
              name="search"
              size={24}
              color={data.color}
              style={[
                styles.tabIcon,
                {
                  backgroundColor: data.focused
                    ? "rgba(255, 249, 208, 0.8)"
                    : "transparent",
                  opacity: data.focused ? 1 : 0.9,
                },
              ]}
            />
          ),
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerTitle: "Notifications",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          headerShown: true,
          tabBarIcon: (data) => (
            <Ionicons
              name="notifications"
              size={24}
              color={data.color}
              style={[
                styles.tabIcon,
                {
                  backgroundColor: data.focused
                    ? "rgba(255, 249, 208, 0.8)"
                    : "transparent",
                  opacity: data.focused ? 1 : 0.9,
                },
              ]}
            />
          ),
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "user101",
          headerStyle: { backgroundColor: "#5AB2FF" },
          headerTitleStyle: {
            fontStyle: "italic",
            fontFamily: "monospace",
            color: "#FFF9D0",
            marginLeft: 5,
          },
          headerShown: true,
          tabBarIcon: (data) => (
            <Ionicons
              name="person"
              size={24}
              color={data.color}
              style={[
                styles.tabIcon,
                {
                  backgroundColor: data.focused
                    ? "rgba(255, 249, 208, 0.8)"
                    : "transparent",
                  opacity: data.focused ? 1 : 0.9,
                },
              ]}
            />
          ),
          headerShown: true,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: "/(screens)/settings" })}
            >
              <Ionicons
                name="settings"
                size={22}
                style={{
                  color: "#FFF9D0",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  marginRight: 20,
                  textAlign: "center",
                  borderRadius: 25,
                  marginLeft: "5%",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    height: "50%",
    width: "50%",
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: 16,
  },
});
