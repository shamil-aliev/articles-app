import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { deletePost } from "./CreatePost";
import { Link } from "react-router-dom";
import Card from "../../ui/Card";
// import { data } from "autoprefixer";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async function () {
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //reading data from db
    };
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    // Copy the current posts state
    const prevPosts = [...posts];

    // Optimistic UI update
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

    try {
      // Asynchronous deletion in Firestore
      await deletePost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
      // If deletion fails, revert the UI to the previous state
      setPosts(prevPosts);
    }
  };

  return (
    <div>
      Here would be displayed all posts
      <Link to={"/posts/new"} className="ml-[30px]">
        Create a new post
      </Link>
      {posts.map((post) => {
        return (
          <Card key={post.id}>
            <div>
              <p>{post.title}</p>
              <p>{post.post}</p>
              {/* delete logic works fine */}
              <button
                className="w-[32px]"
                onClick={() => handleDelete(post.id)}>
                <img className="w-auto" src="/delete.svg" alt="delete button" />
              </button>
              <Link className="w-[28px]" to={`/edit/${post.id}`}>
                <img className="w-auto" src="/edit.svg" alt="edit button" />
              </Link>
              <button onClick={() => console.log(post.id)}>test</button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
