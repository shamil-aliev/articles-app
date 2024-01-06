import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./ui/Header";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Posts from "./features/posts/Posts";
import Post from "./features/posts/Post";
import CreatePost from "./features/posts/CreatePost";
import EditPost from "./features/posts/EditPost";
import Login from "./features/login/Login";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
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
      {
        path: "/edit/:postId",
        element: <EditPost />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
