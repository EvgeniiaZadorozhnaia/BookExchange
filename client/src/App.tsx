import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Root";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Main from "./pages/HomePage/HomePage";
import Profile from "./pages/profile/profile"; 
import { useAppSelector } from "./redux/hooks";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OneCard from "./components/OneCard/OneCard";



function App() {
  const { user } = useAppSelector((state) => state.authSlice);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/homepage",
          element: user?.id !== 0 ? (
              <OneCard />     
          )  : (
            <Navigate to="/signup" />
          ),
        },
        {
          path: "/signin",
          element: <SigninPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/profile",
          element: user?.id !== 0 ? (
              <Profile />     
          )  : (
            <Navigate to="/signup" />
          ),
        },
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

  






