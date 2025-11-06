import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/user/Login";

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
]);

export default router;
