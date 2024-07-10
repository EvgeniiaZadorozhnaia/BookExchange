import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Root";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Profile from "./pages/profile/Profile"; 
import { useAppSelector } from "./redux/hooks";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OneCard from "./components/OneCard/OneCard";
import HomePage from "./pages/HomePage/HomePage";
import MyBooksPage from "./pages/MyBooksPage/MyBooksPage";



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
              <HomePage />     
          )  : (
            <Navigate to="/signup" />
          ),
        },
        {
          path: "/mybooks",
          element: user?.id !== 0 ? (
              <MyBooksPage />     
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

  






