"use client";
import axios from "axios";
import * as jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Post } from "../api/models/post";
import { Button } from "@/components/ui/button";
import Nav from "../Nav";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      axios
        .get("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPosts(res.data);
        });

      const decoded: any = jwt.decode(token as any);
      setUsername(decoded.username);
    }
  }, []);

  const handleLike = async (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: ((post.likes as any) + 1) as any,
              likedUsers: [...post.likedUsers, username],
            }
          : post
      )
    );

    try {
      await axios.post(
        `/api/posts/like`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
    } catch (error: any) {
      console.error("Failed to update likes on the server:", error);
      alert(error.response.data);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: (post.likes as any) - 1,
                likedUsers: post.likedUsers.filter((user) => user !== username),
              }
            : post
        )
      );
    }
  };

  const handleDislike = async (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: (post.likes as any) - 1,
              likedUsers: post.likedUsers.filter((user) => user !== username),
            }
          : post
      )
    );

    try {
      await axios.post(
        `/api/posts/dislike`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
    } catch (error: any) {
      console.error("Failed to update likes on the server:", error);
      alert(error.response.data);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: (post.likes as any) + 1,
                likedUsers: [...post.likedUsers, username],
              }
            : post
        )
      );
    }
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col gap-[5vh] items-center mt-[30vh]">
        {posts.map((post) => (
          <div
            key={post._id as any}
            className="flex flex-col gap-[1vh] border border-solid p-[5vh]"
          >
            <h1>Title: {post.title}</h1>
            <h2>Text: {post.text}</h2>
            <h3>Likes: {post.likes as any}</h3>
            {post.likedUsers.includes(username) ? (
              <Button
                onClick={async () => await handleDislike(post._id as any)}
              >
                Dislike
              </Button>
            ) : (
              <Button onClick={async () => await handleLike(post._id as any)}>
                Like
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
