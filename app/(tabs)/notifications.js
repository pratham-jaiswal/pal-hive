import { View, Text, StyleSheet } from "react-native";
import { AccountContext } from "../_layout";
import { useContext, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function Notifications() {
  const { accountData } =
    useContext(AccountContext);

  const [likes, setLikes] = useState([]);

  useEffect(() => {
    tempLikes = [];
    accountData.posts.forEach((post) => {
      post.likedBy.forEach((user) => {
        tempLikes.push({
          username: user,
          postId: post.id,
          postTitle: post.title,
        });
      });
    });

    tempLikes.reverse();

    setLikes(tempLikes);
  }, []);

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
