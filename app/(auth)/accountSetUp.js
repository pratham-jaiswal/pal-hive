import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { Dropdown } from "react-native-element-dropdown";
import { AccountContext } from "../_layout";

export default function AccountSetup() {
  const { setAccountData, allAccountData, setAllAccountData } =
    useContext(AccountContext);

  const [username, setUsername] = useState("");
  const [pfpSet, setPfpSet] = useState(1);
  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState({ length: true, unique: true });

  const { user } = useAuth0();

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
        setPfpSet(1);
        setLoading(true);
        setValidity({ length: true, unique: true });
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
    const formattedText = text.toLowerCase().replace(/\s+/g, "");
    const isLengthValid = formattedText.length >= 3;
    const isUnique = !allAccountData.some(
      (account) => account.username === formattedText
    );

    setValidity({ length: isLengthValid, unique: isUnique });
    setUsername(formattedText);
  };

  const createAccount = async () => {
    const userAccountDataccountData = {
      username: username,
      email: user.email,
      pfpUri: `https://robohash.org/${username}?set=set${pfpSet}`,
      bio: "Hi, I'm Pratham!",
      followers: [],
      followerCount: 0,
      following: [],
      followingCount: 0,
      posts: [],
      postsCount: 0,
    };

    setAccountData(userAccountDataccountData);
    setAllAccountData([...allAccountData, userAccountDataccountData]);

    router.replace({ pathname: "/(tabs)" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.pfpContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFF9D0" />
            </View>
          )}
          <Image
            source={{
              uri: `https://robohash.org/${username}?set=set${pfpSet}`,
            }}
            style={styles.pfpImage}
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
          {!validity.length ? (
            <Text style={styles.errorText}>
              Username must be at least 3 characters long
            </Text>
          ) : (
            !validity.unique && (
              <Text style={styles.errorText}>Username is already taken</Text>
            )
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
              onPress={createAccount}
              disabled={
                !validity.length || !validity.unique || !username || loading
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
    alignItems: "center",
    elevation: 7,
    overflow: "hidden",
  },
  pfpImage: {
    width: "90%",
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
