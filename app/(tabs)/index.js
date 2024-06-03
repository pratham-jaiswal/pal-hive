import { View } from "react-native";
import React, { useState } from "react";
import HomeFeed from "../components/homeFeed";

export default function Home() {
  const [accountData, setAccountData] = useState({
    username: "pratham",
    pfpUri: "https://i.imgur.com/uo09s2U.png",
    bio: "Hi, I'm Pratham!",
    followers: ["pratham2", "pratham3"],
    followerCount: 2,
    following: ["pratham1", "pratham2", "pratham4"],
    followingCount: 3,
    posts: [
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
    ],
    postsCount: 2,
  });

  return (
    <View>
      <HomeFeed accountData={accountData} setAccountData={setAccountData} />
    </View>
  );
}
