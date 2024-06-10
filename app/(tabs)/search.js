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
import axios from "axios";
import serverConfig from "../../server_config";

const fetchNotFollowedUserPosts = async (accountData, setPosts) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/posts`, {
      headers: {
        "x-api-key": serverConfig.api_key,
        "Content-Type": "application/json",
      },
    });
    const allPosts = response.data;

    const notFollowedUserPosts = allPosts.filter(
      (post) =>
        !accountData.following.includes(post.user._id) &&
        post.user._id !== accountData._id
    );

    setPosts(notFollowedUserPosts);
  } catch (error) {
    console.error(error);
  }
};

const fetchAllUsers = async (setUsers) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/users`, {
      headers: {
        "x-api-key": serverConfig.api_key,
        "Content-Type": "application/json",
      },
    });
    setUsers(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function Search() {
  const { accountData, followUser, likePost } = useContext(AccountContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers(setUsers);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(
        users.filter(
          (data) =>
            data.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            data.username !== accountData.username
        )
      );
    }
  }, [searchTerm, users, accountData.username]);

  useEffect(() => {
    if (accountData) {
      fetchNotFollowedUserPosts(accountData, setPosts);
    }
  }, [accountData]);

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
                      id: item._id,
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
