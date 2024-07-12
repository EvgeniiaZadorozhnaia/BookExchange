import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import axiosInstance from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CircularProgress,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { BookState } from "../../components/initState";
import { IBook } from "../../types/stateTypes";
import styles from "./OneBookPage.module.css";
import CardInfo from "./CardInfo";
import Reviews from "./Reviews";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToFavorite } from "../../redux/thunkActions";

function OneBookPage() {
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<IBook>(BookState);
  const { user } = useAppSelector((state) => state.authSlice);
  const { bookId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState();
  const [description, setDescription] = useState("");

  const back = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(addToFavorite({ bookId, userId: user.id }));
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

  async function searchBookByTitle(title) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      title
    )}&langRestrict=ru`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const firstBook = data.items[0].volumeInfo;
        const bookTitle = firstBook.title;
        const bookAuthors = firstBook.authors
          ? firstBook.authors.join(", ")
          : "Автор не указан";
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
        <div className={styles.container}>
          <div className={styles.card} style={{ display: "flex" }}>
            <Card
              maxW="xl"
              m="20px"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              overflow="hidden"
            >
              <CardBody textAlign="center">
                <Image
                  h="550px"
                  src={`/${book.pictureUrl}`}
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
                      <>
                        {" "}
                        <Button
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
                        >
                          {isFavorite ? (
                            <MdFavorite size={24} />
                          ) : (
                            <MdFavoriteBorder size={24} />
                          )}
                        </Button>
                      </>
                    ) : null}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>
          </div>
          <div className={styles.container2}>
            <div className={styles.cardInfo}>
              <CardInfo book={book} description={description} />
            </div>

            <div className={styles.reviews}>
              <Reviews
                book={book}
                reviews={reviews}
                setReviews={setReviews}
                setBook={setBook}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <p></p>
              <Button
                onClick={() => back(-1)}
                mr={2}
                mb={2}
                variant="outline"
                colorScheme="purple"
                opacity="0.8"
                _hover={{ bg: "purple.100" }}
                w="100px"
              >
                Назад
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress isIndeterminate color="green.300" />
      )}
    </>
  );
}

export default OneBookPage;
