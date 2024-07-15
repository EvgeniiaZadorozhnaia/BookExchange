import { useEffect, useState } from "react";
import ListOfBooks from "../../components/ListOfBooks/ListOfBooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBooks } from "../../redux/thunkActions";
import { IBooks } from "../../types/stateTypes";
import { motion } from "framer-motion";
import { Spinner } from "@chakra-ui/react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import SearchInput from "../../components/SearchInput/SearchInput";
import { homePageProps } from "../../types/propsTypes";

function HomePage({ usersWithComments }: homePageProps): JSX.Element {
  const booksPerPage: number = 10;
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.booksSlice);
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filteredBooks, setFilteredBooks] = useState<IBooks>([]);
  const [displayedBooks, setDisplayedBooks] = useState<IBooks>([]);
  const [isNoResultsOpen, setIsNoResultsOpen] = useState<boolean>(false);
  const AnimatedBox = motion(Box);

  useEffect(() => {
    dispatch(getBooks());
  }, [usersWithComments]);

  useEffect(() => {
    if (books.length > 0) {
      const total = Math.ceil(books.length / booksPerPage);
      setTotalPages(total);
      setCurrentPage(1);
      setFilteredBooks(books);
      setDisplayedBooks(books.slice(0, booksPerPage));
    }
  }, [books]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
  }, [filteredBooks, currentPage]);

  function filterBooks() {
    let updatedBooks = [...books];

    if (input) {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(input.toLowerCase()) ||
          book.author.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (selectedCity) {
      updatedBooks = updatedBooks.filter(
        (book) => book.Owner.city === selectedCity
      );
    }

    setFilteredBooks(updatedBooks);
    const total = Math.ceil(updatedBooks.length / booksPerPage);
    setTotalPages(total);
    setCurrentPage(1);

    if (updatedBooks.length === 0) {
      setIsNoResultsOpen(true);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageButtons = () => {
    const buttons: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={i === currentPage ? "purple" : "gray"}
          mr={2}
          mb={2}
          _hover={{ bg: "purple.100" }}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterBooks();
    setInput("");
    setSelectedCity("");
  };

  const handleCloseNoResults = () => {
    setIsNoResultsOpen(false);
  };

  return (
    <>
      <SearchInput
        options={options}
        input={input}
        setInput={setInput}
        setSelectedCity={setSelectedCity}
        setOptions={setOptions}
        handleSubmit={handleSubmit}
      />
      {!books.length ? (
        <Spinner size="xl" color="purple.500" />
      ) : (
        <ListOfBooks books={displayedBooks} />
      )}
      {totalPages > 1 && (
        <AnimatedBox
          mt={4}
          textAlign="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {generatePageButtons()}
        </AnimatedBox>
      )}
      <Modal isOpen={isNoResultsOpen} onClose={handleCloseNoResults} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="lg" p={6}>
          <ModalHeader textAlign="center" fontSize="xl" color="brand.500">
            Нет результатов
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Text mb={4}>
              По вашему запросу ничего не найдено. Пожалуйста, попробуйте
              изменить условия поиска.
            </Text>

            <Button
              onClick={handleCloseNoResults}
              ml={2}
              minWidth="100px"
              variant="outline"
              colorScheme="purple"
              opacity="0.8"
              _hover={{ bg: "purple.100" }}
            >
              Закрыть
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HomePage;
