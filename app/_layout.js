import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import config from "../auth0-configuration";
import { Auth0Provider } from "react-native-auth0";
import axios from "axios";
import serverConfig from "../server_config";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const AccountContext = createContext();

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.error(e.message);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    async function pingServer() {
      try {
        const response = await axios.get(`${serverConfig.api_uri}/ping`, {
          headers: {
            "x-api-key": serverConfig.api_key,
            "Content-Type": "application/json",
          },
        });

        setIsLoading(false); // Update loading status once data is fetched
      } catch (error) {
        console.error(error);
      }
    }

    pingServer();
  }, []);

  const [accountData, setAccountData] = useState();

  const followUser = async (account) => {
    try {
      const isFollowing = accountData.following.includes(account);
      const updatedFollowing = isFollowing
        ? accountData.following.filter((user) => user !== account)
        : [...accountData.following, account];

      const updatedAccountData = {
        ...accountData,
        following: updatedFollowing,
        followingCount: isFollowing
          ? accountData.followingCount - 1
          : accountData.followingCount + 1,
      };

      await axios.put(
        `${serverConfig.api_uri}/users/${accountData.username}`,
        {
          following: updatedFollowing,
          followingCount: updatedFollowing.length,
        },
        {
          headers: {
            "x-api-key": serverConfig.api_key,
            "Content-Type": "application/json",
          },
        }
      );

      const followedUser = await axios.get(
        `${serverConfig.api_uri}/users/${account}`,
        {
          headers: {
            "x-api-key": serverConfig.api_key,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedFollowers = followedUser.data.followers.includes(
        accountData._id
      )
        ? followedUser.data.followers.filter(
            (follower) => follower !== accountData._id
          )
        : [...followedUser.data.followers, accountData._id];

      await axios.put(
        `${serverConfig.api_uri}/users/${followedUser.data.username}`,
        {
          followers: updatedFollowers,
          followerCount: updatedFollowers.length,
        },
        {
          headers: {
            "x-api-key": serverConfig.api_key,
            "Content-Type": "application/json",
          },
        }
      );

      setAccountData(updatedAccountData);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await axios.get(`${serverConfig.api_uri}/posts`, {
        headers: {
          "x-api-key": serverConfig.api_key,
          "Content-Type": "application/json",
        },
      });
      const posts = response.data;

      const post = posts.find((p) => p._id === postId);

      if (!post) {
        throw new Error("Post not found");
      }

      const isLiked = post.likedBy.includes(accountData._id);
      const updatedLikedBy = isLiked
        ? post.likedBy.filter((id) => id !== accountData._id)
        : [...post.likedBy, accountData._id];

      const updatedPost = {
        ...post,
        likedBy: updatedLikedBy,
        likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1,
      };

      await axios.put(`${serverConfig.api_uri}/posts/${postId}`, updatedPost, {
        headers: {
          "x-api-key": serverConfig.api_key,
          "Content-Type": "application/json",
        },
      });

      const updatedPosts = posts.map((p) =>
        p._id === postId ? updatedPost : p
      );

      setAccountData({
        ...accountData,
        posts: updatedPosts,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#5AB2FF" }}>
        <ActivityIndicator size="large" color="#FFF9D0" />
      </View>
    );
  }

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <AccountContext.Provider
        value={{
          accountData,
          setAccountData,
          followUser,
          likePost,
        }}
      >
        <Stack
          screenOptions={{
            statusBarTranslucent: true,
            statusBarStyle: "light",
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(screens)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AccountContext.Provider>
    </Auth0Provider>
  );
};

export { AccountContext };
export default RootLayout;
