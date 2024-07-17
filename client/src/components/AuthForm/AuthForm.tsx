import { ChangeEvent, useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import { Input, Button, useDisclosure, FormLabel, useToast, Box } from "@chakra-ui/react";
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
  const { user, error } = useAppSelector((state) => state.authSlice);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Успешно",
      description: "Сообщение о регистрации отправлено на вашу электронную почту.",
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

  const sendMail = async (us: IUser) => {
    try {
      await axiosInstance.post(`${VITE_BASE_URL}${VITE_API}/auth/send`, {
        to: us.email,
        subject: "Регистрация завершена",
        text: `Здравствуйте, ${us.username}!\n\nВаша регистрация успешно завершена! \n\nМы рады, что Вы присоединились к нам!`,
      });
      showToast();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);
      setFileName(file.name);
    }
  };

  const submitHandler = (type: string, e: React.FormEvent<HTMLFormElement>): void => {
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
          setErrorMessage("Пожалуйста, укажите правильную почту и пароль (минимум 8 символов)");
          onErrorOpen();
        }, 200);
      } else {
        dispatch(addUser({ type, formData })).then((user) => {
          if (user.error) {
            setErrorMessage(user.error.message);
            onErrorOpen();
          } else {
            sendMail(user.payload);
          }
        });
      }
    }

    if (type === "signin") {
      dispatch(signIn({ type, inputs })).then((user) => {
        if (user.error) {
          setErrorMessage(user.error.message);
          onErrorOpen();
        }
      });
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
  }, [user, navigate, type]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setAvatar(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => submitHandler(type, e)}
        className={styles.wrapper}
        style={{ backgroundColor: "#b5c6b8b8" }}
      >
        <h3 className={styles.head}>{title}</h3>
        <div className={styles.inputs}>
          {type === "signin" && (
            <>
              <Input
                bg={"#f3ecd0"}
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email || ""}
                placeholder="Эл.почта"
              />
              <Input
                bg={"#f3ecd0"}
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
                bg={"#f3ecd0"}
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="username"
                value={inputs?.username || ""}
                placeholder="Имя пользователя"
              />
              <Input
                bg={"#f3ecd0"}
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="email"
                name="email"
                value={inputs?.email || ""}
                placeholder="Эл.почта"
              />
              <Input
                bg={"#f3ecd0"}
                onChange={changeHandler}
                borderColor="#3f3e3e"
                type="password"
                name="password"
                value={inputs?.password || ""}
                placeholder="Пароль"
              />
              <Input
                bg={"#f3ecd0"}
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="city"
                value={inputs?.city || ""}
                placeholder="Где вы проживаете"
              />
              <Input
                bg={"#f3ecd0"}
                onChange={changeHandler}
                borderColor="#3f3e3e"
                name="placeOfMeeting"
                value={inputs?.placeOfMeeting || ""}
                placeholder="Где вам удобно проводить обмен?"
              />
              <FormLabel>Загрузите ваш аватар</FormLabel>
              <Box
                border="2px"
                borderColor="green.500"
                borderRadius="md"
                textAlign="center"
                py={2}
                cursor="pointer"
                _hover={{ bg: "green.100" }}
                bg={dragOver ? "green.200" : "green.50"}
                color="green.700"
                onClick={() => document.getElementById('avatarUrl')?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                position="relative"
                width="980px"
                height="100px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                {dragOver ? "Отпустите для загрузки" : "Перетащите сюда ваш файл или нажмите для выбора"}
                {fileName && (
                  <Box mt={2} color="green.900">
                    {fileName}
                  </Box>
                )}
              </Box>
              <Input
                bg={"#f3ecd0"}
                type="file"
                id="avatarUrl"
                name="avatarUrl"
                onChange={handleChangeFile}
                style={{ display: "none" }} 
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
        onClose={onErrorClose}
        error={error.message}
      /> 
    </>
  );
}