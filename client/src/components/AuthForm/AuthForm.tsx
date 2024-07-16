import { ChangeEvent, useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import {
  Input,
  Button,
  useDisclosure,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { AuthFormProps } from "../../types/propsTypes";
import { IInputs, IUser } from "../../types/stateTypes";
import { InputsState } from "../initState";
import { useNavigate } from "react-router-dom";
import { addUser, signIn } from "../../redux/thunkActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ErrorModal from "../ErrorModal";
import axiosInstance from "../../axiosInstance";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

export default function AuthForm({ title, type }: AuthFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<IInputs>(InputsState);
  const { user } = useAppSelector((state) => state.authSlice);
  const [error, setError] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Успешно",
      description:
        "Сообщение о регистрации отправлено на вашу электронную почту.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
      variant: "solid",
    });
  };

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs(
      (prev: IInputs): IInputs => ({ ...prev, [e.target.name]: e.target.value })
    );
  };

  const sendMail = async (us) => {
    try {
      await axiosInstance.post(`${VITE_BASE_URL}${VITE_API}/auth/send`, {
        to: us.email,
        subject: "Регистрация завершена",
        text: `Здравствуйте, ${us.username}!\n\nВаша регистрация успешно завершена! \n\nМы рады, что Вы присоединились к нам!`,
      });
      showToast();
    } catch (error) {
      console.log(error);
      showErrorModal("Произошла ошибка при отправке сообщения.");
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const showErrorModal = (errorText: string): void => {
    setError(errorText);
    onErrorOpen();
  };

  const closeErrorModal = (): void => {
    setError("");
    onErrorClose();
  };

  const submitHandler = (
    type: string,
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", inputs.username);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("city", inputs.city);
    formData.append("placeOfMeeting", inputs.placeOfMeeting);
    formData.append("avatarUrl", avatar);
    if (type === "signup") {
      if (!inputs.email || !inputs.password || inputs.password.length < 8) {
        setTimeout(() => {
          showErrorModal(
            "Пожалуйста, укажите правильную почту и пароль (минимум 8 символов)"
          );
        }, 200);
      } else {
        dispatch(addUser({ type, formData })).then((user) =>
          sendMail(user.payload)
        );
      }
    }

    if (type === "signin") {
      console.log("Нажал signin");

      if (user?.password === inputs.password || user?.email === inputs.email) {
        setTimeout(() => {
          showErrorModal(
            "Пожалуйста, укажите правильную почту и пароль (минимум 8 символов)"
          );
        }, 200);
      } else {
        dispatch(signIn({ type, inputs }));
      }
    }
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const localUser: IUser | null = userJson ? JSON.parse(userJson) : null;
    if (localUser) {
      navigate("/");
    } else if (type === "signin") {
      navigate("/signin");
    } else {
      navigate("/signup");
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
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="city"
                value={inputs?.city || ""}
                placeholder="Где вы проживаете"
              />
              <Input
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="placeOfMeeting"
                value={inputs?.placeOfMeeting || ""}
                placeholder="Где вам удобно проводить обмен?"
              />
              <FormLabel>Загрузите ваш аватар</FormLabel>
              <Input
                type="file"
                id="avatarUrl"
                name="avatarUrl"
                onChange={handleChangeFile}
              />
            </>
          )}
        </div>
        <div className={styles.btns}>
          {type === "signin" && (
            <Button type="submit" colorScheme="green">
              Вход
            </Button>
          )}
          {type === "signup" && (
            <Button type="submit" colorScheme="green">
              Регистрация
            </Button>
          )}
        </div>
      </form>
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={closeErrorModal}
        error={error}
      />
    </>
  );
}
