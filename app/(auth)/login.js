import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function Login() {
  const { authorize } = useAuth0();

  const authorizeUser = async () => {
    try {
      await authorize();
      router.replace({ pathname: "/(tabs)" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.authBtn}
        activeOpacity={0.5}
        onPress={authorizeUser}
      >
        <Text style={styles.btnText}>Log in / Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  authBtn: {
    width: "80%",
    marginTop: Dimensions.get("window").height / 3,
    backgroundColor: "#FFF9D0",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 7,
    elevation: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#5AB2FF",
    fontSize: 20,
  },
});
