import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import HomeFeed from "../components/homeFeed";
import Markdown from "react-native-markdown-display";
import { AccountContext } from "../_layout";
import axios from "axios";
import serverConfig from "../../server_config";

const fetchUserPosts = async (username, setUserPosts, setRefreshing) => {
  try {
    const response = await axios.get(
      `${serverConfig.api_uri}/users/${username}/posts`,
      {
        headers: {
          "x-api-key": serverConfig.api_key,
          "Content-Type": "application/json",
        },
      }
    );
    setUserPosts(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    if (setRefreshing) setRefreshing(false);
  }
};

export default function Profile() {
  const { accountData, followUser, likePost } = useContext(AccountContext);

  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (accountData.username) {
      fetchUserPosts(accountData.username, setUserPosts);
    }
  }, [accountData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserPosts(accountData.username, setUserPosts, setRefreshing);
  };

  return (
    <ScrollView
      style={styles.accountContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.accountData}>
        <View style={styles.pfpContainer}>
          {accountData && (
            <Image
              source={{ uri: accountData.pfpUri }}
              style={styles.pfpImage}
            />
          )}
        </View>
        <View style={styles.leftData}>
          <View style={styles.counts}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoCount}>{accountData.postsCount}</Text>
              <Text style={styles.infoTitle}>posts</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoCount}>{accountData.followerCount}</Text>
              <Text style={styles.infoTitle}>followers</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoCount}>{accountData.followingCount}</Text>
              <Text style={styles.infoTitle}>following</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bio}>
        <Markdown>{accountData.bio}</Markdown>
      </View>
      <HomeFeed
        accountData={accountData}
        posts={userPosts}
        showFollow={false}
        followUser={followUser}
        likePost={likePost}
        footerMarginBottom={0}
      />
    </ScrollView>
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
});
