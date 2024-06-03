import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import HomeFeed from "../../components/homeFeed";

export default function Account() {
  const data = useLocalSearchParams();
  { account, userData, allAccountData, followUser }

  const account = data.account;
  const userData = JSON.parse(data.userData);
  const allAccountData = JSON.parse(data.allAccountData);
  const followUser = data.followUser;
  const setAccountData = data.setAccountData;
  
  const [visitedAccountData, setVisitedAccountData] = useState(
    allAccountData.find((data) => data.username === account) || {}
  );

  return (
    <View style={styles.accountContainer}>
      <View style={styles.accountData}>
        <View style={styles.pfpContainer}>
          <Image
            source={{ uri: visitedAccountData.pfpUri }}
            style={styles.pfpImage}
          />
        </View>
        <View style={styles.leftData}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCount}>
              {visitedAccountData.postsCount}
            </Text>
            <Text style={styles.infoTitle}>posts</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCount}>
              {visitedAccountData.followerCount}
            </Text>
            <Text style={styles.infoTitle}>followers</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCount}>
              {visitedAccountData.followingCount}
            </Text>
            <Text style={styles.infoTitle}>following</Text>
          </View>
        </View>
      </View>
      <View style={styles.bio}>
        <Text>{visitedAccountData.bio}</Text>
      </View>
      <HomeFeed
        accountData={userData}
        setAccountData={setVisitedAccountData}
        posts={visitedAccountData.posts}
        showFollow={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    height: "100%",
    marginTop: 10,
    marginHorizontal: 20,
  },
  accountData: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pfpContainer: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#5AB2FF",
    borderColor: "#A0DEFF",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  pfpImage: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 100,
  },
  leftData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width - 40 - 100 - 20,
    paddingBottom: 10,
  },
  infoContainer: {
    flexDirection: "column",
  },
  infoCount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "monospace",
  },
  infoTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  bio: {
    marginTop: 10,
    backgroundColor: "#A0DEFF",
    height: 100,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 5,
  },
});
