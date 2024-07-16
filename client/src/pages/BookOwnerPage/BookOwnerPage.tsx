import {
  Box,
  Text,
  Image,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import MyBooks from "./MyBooks";
import { BookWithOwner, Owner } from "../../types/stateTypes";
const { VITE_BASE_URL, VITE_API } = import.meta.env;

export default function BookOwnerPage(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState<Owner>({} as Owner);
  const [book, setBook] = useState<BookWithOwner>({} as BookWithOwner);
  const [booksToTake, setBooksToTake] = useState<BookWithOwner[]>([]);
  const [booksToGive, setBooksToGive] = useState<BookWithOwner[]>([]);
  const [bookToTake, setBookToTake] = useState<string | undefined>(id);
  const [bookToGive, setBookToGive] = useState<string>("");
  const [exchangeOffer, setExchangeOffer] = useState();
  const [rateClick, setRateClick] = useState<boolean>(false);
  const [rateOwner, setRateOwner] = useState<number>(0);
  const [isForExchange] = useState<boolean>(true);
  const [currentRating, setCurrentRating] = useState<number | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const { data: book } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/${id}/owner`
        );

        setBook(book[0]);

        const { data: ownerBooks } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/${book[0].Owner.id}/all`
        );
        const { data: myBooks } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/${user.id}`
        );

        const ownerData = book[0].Owner;
        setOwner(ownerData);
        setCurrentRating(ownerData.rating);
        setBooksToTake(ownerBooks);
        setBooksToGive(myBooks);
      } catch (error) {
        console.error("Ошибка при получении данных книг:", error);
      }
    };
    fetchBookData();
  }, [id, user.id]);

  const rateUser = async (currentRating: number) => {
    try {
      const numberOfRating = owner?.numberOfRating + 1;
      const currentRate = owner?.rating + currentRating;
      const rating = currentRate / numberOfRating;

      setCurrentRating(rating);

      const { data } = await axiosInstance.put(
        `${VITE_BASE_URL}${VITE_API}/users/rate/${owner?.id}`,
        { rating, numberOfRating }
      );

      setOwner((prev) => ({
        ...prev,
        rating: data.rating,
        numberOfRating: data.numberOfRating,
      }));
    } catch (error) {
      console.error("Ошибка при обновлении рейтинга:", error);
    }
  };

  const sendOfferForExchange = async () => {
    try {
      const newExchange = {
        fromUser: user.id,
        toUser: owner?.id,
        toBook: bookToTake,
      };
      const { data } = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/exchanges`,
        newExchange
      );
      const offerMessage = {
        text: `Пользователь ${user.username} отправил(а) Вам запрос на обмен книгой \"${book.title}\"`,
        authorId: user.id,
        toUser: owner?.id,
        exchangeId: data.id,
      };
      await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/messages`,
        offerMessage
      );
      setExchangeOffer(data);
    } catch (error) {
      console.error("Ошибка при создании нового обмена:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" margin="50px">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Карточка 1 */}
        {rateClick ? (
          <Card
            maxW="md"
            bg="#B5C6B8"
            border="solid 10px whitesmoke"
            borderRadius="20px"
            width="600px"
            height="700px"
            boxShadow="lg"
            p={5}
            m={5}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <CardHeader>
              <Flex justify="center">
                <Flex align="center">
                  <Image
                    borderRadius="full"
                    boxSize="200px"
                    src={`http://localhost:3000/static/${owner?.avatarUrl}`}
                    alt="userProfilePicture"
                  />
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {rateOwner ? (
                <>
                  <Text as="span" fontSize="xl">
                    Ваша оценка {rateOwner}
                  </Text>
                  <Text
                    as="span"
                    fontSize="xl"
                    _hover={{ transform: "scale(1.4)", color: "gold" }}
                  >
                    ⭐
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    bg="whitesmoke"
                    borderRadius="30px"
                    padding="5px"
                    as="span"
                    fontSize="xl"
                  >
                    Оцените пользователя
                  </Text>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Text
                      key={rating}
                      onClick={() => {
                        setRateOwner(rating);
                        rateUser(rating);
                      }}
                      as="span"
                      fontSize="xl"
                      _hover={{ transform: "scale(1.8)", color: "gold" }}
                    >
                      ⭐
                    </Text>
                  ))}
                </>
              )}
            </CardBody>

            <CardFooter display="flex" justifyContent="center">
              <Button
                onClick={() => setRateClick((prev) => !prev)}
                borderRadius="20px"
                width="500px"
              >
                Вернуться
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card
            maxW="md"
            bg="#B5C6B8"
            border="solid 10px whitesmoke"
            borderRadius="20px"
            width="600px"
            height="700px"
            boxShadow="lg"
            p={5}
            m={5}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <CardHeader>
              <Flex justify="center">
                <Flex align="center">
                  <Image
                    borderRadius="full"
                    boxSize="200px"
                    src={`http://localhost:3000/static/${owner?.avatarUrl}`}
                    alt="userProfilePicture"
                  />
                </Flex>
              </Flex>
            </CardHeader>
            <Box
              bg="whitesmoke"
              textAlign="center"
              padding="42px"
              m={10}
              borderRadius="100px"
            >
              {owner ? (
                <>
                  <Heading size="sm">
                    {owner.username}, {owner.city}
                  </Heading>
                  <Text>
                    Дата регистрации:{" "}
                    {new Date(owner.createdAt).toLocaleDateString()}
                  </Text>
                  <Text>Место встречи: {owner.placeOfMeeting}</Text>
                  <Text>Рейтинг {currentRating?.toFixed(1)} ⭐</Text>
                </>
              ) : (
                <Text>Загрузка...</Text>
              )}
            </Box>
            <CardFooter display="flex" justifyContent="center">
              {owner.id === user.id ? null : (
                <Button
                  onClick={() => setRateClick((prev) => !prev)}
                  borderRadius="20px"
                  width="500px"
                >
                  Поставить оценку
                </Button>
              )}
            </CardFooter>
          </Card>
        )}

        {/* Карточка 2 */}
        <>
          {exchangeOffer ? (
            <Card
              maxW="md"
              bg="whitesmoke"
              border="solid 10px #B5C6B8"
              borderRadius="20px"
              width="500px"
              height="700px"
              boxShadow="lg"
              p={5}
              m={5}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text textAlign="center">
                  Пользователю {owner.username} отправлено сообщение о Вашем
                  запросе
                </Text>
                <OneCard book={book} isForExchange={isForExchange} />
              </Box>
              <Button
                onClick={() => navigate("/profile")}
                bg="#B5C6B8"
                borderRadius="20px"
                mt="auto"
              >
                Написать владельцу
              </Button>
            </Card>
          ) : (
            <Card
              maxW="md"
              bg="whitesmoke"
              border="solid 10px #B5C6B8"
              borderRadius="20px"
              width="500px"
              height="700px"
              boxShadow="lg"
              p={5}
              m={5}
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              {owner.id === user.id ? (
                <>
                  <Text
                    bg="rgba(22, 9, 156, 0.3)"
                    m={2}
                    textAlign="center"
                    borderRadius="20px"
                    height="26px"
                  >
                    Мои книги
                  </Text>
                  {booksToGive &&
                    booksToGive.map((book) => (
                      <MyBooks key={book.id} book={book} isForExchange={true} />
                    ))}
                  <Button
                    onClick={() => navigate("/")}
                    bg="rgba(22, 9, 156, 0.3)"
                    textAlign="center"
                    borderRadius="20px"
                  >
                    Найти книги для обмена
                  </Button>
                </>
              ) : (
                <>
                  <Box>
                    <Heading size="md" mb={4} textAlign="center">
                      Запрос на обмен
                    </Heading>
                    <Text
                      fontSize="lg"
                      mb={2}
                      textAlign="center"
                      marginTop="30px"
                    >
                      Выберите книгу
                    </Text>
                    <Select
                      placeholder="Забрать"
                      mb={4}
                      value={bookToTake}
                      onChange={(e) => setBookToTake(e.target.value)}
                    >
                      {booksToTake &&
                        booksToTake.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.title}
                          </option>
                        ))}
                    </Select>
                    <Select
                      placeholder="Отдать"
                      mb={4}
                      value={bookToGive}
                      onChange={(e) => setBookToGive(e.target.value)}
                    >
                      {booksToGive &&
                        booksToGive.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.title}
                          </option>
                        ))}
                    </Select>
                  </Box>
                  <Button
                    onClick={sendOfferForExchange}
                    bg="#B5C6B8"
                    borderRadius="20px"
                    mt="auto"
                  >
                    Отправить предложение
                  </Button>
                </>
              )}
            </Card>
          )}
        </>
      </SimpleGrid>
    </Box>
  );
}
