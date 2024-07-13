
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/thunkActions";

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authSlice);

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user") 
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {user?.username ? (
          <div className={styles.left}>
            <Link to="/">Главная</Link>
            <Link to="/favorites">Избранное</Link>
            <Link to="/mybooks">Мои книги</Link>
          </div>
        ) : null}
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link to="/profile">{user.username}</Link>
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
