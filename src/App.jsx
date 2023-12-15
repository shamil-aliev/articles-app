import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./ui/Header";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Posts from "./features/posts/Posts";
import Post from "./features/posts/Post";
import CreatePost from "./features/posts/CreatePost";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/new",
        element: <CreatePost />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
