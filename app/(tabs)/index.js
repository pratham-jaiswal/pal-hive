import { View } from "react-native";
import { useContext, useEffect, useState } from "react";
import HomeFeed from "../components/homeFeed";
import { AccountContext } from "../_layout";
import axios from "axios";
import serverConfig from "../../server_config";

const fetchFollowedUserPosts = async (accountData, setPosts) => {
  try {
    const response = await axios.get(`${serverConfig.api_uri}/posts`, {
      headers: {
        "x-api-key": serverConfig.api_key,
        "Content-Type": "application/json",
      },
    });
    const allPosts = response.data;

    const followedUserPosts = allPosts.filter((post) =>
      accountData.following.includes(post.user._id)
    );

    setPosts(followedUserPosts);
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const { accountData, followUser, likePost } = useContext(AccountContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (accountData) {
      fetchFollowedUserPosts(accountData, setPosts);
    }
  }, [accountData]);

  return (
    <View>
      <HomeFeed
        accountData={accountData}
        posts={posts}
        showFollow={true}
        followUser={followUser}
        likePost={likePost}
        footerMarginBottom={0}
      />
    </View>
  );
}
