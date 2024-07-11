import { useEffect, useState } from "react";
import ListOfBooks from "../../components/ListOfBooks/ListOfBooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBooks } from "../../redux/thunkActions";
import { IBooks } from "../../types/stateTypes";
import { Box, Button } from "@chakra-ui/react";
import SearchInput from "../../components/SearchInput/SearchInput";

function HomePage(): JSX.Element {
  const booksPerPage: number = 8;
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.booksSlice);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredBooks, setFilteredBooks] = useState<IBooks>([]);
  const [displayedBooks, setDisplayedBooks] = useState<IBooks>([]);


  useEffect(() => {
    dispatch(getBooks());
  }, []);

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
          colorScheme={i === currentPage ? "teal" : "gray"}
          mr={2}
          mb={2}
          _hover={{ bg: "teal.700" }}
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
    setSelectedCity("")
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
      <ListOfBooks books={displayedBooks} />
      {totalPages > 1 && (
        <Box mt={4} textAlign="center">
          {generatePageButtons()}
        </Box>
      )}
    </>
  );
}

export default HomePage;
