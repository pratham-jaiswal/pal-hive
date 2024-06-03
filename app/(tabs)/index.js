import { View } from "react-native";
import React, { useState } from "react";
import HomeFeed from "../components/homeFeed";

export default function Home() {
  const [allAccountData, setAllAccountData] = useState([
    {
      username: "pratham",
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
  ]);

  const [accountData, setAccountData] = useState({
    username: "pratham",
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
        pfpUri: `https://robohash.org/pratham?set=set3`,
        likedBy: ["pratham2", "pratham3"],
        likeCount: 2,
      },
      {
        id: 2,
        title: "Post 2",
        postText: `# Lorem ipsum dolor\n## a\nsit\n amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
        username: "pratham",
        pfpUri: `https://robohash.org/pratham?set=set3`,
        likedBy: ["pratham1", "pratham3"],
        likeCount: 2,
      },
    ],
    postsCount: 2,
  });

  const posts = allAccountData.reduce((acc, user) => {
    if (user.username !== accountData.username) {
      // && accountData.following.includes(user.username) // for following
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
        allAccountData={allAccountData}
        setAllAccountData={setAllAccountData}
        accountData={accountData}
        setAccountData={setAccountData}
        posts={posts}
        showFollow={true}
      />
    </View>
  );
}
