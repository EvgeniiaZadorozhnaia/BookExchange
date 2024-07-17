import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteBookFromFavorites,
  getFavoriteBooks,
} from "../../redux/thunkActions";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import OneCardForFavorites from "../../components/OneCardForFavorites/OneCardForFavorites";

function FavoritesPage() {
  const { books } = useAppSelector((state) => state.booksSlice);
  const { user } = useAppSelector((state) => state.authSlice);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(getFavoriteBooks(user.id));
    }
  }, [user]);

  function handleDeleteBook(bookId: number): void {
    dispatch(deleteBookFromFavorites({ bookId, userId: user.id }));
  }

  function slideLeft() {
    setCurrentStartIndex((prev) => Math.max(prev - 1, 0));
  }

  function slideRight() {
    setCurrentStartIndex((prev) => Math.min(prev + 1, books.length - 3));
  }

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {books.length > 3 && (
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={slideLeft}
            disabled={currentStartIndex === 0}
            aria-label="Slide Left"
            bg="green.300"
            _hover={{ bg: "green.600" }}
          />
        )}
        <Box
          display="flex"
          flexWrap="wrap"
          gap="16px"
          margin="16px"
          justifyContent="center"
          alignItems="center"
        >
          {books
            .slice(currentStartIndex, currentStartIndex + 3)
            ?.map((book) => (
              <OneCardForFavorites
                key={book.id}
                book={book}
                onDelete={handleDeleteBook}
              />
            ))}
        </Box>
        {books.length > 3 && (
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={slideRight}
            disabled={currentStartIndex >= books.length - 3}
            aria-label="Slide Right"
            colorScheme="green"
            bg="green.300"
            _hover={{ bg: "green.600" }}
          />
        )}
      </Box>
    </Box>
  );
}

export default FavoritesPage;
