import "./App.css";
import router from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ResvProvider } from "./contexts/ResvContext";

function App() {
  return (
    <UserProvider>
      <ResvProvider>
        <RouterProvider router={router} />
      </ResvProvider>
    </UserProvider>
  );
}

export default App;
