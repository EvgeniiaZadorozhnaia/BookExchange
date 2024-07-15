import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Root from "./Root";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Profile from "./pages/profile/Profile";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import MyBooksPage from "./pages/MyBooksPage/MyBooksPage";
import OneBookPage from "./pages/OneBookPage/OneBookPage";
import BookOwnerPage from "./pages/BookOwnerPage/BookOwnerPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import { useEffect, useState } from "react";
import { refreshToken } from "./redux/thunkActions";
import { IUser, IUserWithComments } from "./types/stateTypes";
import { UserState } from "./components/initState";
import AdminPage from "./pages/AdminPage/AdminPage";
import BlockedPage from "./pages/BlockedPage/BlockedPage";
import Fonts from "./tools/Fonts";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const [loading, setLoading] = useState<boolean>(true);
  const [localUser, setLocalUser] = useState<IUser>(UserState);
  const [usersWithComments, setUsersWithComments] = useState<
    IUserWithComments[]
  >([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoading(false);
      setLocalUser(JSON.parse(storedUser));
    }
  }, [user]);

  useEffect(() => {
    dispatch(refreshToken());
    console.log(loading);
  }, []);

  console.log("localUser", localUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: localUser.isBlocked ? <BlockedPage /> : <Root />,
      children: [
        {
          path: "/",
          element: localUser.id ? (
            <HomePage usersWithComments={usersWithComments} />
          ) : (
            <Navigate to="/signup" />
          ),
        },
        {
          path: "/favorites",
          element: localUser.id ? <FavoritesPage /> : <Navigate to="/signup" />,
        },
        {
          path: "/adminPage",
          element: localUser.isAdmin ? (
            <AdminPage
              usersWithComments={usersWithComments}
              setUsersWithComments={setUsersWithComments}
            />
          ) : (
            <Navigate to="/signup" />
          ),
        },
        {
          path: "/mybooks",
          element: localUser.id ? <MyBooksPage /> : <Navigate to="/signup" />,
        },
        {
          path: "/books/oneBook/:bookId",
          element: localUser.id ? <OneBookPage /> : <Navigate to="/signup" />,
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
          element: localUser.id ? <Profile /> : <Navigate to="/signup" />,
        },
        {
          path: "/Book/:id/owner",
          element: <BookOwnerPage />,
        },
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <Fonts />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
