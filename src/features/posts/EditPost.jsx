import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  // console.log(postId, db);

  //some old code
  // useEffect(() => {
  //   const getPostData = async function () {
  //     try {
  //       const postsDocRef = doc(db, "posts", postId);
  //       const postDoc = await getDoc(postsDocRef);

  //       if (postDoc.exists()) {
  //         // post data
  //         const data = postDoc.data();
  //         // setPostData(postData);
  //         // console.log(postData);
  //       }
  //     } catch (e) {
  //       console.error("Error fetching post data:", e);
  //     }
  //   };
  //   getPostData();
  // }, [postId]);

  // useEffect(() => {
  //   const getPostData = async function () {
  //     try {
  //       const postDocRef = doc(db, "posts", postId);
  //       const postDoc = await getDoc(postDocRef);

  //       if (postDoc.exists()) {
  //         // post data
  //         const data = postDoc.data();
  //         console.log(data); // Logging the data to the console
  //         // setPostData(data); // Uncomment this line if you want to update the state
  //       } else {
  //         console.log("Post not found");
  //       }
  //     } catch (e) {
  //       console.error("Error fetching post data:", e.message, e.code);
  //     }
  //   };
  //   getPostData();
  // }, [postId]);

  // getting data from db
  useEffect(() => {
    const getPostData = async function () {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));

        if (postDoc.exists()) {
          const data = postDoc.data();
          setTitle(data.title);
          setPostContent(data.post);
        }
      } catch (e) {
        console.error("Error fetching post data:", e.message, e.code);
      }
    };

    getPostData();
  }, [postId]);

  // posts update func
  const updatePost = async function (id) {
    const postDoc = doc(db, "posts", postId);
    const newFields = { title: title, post: postContent };
    await updateDoc(postDoc, newFields);
    navigate("/posts");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePost(postId);
        }}
        name="post"
        className="flex flex-col max-w-5xl min-w-[600px] items-center mx-auto my-0">
        <input
          name="postTitle"
          autoFocus={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="new title"
          className="w-full mb-4 mx-auto my-0 placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2"
        />
        <label>
          Edit your post here
          <textarea
            name="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={15}
            placeholder="start editing your post"
            className="min-w-[1024px] mx-auto my-0 placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2"></textarea>
        </label>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full w-[100%]  ">
          Edit post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
