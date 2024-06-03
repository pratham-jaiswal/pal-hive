import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { useEffect, useState } from "react";

function Post({
  item,
  accountData,
  followUser,
  setAccountData,
  showFollow,
  allAccountData,
  likePost,
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(item.likedBy.includes(accountData.username));
  }, [item, accountData.username]);

  const likeIcon = liked ? "heart" : "heart-outline";
  const likeColor = liked ? "red" : "black";

  const handleLikePress = () => {
    setLiked(!liked);
    likePost(item.id);
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
                account: item.username,
                userData: JSON.stringify(accountData),
                followUser: followUser,
                setAccountData: setAccountData,
                allAccountData: JSON.stringify(allAccountData),
              },
            })
          }
        >
          <View style={styles.pfpImageContainer}>
            <Image
              style={styles.pfpImage}
              alt={item.title}
              source={{ uri: `https://robohash.org/${item.username}?set=set3` }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.username}>@{item.username}</Text>
        </Pressable>
        <View style={styles.postTopActions}>
          {showFollow && (
            <Pressable
              style={styles.followBtn}
              onPress={() => followUser(item.username)}
            >
              <Text>
                {accountData.following.includes(item.username)
                  ? "Following"
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
        <Pressable onPress={handleLikePress}>
          <Ionicons name={likeIcon} size={22} color={likeColor} />
        </Pressable>
        <Ionicons name="paper-plane-outline" size={22} color="black" />
      </View>
    </View>
  );
}

export default function HomeFeed({
  allAccountData,
  setAllAccountData,
  accountData,
  setAccountData,
  posts,
  showFollow,
}) {

  function followUser(account) {
    setAccountData((prevData) => {
      const isFollowing = prevData.following.includes(account);
      const updatedFollowing = isFollowing
        ? prevData.following.filter((user) => user !== account)
        : [...prevData.following, account];

      return {
        ...prevData,
        following: updatedFollowing,
        followingCount: isFollowing
          ? prevData.followingCount - 1
          : prevData.followingCount + 1,
      };
    });

    setAllAccountData((prevData) =>
      prevData.map((user) => {
        if (user.username === account) {
          const isFollowedBy = user.followers.includes(accountData.username);
          const updatedFollowers = isFollowedBy
            ? user.followers.filter(
                (follower) => follower !== accountData.username
              )
            : [...user.followers, accountData.username];

          return {
            ...user,
            followers: updatedFollowers,
            followerCount: isFollowedBy
              ? user.followerCount - 1
              : user.followerCount + 1,
          };
        }
        return user;
      })
    );
  }

  function likePost(postId) {
    setAllAccountData((prevData) =>
      prevData.map((user) => {
        const updatedPosts = user.posts.map((post) => {
          if (post.id === postId) {
            const isLiked = post.likedBy.includes(accountData.username);
            return {
              ...post,
              likedBy: isLiked
                ? post.likedBy.filter(
                    (username) => username !== accountData.username
                  )
                : [...post.likedBy, accountData.username],
              likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1,
            };
          }
          return post;
        });
        return {
          ...user,
          posts: updatedPosts,
        };
      })
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        renderItem={({ item }) => {
          return (
            <Post
              item={item}
              accountData={accountData}
              setAccountData={setAccountData}
              followUser={followUser}
              likePost={likePost}
              showFollow={showFollow}
              allAccountData={allAccountData}
            />
          );
        }}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View
            style={[styles.footer, { marginBottom: showFollow ? 0 : 200 }]}
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
  footer: {
    height: 75,
  },
});
