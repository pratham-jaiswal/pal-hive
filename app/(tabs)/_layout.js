import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../_layout";
import { useAuth0 } from "react-native-auth0";
import axios from "axios";
import serverConfig from "../../server_config";
import * as Font from "expo-font";

const fetchAllUsers = async (setUsers) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/users`, {
      headers: {
        "x-api-key": serverConfig.api_key,
        "Content-Type": "application/json",
      },
    });
    setUsers(response.data);
  } catch (error) {
    console.error(error);
  }
};

const checkEmailExists = async (email, setAccountData) => {
  try {
    const response = await axios.post(
      `${serverConfig.api_uri}/check-email`,
      {
        email,
      },
      {
        headers: {
          "x-api-key": serverConfig.api_key,
          "Content-Type": "application/json",
        },
      }
    );
    setAccountData(response.data.user || {});
    return response.data.exists;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default function TabLayout() {
  const { accountData, setAccountData } = useContext(AccountContext);
  const { hasValidCredentials, clearSession, isLoading, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    try {
      fetchAllUsers(setUsers);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const check = async () => {
        if (!user) {
          setAccountData({});
        } else {
          if (await checkEmailExists(user.email, setAccountData)) {
            setLoading(false);
          } else {
            router.replace({ pathname: "/(auth)/accountSetUp" });
          }
        }
      };

      const isLoggedIn = async () => {
        const loggedIn = await hasValidCredentials();
        if (loggedIn) {
          await check();
        } else {
          router.replace({ pathname: "/(auth)/login" });
        }
      };

      isLoggedIn();
    } catch (e) {
      console.error(e);
    }
  }, [isLoading, users, user]);

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (accountData) {
      setTimeout(() => {
        setUsername(accountData.username);
      }, 1000);
    }
  }, [accountData]);

  if (loading || isLoading) {
    return null;
  }

  const LogOut = async () => {
    try {
      setLogoutModalVisible(false);
      await clearSession();
      router.replace({ pathname: "/(auth)/login" });
      setAccountData({});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
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
            // headerRight: () => (
            //   <TouchableOpacity
            //     activeOpacity={0.7}
            //     onPress={() => router.push({ pathname: "/(screens)/chat" })}
            //   >
            //     <Ionicons
            //       name="chatbox-ellipses"
            //       size={24}
            //       style={{
            //         color: "#FFF9D0",
            //         paddingVertical: 5,
            //         paddingHorizontal: 5,
            //         marginRight: 20,
            //         textAlign: "center",
            //         borderRadius: 25,
            //         marginLeft: "5%",
            //         marginLeft: 5,
            //       }}
            //     />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerTitle: "Explore",
            headerStyle: { backgroundColor: "#5AB2FF" },
            headerTitleStyle: {
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
          name="createPost"
          options={{
            headerTitle: "New Post",
            headerStyle: { backgroundColor: "#5AB2FF" },
            headerTitleStyle: {
              fontFamily: "monospace",
              color: "#FFF9D0",
              marginLeft: 5,
            },
            headerShown: true,
            tabBarIcon: (data) => (
              <Ionicons
                name="add-circle-outline"
                size={30}
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
          name="profile"
          options={{
            headerTitle: username,
            headerStyle: { backgroundColor: "#5AB2FF" },
            headerTitleStyle: {
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
              <View style={styles.iconConatiner}>
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({ pathname: "/(screens)/settings" })
                  }
                >
                  <Ionicons
                    name="settings"
                    size={22}
                    style={{
                      color: "#FFF9D0",
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      textAlign: "center",
                    }}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setLogoutModalVisible(true)}
                >
                  <Ionicons
                    name="log-out"
                    size={26}
                    style={{
                      color: "#FFF9D0",
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      textAlign: "center",
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Tabs>
      <Modal
        animationType="none"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => {
          setLogoutModalVisible(!logoutModalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: "#00000080",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff9d0e6",
              width: "60%",
              borderRadius: 12,
              paddingVertical: 20,
              paddingHorizontal: 20,
              justifyContent: "space-between",
              gap: 30,
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center" }}>Do you wish to Log Out?</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#5AB2FF",
                  borderRadius: 12,
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                }}
                activeOpacity={0.5}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={{ textAlign: "center", color: "#FFF9D0" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  borderRadius: 12,
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                }}
                activeOpacity={0.5}
                onPress={LogOut}
              >
                <Text style={{ textAlign: "center", color: "#FFF9D0" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: "60%",
    aspectRatio: 1,
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: 16,
  },
  iconConatiner: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginRight: 20,
  },
});
