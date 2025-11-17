import "./App.css";
import router from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
}

export default App;
