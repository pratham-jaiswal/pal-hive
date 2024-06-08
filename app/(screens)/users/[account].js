import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import HomeFeed from "../../components/homeFeed";
import Markdown from "react-native-markdown-display";
import { AccountContext } from "../../_layout";
import axios from "axios";
import serverConfig from "../../../server_config";

const fetchUserPosts = async (username, setUserPosts) => {
  try {
    const response = await axios.get(
      `${serverConfig.api_uri}/users/${username}/posts`
    );
    setUserPosts(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchUserData = async (id, setVisitedAccountData) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/users/${id}`);
    setVisitedAccountData(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function Account() {
  const { account, id } = useLocalSearchParams();
  const { accountData, followUser, likePost } = useContext(AccountContext);

  const [visitedAccountData, setVisitedAccountData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    fetchUserData(id, setVisitedAccountData);
    if (account) {
      fetchUserPosts(account, setUserPosts);
    }
  }, [account, accountData]);

  useEffect(() => {
    if (visitedAccountData) {
      setFollowerCount(visitedAccountData.followerCount);
      setFollowingCount(visitedAccountData.followingCount);
    }
  }, [visitedAccountData]);

  return (
    <View style={styles.accountContainer}>
      <View style={styles.accountData}>
        <View style={styles.pfpContainer}>
          {visitedAccountData && visitedAccountData.pfpUri ? (
            <Image
              source={{ uri: visitedAccountData.pfpUri }}
              style={styles.pfpImage}
            />
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFF9D0" />
            </View>
          )}
        </View>
        <View style={styles.leftData}>
          <View style={styles.counts}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoCount}>
                {visitedAccountData.postsCount}
              </Text>
              <Text style={styles.infoTitle}>posts</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoCount}>{followerCount}</Text>
              <Text style={styles.infoTitle}>followers</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoCount}>{followingCount}</Text>
              <Text style={styles.infoTitle}>following</Text>
            </View>
          </View>
          <View style={styles.followBtnContainer}>
            <Pressable
              style={styles.followBtn}
              onPress={() => followUser(visitedAccountData._id)}
            >
              <Text>
                {accountData.following.includes(visitedAccountData._id)
                  ? "Unfollow"
                  : "Follow"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.bio}>
        <Markdown>{visitedAccountData.bio || ""}</Markdown>
      </View>
      <HomeFeed
        accountData={accountData}
        posts={userPosts}
        showFollow={false}
        followUser={followUser}
        likePost={likePost}
        footerMarginBottom={150}
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
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 3,
    overflow: "hidden",
  },
  pfpImage: {
    width: "90%",
    aspectRatio: 1,
  },
  leftData: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width - 40 - 100 - 20,
    paddingBottom: 10,
  },
  counts: {
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
  followBtnContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  followBtn: {
    backgroundColor: "#FFF9D0",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    elevation: 5,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#5AB2FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
