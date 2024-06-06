import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validity, setValidity] = useState({
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
        setEmail("");
        setPassword("");
        setValidity({
          email: true,
          password: true,
        });
      };
    }, [])
  );

  const handlePassword = (text) => {
    if (text.length < 1) {
      setValidity({ ...validity, password: false });
    } else {
      setValidity({ ...validity, password: true });
    }
    setPassword(text.replace(/\s+/g, ''));
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

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputForm}>
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
          <View style={[styles.rowContainer, { justifyContent: "center" }]}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.5}
              disabled={!validity.email || !validity.password || !email || !password }
            >
              <Text style={styles.btnText}>Login</Text>
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
    marginTop: "40%",
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
