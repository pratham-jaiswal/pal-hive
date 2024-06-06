import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pfpSet, setPfpSet] = useState();
  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState({
    username: true,
    email: true,
    password: true,
  });

  const pfpSetList = [
    { label: "Robo", value: 1 },
    { label: "Monster", value: 2 },
    { label: "Robo Head", value: 3 },
    { label: "Kitten", value: 4 },
    { label: "Human", value: 5 },
  ];

  useFocusEffect(
    useCallback(() => {
      return () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setPfpSet();
        setLoading(true);
        setValidity({
          username: true,
          email: true,
          password: true,
        });
      };
    }, [])
  );

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleUsername = (text) => {
    if (text.length < 3) {
      setValidity({ ...validity, username: false });
    } else {
      setValidity({ ...validity, username: true });
    }
    setUsername(text.toLowerCase().replace(/\s+/g, ''));
  };

  const handleEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setValidity({ ...validity, email: false });
    } else {
      setValidity({ ...validity, email: true });
    }
    setEmail(text.toLowerCase().replace(/\s+/g, ''));
  };

  const handlePassword = (text) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(text)) {
      setValidity({ ...validity, password: false });
    } else {
      setValidity({ ...validity, password: true });
    }
    setPassword(text.replace(/\s+/g, ''));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View
          style={[
            styles.pfpContainer,
            {
              alignItems: pfpSet != 3 ? "center" : "flex-end",
            },
          ]}
        >
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFF9D0" />
            </View>
          )}
          <Image
            source={{
              uri: `https://robohash.org/${username}?set=set${pfpSet}`,
            }}
            style={[styles.pfpImage, { width: pfpSet != 4 ? "95%" : "80%" }]}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        </View>
        <View style={styles.inputForm}>
          <TextInput
            inputMode="text"
            style={styles.textInput}
            placeholder="username"
            value={username}
            onChangeText={handleUsername}
          />
          {!validity.username && (
            <Text style={styles.errorText}>
              Username must be at least 3 characters long
            </Text>
          )}
          <TextInput
            inputMode="email"
            style={styles.textInput}
            placeholder="email"
            value={email}
            onChangeText={handleEmail}
          />
          {!validity.email && (
            <Text style={styles.errorText}>
              Please enter a valid email address
            </Text>
          )}
          <TextInput
            inputMode="text"
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="password"
            value={password}
            onChangeText={handlePassword}
          />
          {!validity.password && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters long, contain one uppercase
              letter, one lowercase letter, one number, and one special
              character
            </Text>
          )}
          <View style={styles.rowContainer}>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Profile Pic Type:
            </Text>
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={{
                backgroundColor: "#5AB2FF",
                borderRadius: 7,
                elevation: 3,
              }}
              activeColor="#A0DEFF"
              data={pfpSetList}
              dropdownPosition="top"
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={pfpSet}
              placeholder="Choose..."
              onChange={(item) => {
                setPfpSet(item.value);
              }}
              renderItem={renderItem}
            />
          </View>
          <View style={[styles.rowContainer, { justifyContent: "center" }]}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.5}
              disabled={
                !validity.username ||
                !validity.email ||
                !validity.password ||
                !username ||
                !email ||
                !password
              }
            >
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  formContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  pfpContainer: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#5AB2FF",
    borderColor: "#A0DEFF",
    borderWidth: 4,
    justifyContent: "flex-end",
    elevation: 7,
    overflow: "hidden",
  },
  pfpImage: {
    aspectRatio: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#5AB2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFF9D0",
    fontSize: 16,
  },
  inputForm: {
    width: "100%",
    marginVertical: 50,
    alignItems: "center",
    gap: 20,
  },
  textInput: {
    width: "80%",
    backgroundColor: "#FFF9D0",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 7,
    fontSize: 16,
    color: "#5AB2FF",
    elevation: 7,
  },
  errorText: {
    color: "red",
    width: "80%",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 14,
    marginTop: -15,
  },
  rowContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdown: {
    width: "50%",
    backgroundColor: "#FFF9D0",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    fontSize: 16,
    color: "#5AB2FF",
    elevation: 7,
  },
  selectedTextStyle: {
    color: "#5AB2FF",
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: "#FFF9D0",
  },
  btn: {
    width: "40%",
    backgroundColor: "#FFF9D0",
    paddingVertical: 10,
    borderRadius: 7,
    elevation: 7,
    alignItems: "center",
  },
  btnText: {
    color: "#5AB2FF",
    fontSize: 16,
  },
});
