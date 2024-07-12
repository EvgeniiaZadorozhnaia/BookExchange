import { useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import { Input, Button, useDisclosure } from "@chakra-ui/react";
import { AuthFormProps } from "../../types/propsTypes";
import { IInputs } from "../../types/stateTypes";
import { InputsState } from "../initState";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/thunkActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ErrorModal from "../ErrorModal";


export default function AuthForm({
  title,
  type ,
}: AuthFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<IInputs>(InputsState);
  const { user } = useAppSelector((state) => state.authSlice);
  const [error, setError] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs(
      (prev: IInputs): IInputs => ({ ...prev, [e.target.name]: e.target.value })
      );
  };

  const showErrorModal = (errorText: string): void => {
    setError(errorText);
    onOpen();
  };

  const closeErrorModal = (): void => {
    setError("");
    onClose();
  };


  const submitHandler = (
    type: string,
    e: React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    if(type === "signup"){
      if(
        !inputs.email ||
        !inputs.password ||
        inputs.password.length < 8
      )
      {
        setTimeout(() => {
          showErrorModal("Пожалуйста, укажите правильную почту и пароль (минимум 8 символов)");
        }, 200);
      } else {
        dispatch(addUser({ type, inputs }));
        // localStorage.setItem('user', JSON.stringify(user));
      }
    }
  
    if(type === "signin") {
      if ( 
        user?.password === inputs.password ||
        user?.email === inputs.email   
      )  
      {
        setTimeout(() => {
          showErrorModal("Пожалуйста, укажите правильную почту и пароль (минимум 8 символов)");
        }, 200);
      } else {
        dispatch(addUser({ type, inputs }));
        // localStorage.setItem('user', JSON.stringify(user));
      }
    }
  };


  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if(localUser){
      navigate("/")
    } else if (type === "signin") {
      navigate("/signin")
    } else {
      navigate("/signup")
    }   
  }, [user]);


  return (
    <>
      <form onSubmit={(e) => submitHandler(type, e)} className={styles.wrapper}>
        <h3 className={styles.head}>{title}</h3>
        <div className={styles.inputs}>
          {type === "signin" && (
            <>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email || ""}
                placeholder="Эл.почта"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password || ""}
                placeholder="Пароль"
              />
            </>
          )}
          {type === "signup" && (
            <>
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="username"
                value={inputs?.username || ""}
                placeholder="Имя пользователя"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email || ""}
                placeholder="Эл.почта"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password || ""}
                placeholder="Пароль"
              />
            </>
          )}
        </div>
        <div className={styles.btns}>
          {type === "signin" && (
            <Button type="submit" colorScheme="blue">
              Вход
            </Button>
          )}
          {type === "signup" && (
            <Button type="submit" colorScheme="blue">
              Регистрация
            </Button>
          )}
        </div>
      </form>
      <div style={{ maxWidth: "500px" }}>
        <ErrorModal
          isOpen={isOpen}
          onClose={closeErrorModal}
          error={error}
        />
      </div>
    </>
  );
} 
