import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function Post({ item, accountData, followUser }) {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postTop}>
        <Pressable
          style={styles.userData}
          onPress={() =>
            router.push({
              pathname: "/(screens)/users/[account]",
              params: { account: item.username },
            })
          }
        >
          <View style={styles.pfpImageContainer}>
            <Image
              style={styles.pfpImage}
              alt={item.title}
              source={{ uri: item.pfpUri }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.username}>@{item.username}</Text>
        </Pressable>
        <View style={styles.postTopActions}>
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
      <View style={styles.postImageContainer}>
        <Image
          style={styles.postImage}
          alt={item.title}
          source={{ uri: item.postUri }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export default function HomeFeed({ accountData, setAccountData }) {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham1",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 2,
      title: "Post 2",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham2",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 3,
      title: "Post 3",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham3",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 4,
      title: "Post 4",
      postUri: "https://i.imgur.com/uo09s2U.png",
      username: "pratham4",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 5,
      title: "Post 5",
      postUri: "https://i.imgur.com/uo09s2U.png",
      username: "pratham5",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 6,
      title: "Post 6",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham6",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 7,
      title: "Post 7",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham7",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 8,
      title: "Post 8",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham8",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 9,
      title: "Post 9",
      postUri: "https://i.imgur.com/uo09s2U.png",
      username: "pratham9",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
    {
      id: 10,
      title: "Post 10",
      postUri: "https://i.imgur.com/khHJxB7.png",
      username: "pratham10",
      pfpUri: "https://i.imgur.com/uo09s2U.png",
    },
  ];

  function followUser(account) {
    setAccountData((prevData) => {
      if (prevData.following.includes(account)) {
        return {
          ...prevData,
          following: prevData.following.filter((user) => user !== account),
          followingCount: prevData.followingCount - 1,
        };
      } else {
        return {
          ...prevData,
          following: [...prevData.following, account],
          followingCount: prevData.followingCount + 1,
        };
      }
    });
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
              followUser={followUser}
            />
          );
        }}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={styles.footer} />}
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
    height: 400,
    width: 300,
    backgroundColor: "#A0DEFF",
    marginVertical: 25,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
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
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  pfpImageContainer: {
    height: "70%",
    aspectRatio: 1,
    borderRadius: 50,
    marginLeft: 10,
    backgroundColor: "#5AB2FF",
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
  postImageContainer: {
    height: 300,
    aspectRatio: 1,
    backgroundColor: "#111",
  },
  postImage: {
    height: "100%",
    aspectRatio: 1,
  },
  footer: {
    height: 75,
  },
});
