import { View, Text, StyleSheet } from "react-native";
import { AccountContext } from "../_layout";
import { useContext, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import serverConfig from "../../server_config";

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

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/users/${id}`);
    return response.data.username;
  } catch (error) {
    console.error(error);
  }
};

export default function Notifications() {
  const { accountData } = useContext(AccountContext);

  const [likes, setLikes] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (accountData.username) {
      fetchUserPosts(accountData.username, setUserPosts);
    }
  }, [accountData]);

  useEffect(() => {
    const fetchLikesData = async () => {
      let tempLikes = [];

      if (userPosts) {
        for (const post of userPosts) {
          for (const id of post.likedBy) {
            const username = await fetchUserData(id);
            if (username) {
              tempLikes.push({
                username,
                postId: post._id,
                postTitle: post.title,
              });
            }
          }
        }
        tempLikes.reverse();
        setLikes(tempLikes);
      }
    };

    fetchLikesData();
  }, [userPosts, serverConfig]);

  return (
    <View style={styles.container}>
      <FlashList
        data={likes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Text style={styles.notification}>
              <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
                @{item.username}
              </Text>{" "}
              liked your post "{item.postTitle}"
            </Text>
          </View>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: "100%",
    marginHorizontal: 15,
  },
  notificationContainer: {
    paddingHorizontal: 7,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#fff9d080",
  },
  notification: {
    fontSize: 16,
    color: "#FFF9D0",
  },
});
