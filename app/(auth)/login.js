import { router } from "expo-router";
import { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { AccountContext } from "../_layout";
import axios from "axios";
import serverConfig from "../../server_config";

const checkEmailExists = async (email) => {
  try {
    const response = await axios.post(`${serverConfig.api_uri}/check-email`, {
      email,
    });
    return response.data.exists;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default function Login() {
  const { setAccountData } = useContext(AccountContext);

  const { authorize, isLoading, user } = useAuth0();

  useEffect(() => {
    const check = async () => {
      if (!isLoading) {
        if (!user) {
          setAccountData({});
        } else {
          if (await checkEmailExists(user.email)) {
            router.replace({ pathname: "/(tabs)" });
          } else {
            router.replace({ pathname: "/(auth)/accountSetUp" });
          }
        }
      }
    };
    check();
  }, [user]);

  const authorizeUser = async () => {
    try {
      await authorize();
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
