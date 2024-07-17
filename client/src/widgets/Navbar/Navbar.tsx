import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/thunkActions";
import { Avatar } from "@chakra-ui/react";

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authSlice);

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {user?.isAdmin ? (
          <>
            <Link to="/adminPage">Админ</Link>
            <Link to="/">Главная</Link>
          </>
        ) : null}
        {user?.username && !user?.isAdmin ? (
          <div className={styles.left}>
            <img
              src="414cdba238d90ed74731955009d33f42_360.gif"
              alt="Animated GIF"
              style={{
                width: "25px",
                height: "25px",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            />
            <Link to="/">Главная</Link>
            <Link to="/favorites">Избранное</Link>
            <Link to="/mybooks">Мои книги</Link>
          </div>
        ) : null}
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Avatar
              border={"1px solid black"}
              name="userAvatar"
              src={`http://localhost:3000/static/${user?.avatarUrl}`}
            />
            {user?.isAdmin ? null : <Link to="/profile">{user.username}</Link>}
            <Link to="/signup" onClick={logoutHandler}>
              Выйти
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">Войти</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
