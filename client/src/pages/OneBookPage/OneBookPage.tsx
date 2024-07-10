import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CircularProgress,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BookState } from "../../components/initState";
import { IBook } from "../../types/stateTypes";
import styles from "./OneBookPage.module.css";
import CardInfo from "./CardInfo";
import Reviews from "./Reviews";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

function OneBookPage() {
  const [book, setBook] = useState<IBook>(BookState);
  const [reviews, setRewiews] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    async function getBook() {
      try {
        const { data }: AxiosResponse = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/oneBook/${bookId}`
        );
        setBook(() => data);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, []);

  useEffect(() => {
    async function getRewiews() {
      try {
        const { data }: AxiosResponse = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/reviews/${bookId}`
        );
        setRewiews(() => data);
      } catch (error) {
        console.log(error);
      }
    }
    getRewiews();
  }, []);

  console.log(reviews);

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
                  <div>Владелец: {book.User.username}</div>
                  <Button
                    colorScheme={"teal"}
                    mr={2}
                    mb={2}
                    _hover={{ bg: "teal.700" }}
                  >
                    Предложить обмен
                  </Button>
                </Heading>
              </Stack>
            </CardBody>
          </Card>
          <CardInfo book={book} />
          <Reviews reviews={reviews} />
        </div>
      ) : (
        <CircularProgress isIndeterminate color="green.300" />
      )}
    </>
  );
}

export default OneBookPage;
