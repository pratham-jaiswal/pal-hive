import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import config from "../auth0-configuration";
import { Auth0Provider, useAuth0 } from "react-native-auth0";

SplashScreen.preventAutoHideAsync();

const AccountContext = createContext();

const RootLayout = () => {
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.error(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const [allAccountData, setAllAccountData] = useState([
    {
      username: "pratham",
      email: "prthm0@gmail.com",
      pfpUri: `https://robohash.org/pratham?set=set3`,
      bio: "Hi, I'm Pratham!",
      followers: ["pratham2", "pratham3"],
      followerCount: 2,
      following: ["pratham1", "pratham2", "pratham4"],
      followingCount: 3,
      posts: [
        {
          id: 1,
          title: "Post 1",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham",
          likedBy: ["pratham2", "pratham3"],
          likeCount: 2,
        },
        {
          id: 2,
          title: "Post 2",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham",
          likedBy: ["pratham1", "pratham3"],
          likeCount: 2,
        },
      ],
      postsCount: 2,
    },
    {
      username: "pratham1",
      email: "prthm1@gmail.com",
      pfpUri: `https://robohash.org/pratham1?set=set3`,
      bio: "Hi, I'm Pratham!",
      followers: ["pratham"],
      followerCount: 1,
      following: ["pratham2", "pratham3", "pratham4"],
      followingCount: 3,
      posts: [
        {
          id: 3,
          title: "Post 1",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham1",
          likedBy: ["pratham", "pratham3"],
          likeCount: 2,
        },
        {
          id: 4,
          title: "Post 2",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham1",
          likedBy: ["pratham2", "pratham"],
          likeCount: 2,
        },
        {
          id: 5,
          title: "Post 3",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham1",
          likedBy: ["pratham4", "pratham3"],
          likeCount: 2,
        },
        {
          id: 6,
          title: "Post 4",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham1",
          likedBy: ["pratham2", "pratham3"],
          likeCount: 2,
        },
      ],
      postsCount: 4,
    },
    {
      username: "pratham2",
      email: "prthm2@gmail.com",
      pfpUri: `https://robohash.org/pratham2?set=set3`,
      bio: "Hi, I'm Pratham!",
      followers: ["pratham", "pratham1", "pratham3"],
      followerCount: 3,
      following: ["pratham", "pratham1", "pratham4"],
      followingCount: 3,
      posts: [
        {
          id: 7,
          title: "Post 1",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham2",
          likedBy: ["pratham1", "pratham3"],
          likeCount: 2,
        },
        {
          id: 8,
          title: "Post 2",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham2",
          likedBy: ["pratham1", "pratham3"],
          likeCount: 2,
        },
      ],
      postsCount: 2,
    },
    {
      username: "pratham3",
      email: "prthm3@gmail.com",
      pfpUri: `https://robohash.org/pratham3?set=set3`,
      bio: "Hi, I'm Pratham!",
      followers: ["pratham", "pratham2", "pratham4"],
      followerCount: 3,
      following: ["pratham", "pratham1", "pratham2", "pratham4"],
      followingCount: 4,
      posts: [
        {
          id: 9,
          title: "Post 1",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham3",
          likedBy: ["pratham2", "pratham4"],
          likeCount: 2,
        },
        {
          id: 10,
          title: "Post 2",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham3",
          likedBy: ["pratham1", "pratham2"],
          likeCount: 2,
        },
      ],
      postsCount: 2,
    },
    {
      username: "pratham4",
      email: "prthm4@gmail.com",
      pfpUri: `https://robohash.org/pratham4?set=set3`,
      bio: "Hi, I'm Pratham!",
      followers: ["pratham", "pratham2", "pratham3"],
      followerCount: 3,
      following: ["pratham", "pratham1", "pratham2"],
      followingCount: 3,
      posts: [
        {
          id: 11,
          title: "Post 1",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham4",
          likedBy: ["pratham2", "pratham3"],
          likeCount: 2,
        },
        {
          id: 12,
          title: "Post 2",
          postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
          username: "pratham4",
          likedBy: ["pratham1", "pratham3"],
          likeCount: 2,
        },
      ],
      postsCount: 2,
    },
    {
      bio: "Hi, I'm Pratham!",
      email: "prthm13@gmail.com",
      followerCount: 0,
      followers: [],
      following: [],
      followingCount: 0,
      pfpUri: "https://robohash.org/themaxx?set=set4",
      posts: [],
      postsCount: 0,
      username: "themaxx",
    },
  ]);

  const [accountData, setAccountData] = useState();

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
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <AccountContext.Provider
        value={{
          accountData,
          setAccountData,
          allAccountData,
          setAllAccountData,
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
