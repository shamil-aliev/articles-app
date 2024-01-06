import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import Login from "../login/Login";
import useToken from "../../hooks/useToken";

// TODO move to separate file
export const deletePost = async function (id) {
  const postDoc = doc(db, "posts", id);
  await deleteDoc(postDoc);
};

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  // const [token, setToken] = useState({});
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const postsRef = collection(db, "posts");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handlePostChange(e) {
    setPost(e.target.value);
    console.log("Post:", e.target.value);
  }
  const handleSubmit = async function (e) {
    e.preventDefault(); // if delete this line doesn't add new data to db
    try {
      // Add the document to Firestore
      // TODO add a new field 'author'
      await addDoc(postsRef, { title: title, post: post });

      // Clear the form fields
      setTitle("");
      setPost("");

      // Navigate to "/posts" after the document is added
      navigate("/posts");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  // console.log(import.meta.env.VITE_REACT_APP_API_KEY);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <p>Hello, start here and write a new post</p>
      <form
        onSubmit={handleSubmit}
        name="post"
        className="flex flex-col max-w-5xl min-w-[600px] items-center bg-lime-400 mx-auto my-0">
        <input
          onChange={handleTitleChange}
          type="text"
          // name="header" // if turn it on the input would suggest you prev entered data
          placeholder="your post name"
          className="w-full mb-4 mx-auto my-0 placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2"
        />
        <label>
          <textarea
            name="postContent"
            onChange={handlePostChange}
            rows={15}
            placeholder="start writing your post"
            className="min-w-[1024px] mx-auto my-0"></textarea>
        </label>
        <button
          type="submit"
          disabled={!title || !post} //doesn't work as expected
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full w-[100%]  ">
          Post!
        </button>
      </form>
    </div>
  );
}

// export { deletePost };
export default CreatePost;
