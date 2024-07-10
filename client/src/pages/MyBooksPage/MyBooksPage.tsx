import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createBook, getBooksByUser } from "../../redux/thunkActions";
import { Button, useDisclosure } from "@chakra-ui/react";
import CreateBookForm from "../../components/CreateBookForm/CreateBookForm";
import React from "react";
import { InputsBookCreationState } from "../../components/initState";
import { IInputsBookCreationState } from "../../types/stateTypes";
import OneCardForMyBooks from "../../components/OneCardForMyBooks/OneCardForMyBooks";


function MyBooksPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const { books } = useAppSelector((state) => state.booksSlice);
  const [inputs, setInputs] = useState<IInputsBookCreationState>(
    InputsBookCreationState
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const ownerId = user.id;

  useEffect(() => {
    dispatch(getBooksByUser(user.id));
  }, [user]);

  

  function inputsHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputs(
      (prev: IInputsBookCreationState): IInputsBookCreationState => ({
        ...prev,
        [e.target.name]: e.target.value,
      })
    );
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(createBook({ ownerId, inputs }));
    setInputs(() => InputsBookCreationState);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {books.length > 0 &&
          books.map((book) => <OneCardForMyBooks key={book.id} book={book} />)}
      </div>
      <Button colorScheme="blue" onClick={onOpen}>
        Добавить книгу
      </Button>
      <CreateBookForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
        inputsHandler={inputsHandler}
        submitHandler={submitHandler}
        inputs={inputs}
        setInputs={setInputs}
      />
    </div>
  );
}


export default MyBooksPage;
