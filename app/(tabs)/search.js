import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../_layout";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import HomeFeed from "../components/homeFeed";

export default function Search() {
  const { accountData, allAccountData, followUser, likePost } =
    useContext(AccountContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(
        allAccountData.filter(
          (data) =>
            data.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            data.username !== accountData.username
        )
      );
    }
  }, [searchTerm, allAccountData, accountData.username]);

  const posts = allAccountData.reduce((acc, user) => {
    if (user.username !== accountData.username && !accountData.following.includes(user.username)) {
      const userPosts = user.posts.map((post) => ({
        ...post,
        pfpUri: user.pfpUri,
      }));
      return [...acc, ...userPosts];
    }
    return acc;
  }, []);

  posts.reverse();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text.toLowerCase())}
        placeholder="Search users..."
      />
      {searchTerm ? (
        <View style={styles.searchList}>
          <FlashList
            data={filteredData}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchItemContainer}
                activeOpacity={0.5}
                onPress={() =>
                  router.push({
                    pathname: "/(screens)/users/[account]",
                    params: {
                      account: item.username,
                    },
                  })
                }
              >
                <Text style={styles.searchItem}>@{item.username}</Text>
              </TouchableOpacity>
            )}
            estimatedItemSize={200}
          />
        </View>
      ) : (
        <HomeFeed
          accountData={accountData}
          posts={posts}
          showFollow={true}
          followUser={followUser}
          likePost={likePost}
          footerMarginBottom={50}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: "100%",
    // marginHorizontal: 15,
    // paddingHorizontal: 7,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff9d080",
    marginHorizontal: 22,
  },
  searchList: {
    paddingVertical: 3,
    flex: 1,
    // backgroundColor: "#5AB",
    marginHorizontal: 20,
  },
  searchItemContainer: {
    paddingHorizontal: 7,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#fff9d080",
  },
  searchItem: {
    fontSize: 16,
    color: "#FFF9D0",
  },
});
