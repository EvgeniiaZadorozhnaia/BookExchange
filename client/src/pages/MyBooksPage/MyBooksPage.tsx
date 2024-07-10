import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createBook, editBook, getBooksByUser } from "../../redux/thunkActions";
import CreateBookForm from "../../components/CreateBookForm/CreateBookForm";
import { InputsBookCreationState } from "../../components/initState";
import OneCardForMyBooks from "../../components/OneCardForMyBooks/OneCardForMyBooks";
import { IBook } from "../../types/stateTypes";

function MyBooksPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const { books } = useAppSelector((state) => state.booksSlice);

  const [inputs, setInputs] = useState(InputsBookCreationState);
  const [editMode, setEditMode] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const ownerId = user.id;

  useEffect(() => {
    dispatch(getBooksByUser(user.id));
  }, [user]);

  function inputsHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (editMode) {
      dispatch(editBook({ bookId: currentBookId, inputs }));
    } else {
      dispatch(createBook({ ownerId, inputs }));
    }

    setInputs(InputsBookCreationState);
    setEditMode(false);
    onClose();
  }

  function handleEditClick(book: IBook): void {
    setInputs(book);
    setCurrentBookId(book.id);
    setEditMode(true);
    onOpen();
  }

  function handleModalClose(): void {
    onClose();
    setEditMode(false);
    setInputs(InputsBookCreationState);
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px", justifyContent: "center", alignItems: "center" }}>
        {books.length > 0 && books.map((book) => (
          <OneCardForMyBooks key={book.id} book={book} onEditClick={handleEditClick} />
        ))}
      </div>
      <Button colorScheme="blue" onClick={onOpen}>Добавить книгу</Button>
      <CreateBookForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleModalClose}
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
