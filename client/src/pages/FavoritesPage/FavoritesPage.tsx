import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteBookFromFavorites, getFavoriteBooks } from "../../redux/thunkActions";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import OneCardForFavorites from "../../components/OneCardForFavorites/OneCardForFavorites";

function FavoritesPage() {
    const { books } = useAppSelector((state) => state.booksSlice);
    const { user } = useAppSelector((state) => state.authSlice);
    const [currentStartIndex, setCurrentStartIndex] = useState(0); 
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getFavoriteBooks(user.id))    
    }, [user]);

    

    function handleDeleteBook(bookId: number): void {
        dispatch(deleteBookFromFavorites({ bookId, userId: user.id })
        )}

    function slideLeft() {
            setCurrentStartIndex((prev) => Math.max(prev - 1, 0));
          }
        
    function slideRight() {
            setCurrentStartIndex((prev) => Math.min(prev + 1, books.length - 4));
          }


    return (
        <Box>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
                {books.length > 4 && (
                    <IconButton
                        icon={<ChevronLeftIcon />}
                        onClick={slideLeft}
                        disabled={currentStartIndex === 0}
                        aria-label="Slide Left"
                    />
                )}
                <Box display="flex" flexWrap="wrap" gap="16px" margin="16px" justifyContent="center" alignItems="center">
                    {books.slice(currentStartIndex, currentStartIndex + 4)?.map((book) => (
                        <OneCardForFavorites key={book.id} book={book} onDelete={handleDeleteBook} />
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
            </Box>
        </Box>
    );
}

export default FavoritesPage;