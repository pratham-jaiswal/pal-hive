import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { useEffect, useState } from "react";
import serverConfig from "../../server_config";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/users/${id}`);
    return response.data.pfpUri;
  } catch (error) {
    console.error(error);
  }
};

function Post({ item, accountData, followUser, showFollow, likePost }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(item.likedBy.includes(accountData._id));
  }, [item, accountData]);

  const likeIcon = liked ? "heart" : "heart-outline";
  const likeColor = liked ? "red" : "black";

  const handleLikePress = () => {
    setLiked(!liked);
    likePost(item._id);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postTop}>
        <Pressable
          style={styles.userData}
          onPress={() =>
            router.push({
              pathname: "/(screens)/users/[account]",
              params: {
                account: item.user.username,
                id: item.user._id,
              },
            })
          }
        >
          <View style={styles.pfpImageContainer}>
            <Image
              style={styles.pfpImage}
              alt={item.title}
              source={{ uri: item.user.pfpUri }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.username}>@{item.user.username}</Text>
        </Pressable>
        <View style={styles.postTopActions}>
          {showFollow && (
            <Pressable
              style={styles.followBtn}
              onPress={() => followUser(item.user._id)}
            >
              <Text>
                {accountData.following.includes(item.user._id)
                  ? "Unfollow"
                  : "Follow"}
              </Text>
            </Pressable>
          )}
          <Pressable>
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color="black"
              style={{
                textShadowColor: "#777",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 5,
              }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.postTextContainer}>
        <Markdown>{item.postText}</Markdown>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.action}>
          <Pressable onPress={handleLikePress}>
            <Ionicons name={likeIcon} size={22} color={likeColor} />
          </Pressable>
          <Text style={styles.actionCount}>{item.likeCount}</Text>
        </View>
        <Ionicons name="paper-plane-outline" size={22} color="black" />
      </View>
    </View>
  );
}

export default function HomeFeed({
  accountData,
  posts,
  showFollow,
  followUser,
  likePost,
  footerMarginBottom,
}) {
  const [reversedPosts, setReversedPosts] = useState([]);

  useEffect(() => {
    setReversedPosts(posts.reverse());
  }, [posts]);

  return (
    <View style={styles.container}>
      <FlashList
        data={reversedPosts}
        renderItem={({ item }) => {
          return (
            <Post
              item={item}
              accountData={accountData}
              followUser={followUser}
              showFollow={showFollow}
              likePost={likePost}
            />
          );
        }}
        estimatedItemSize={200}
        keyExtractor={(item) => item._id}
        ListFooterComponent={
          <View
            style={{
              height: 100 + footerMarginBottom,
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: "100%",
  },
  postContainer: {
    width: 300,
    backgroundColor: "#A0DEFF",
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
    elevation: 5,
  },
  postTop: {
    height: 50,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userData: {
    height: "100%",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  username: {
    color: "#000",
    textShadowColor: "#888",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  pfpImageContainer: {
    height: "70%",
    aspectRatio: 1,
    borderRadius: 50,
    marginLeft: 10,
    backgroundColor: "#5AB2FF",
    borderColor: "#FFF9D0",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  pfpImage: {
    height: "90%",
    aspectRatio: 1,
    borderRadius: 50,
  },
  postTopActions: {
    height: "100%",
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    paddingRight: 10,
  },
  followBtn: {
    backgroundColor: "#FFF9D0",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    elevation: 5,
  },
  postTextContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  action: {
    flexDirection: "row",
    verticalAlign: "center",
    gap: 3,
  },
  actionCount: {
    fontSize: 15,
    alignSelf: "center",
  },
});
