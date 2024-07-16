import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import axiosInstance from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { BookState } from "../../components/initState";
import { IBook, IReview } from "../../types/stateTypes";
import styles from "./OneBookPage.module.css";
import CardInfo from "./CardInfo";
import Reviews from "./Reviews";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToFavorite } from "../../redux/thunkActions";

function OneBookPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { bookId } = useParams();
  const { user } = useAppSelector((state) => state.authSlice);
  const [book, setBook] = useState<IBook>(BookState);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [description, setDescription] = useState<string>("");

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(addToFavorite({ bookId: book.id, userId: user.id }));
  };

  useEffect(() => {
    async function getBook() {
      try {
        const { data }: AxiosResponse = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/oneBook/${bookId}`
        );
        setBook(() => data);
        setReviews(() => data.Review);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, [bookId, setReviews]);

  const navigate = useNavigate();

  async function searchBookByTitle(title: string) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      title
    )}&langRestrict=ru`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const firstBook = data.items[0].volumeInfo;
        const bookTitle = firstBook.title;
        console.log(bookTitle);

        const bookAuthors = firstBook.authors
          ? firstBook.authors.join(", ")
          : "Автор не указан";
        console.log(bookAuthors);

        const bookDescription = firstBook.description || "Описание отсутствует";
        setDescription(bookDescription);
      }
    } catch (error) {
      console.error("Произошла ошибка при выполнении запроса:", error);
    }
  }

  const bookTitle = book.title;
  searchBookByTitle(bookTitle);

  return (
    <>
      {book ? (
        <div style={{ display: "flex", justifyContent:'center'}}>
          <Flex direction="column" align="center" m="10px">
            <Card maxW="sm">
              <CardBody
                textAlign="center"
                backgroundColor="#B5C6B8"
                borderRadius="lg"
                border="1px solid #2f855a"
              >
                <Image
                  h="550px"
                  src={`http://localhost:3000/static/${book.pictureUrl}`}
                  alt="Picture"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" textAlign="center">
                    {book?.Owner?.id !== user.id ? (
                      <div>Владелец: {book.Owner?.username}</div>
                    ) : (
                      <div>Моя книга</div>
                    )}
                    <p></p>
                    {book?.Owner?.id !== user.id ? (
                      <Flex alignItems="center" flexDirection="column">
                        <Button
                          width={200}
                          onClick={() => navigate(`/Book/${book.id}/owner`)}
                          mr={2}
                          mb={2}
                          variant="outline"
                          colorScheme="purple"
                          opacity="0.8"
                          _hover={{ bg: "purple.100" }}
                        >
                          Предложить обмен
                        </Button>
                        <Button
                          onClick={toggleFavorite}
                          colorScheme={isFavorite ? "red" : "gray"}
                          variant="ghost"
                          aria-label={
                            isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          _hover={{
                            color: isFavorite ? "red.500" : "gray.500",
                          }}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {isFavorite ? (
                            <>
                              <MdFavorite size={24} />
                              <span style={{ marginLeft: 8 }}>В избранном</span>
                            </>
                          ) : (
                            <>
                              <MdFavoriteBorder size={24} />
                              <span style={{ marginLeft: 8 }}>
                                Добавить в избранное
                              </span>
                            </>
                          )}
                        </Button>
                      </Flex>
                    ) : null}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>

            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              colorScheme="purple"
              opacity="0.8"
              _hover={{ bg: "purple.100" }}
              w="100px"
              mt="4"
            >
              Назад
            </Button>
          </Flex>

          <div className={styles.container}>
            <CardInfo book={book} description={description} />

            <Reviews
              book={book}
              reviews={reviews}
              setReviews={setReviews}
              setBook={setBook}
            />
          </div>
        </div>
      ) : (
        <CircularProgress isIndeterminate color="green.300" />
      )}
    </>
  );
}

export default OneBookPage;
