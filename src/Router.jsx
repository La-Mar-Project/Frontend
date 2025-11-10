import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/user/Login";
import Main from "./pages/user/Main";
import Home from "./pages/user/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/main",
    element: <Main />,
  },
]);

export default router;
