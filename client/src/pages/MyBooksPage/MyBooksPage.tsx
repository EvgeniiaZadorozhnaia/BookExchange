import React, { useEffect, useState } from "react";
import { Button, useDisclosure, Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createBook, editBook, getBooksByUser, deleteBook } from "../../redux/thunkActions";
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
  const [currentStartIndex, setCurrentStartIndex] = useState(0); 
  
  

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

  
  function slideLeft() {
    setCurrentStartIndex((prev) => Math.max(prev - 1, 0));
  }

  function slideRight() {
    setCurrentStartIndex((prev) => Math.min(prev + 1, books.length - 4));
  }

  function handleDeleteBook(bookId: number): void {
    dispatch(deleteBook(bookId)).then(() => {
  
      setCurrentStartIndex((prevIndex) => {
        const newMaxIndex = Math.max(books.length - 5, 0);
        if (prevIndex > newMaxIndex) {
          return newMaxIndex;
        }
        return prevIndex;
      });
    });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
        {books.length > 4 && (
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={slideLeft}
            disabled={currentStartIndex === 0}
            aria-label="Slide Left"
          />
        )}
        <Box display="flex" flexWrap="wrap" gap="16px" margin="16px" justifyContent="center" alignItems="center">
          {books.slice(currentStartIndex, currentStartIndex + 4).map((book) => (
            <OneCardForMyBooks key={book.id} book={book} onEditClick={handleEditClick} onDelete={handleDeleteBook} />
          ))}
        </Box>
        {books.length > 4 && (
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={slideRight}
            disabled={currentStartIndex >= books.length - 4}
            aria-label="Slide Right"
          />
        )}
      </div>
      <Button colorScheme="purple" onClick={onOpen}>Добавить книгу</Button>
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
