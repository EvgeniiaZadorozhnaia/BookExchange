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
  const { books } = useAppSelector((state) => state.booksSlice);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(addToFavorite({bookId, userId: user.id}));
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

  return (
    <>
      {book ? (
        <div className={styles.container}>
          <Card maxW="sm" m="20px">
            <CardBody>
              <Image
                h="450px"
                src={`/${book.pictureUrl}`}
                alt="Picture"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  <div>Владелец: {book.Owner?.username}</div>
                  <Button
                    onClick={() => navigate(`/Book/${book.id}/owner`)}
                    colorScheme="teal"
                    mr={2}
                    mb={2}
                    _hover={{ bg: "teal.700" }}
                  >
                    Предложить обмен
                  </Button>
                  <Button
                    onClick={toggleFavorite}
                    colorScheme={isFavorite ? "red" : "gray"}
                    variant="ghost"
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    _hover={{ color: isFavorite ? "red.500" : "gray.500" }}
                  >
                    {isFavorite ? (
                      <MdFavorite size={24} />
                    ) : (
                      <MdFavoriteBorder size={24} />
                    )}
                  </Button>
                </Heading>
              </Stack>
            </CardBody>
          </Card>
          <CardInfo book={book} />
          <Reviews book={book} reviews={reviews} setReviews={setReviews} />
        </div>
      ) : (
        <CircularProgress isIndeterminate color="green.300" />
      )}
    </>
  );
}

export default OneBookPage;
