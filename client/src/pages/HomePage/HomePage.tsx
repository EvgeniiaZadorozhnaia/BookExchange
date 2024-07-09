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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [displayedBooks, setDisplayedBooks] = useState<IBooks>([]);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      setTotalPages(Math.ceil(books.length / booksPerPage));
      setDisplayedBooks(getCurrentBooks());
    }
  }, [books, currentPage]);

  const getCurrentBooks: () => IBooks = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return books.slice(startIndex, endIndex);
  };

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
          style={{
            margin: "5px",
            backgroundColor: i === currentPage ? "#2f855a" : "inherit",
            color: i === currentPage ? "white" : "inherit",
          }}
          _hover={{ color: "#2F855A", bg: "teal.700" }}
          _active={{ bg: "teal.800" }}
          _focus={{ boxShadow: "none" }}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      <SearchInput displayedBooks={displayedBooks} setDisplayedBooks={setDisplayedBooks} />
      <ListOfBooks displayedBooks={displayedBooks} />
      <Box
        mt={4}
        style={{
          marginBottom: "20px",
        }}
      >
        {generatePageButtons()}
      </Box>
    </>
  );
}

export default HomePage;
