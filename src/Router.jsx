import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/user/main/login/Login";
import Main from "./pages/user/Main";
import Home from "./pages/user/Home";
import Notice from "./pages/user/main/mainnotice/Notice";
import Cancel from "./pages/user/main/mainnotice/Cancel";
import NoticeLayout from "./pages/user/main/mainnotice/NoticeLayout";
import IntroLayout from "./pages/user/main/jjubullinto/IntroLayout";
import Intro from "./pages/user/main/jjubullinto/Intro";
import Ship from "./pages/user/main/jjubullinto/Ship";
import MyLayout from "./pages/user/main/mypage/MyLayout";
import Info from "./pages/user/main/mypage/Info";
import Coupon from "./pages/user/main/mypage/Coupon";
import History from "./pages/user/main/mypage/History";
import LoginCallback from "./pages/user/main/login/LoginCallback";

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
    path: "/oauth2/callback/google", // ✅ 여기 추가
    element: <LoginCallback />,
  },
  {
    path: "/main",
    element: <Main />,
    children: [
      {
        path: "notice",
        element: <NoticeLayout />,
        children: [
          { index: true, element: <Notice /> },
          { path: "cancel", element: <Cancel /> },
        ],
      },
      {
        path: "intro",
        element: <IntroLayout />,
        children: [
          { index: true, element: <Intro /> },
          { path: "ship", element: <Ship /> },
        ],
      },
      {
        path: "notice",
        element: <NoticeLayout />,
        children: [
          { index: true, element: <Notice /> },
          { path: "cancel", element: <Cancel /> },
        ],
      },
      {
        path: "mypage",
        element: <MyLayout />,
        children: [
          { index: true, element: <Info /> },
          { path: "coupon", element: <Coupon /> },
          { path: "history", element: <History /> },
        ],
      },
    ],
  },
]);

export default router;
