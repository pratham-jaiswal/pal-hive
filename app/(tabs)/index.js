import { View } from "react-native";
import { useContext } from "react";
import HomeFeed from "../components/homeFeed";
import { AccountContext } from "../_layout";

export default function Home() {
  const { accountData, allAccountData, followUser, likePost } =
    useContext(AccountContext);

  const posts = allAccountData.reduce((acc, user) => {
    if (
      user.username !== accountData.username &&
      accountData.following.includes(user.username)
    ) {
      const userPosts = user.posts.map((post) => ({
        ...post,
        pfpUri: user.pfpUri,
      }));
      return [...acc, ...userPosts];
    }
    return acc;
  }, []);

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
