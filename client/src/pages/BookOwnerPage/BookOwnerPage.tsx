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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useAppSelector } from "../../redux/hooks";
const { VITE_BASE_URL, VITE_API } = import.meta.env;

interface Owner {
  username: string;
  createdAt: string;
  rating: number;
}

export default function BookOwnerPage(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [booksToTake, setBooksToTake] = useState([]);
  const [booksToGive, setBooksToGive] = useState([]);
  const [bookToTake, setBookToTake] = useState<string>("");
  const [bookToGive, setBookToGive] = useState<string>("");
  const [exchangeOffer, setExchangeOffer] = useState();
  const [rateClick, setRateClick] = useState(false);
  const [rateOwner, setRateOwner] = useState(0);
  console.log(rateOwner);

  useEffect((): void => {
    const fetchBookData = async (): Promise<void> => {
      try {
        const { data } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/${id}/owner`
        );
        const { data: ownerBooks } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/${data[0].Owner.id}/all`
        );
        const { data: myBooks } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/books/${user.id}`
        );

        // console.log(ownerBooks);
        
        setOwner(data[0].Owner);
        setBooksToTake(ownerBooks);
        setBooksToGive(myBooks);
      } catch (error) {
        console.error("Ошибка при получении данных книг:", error);
      }
    };
    fetchBookData();
  }, [id]);

  const sendOfferForExchange = async () => {
    try {
      const newExchange = {
        fromUser: user.id,
        toUser: owner.id,
        toBook: bookToTake,
      };
      const { data } = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/exchanges`,
        newExchange
      );
      const offerMessage = {
        text: `Пользователь ${user.username} отправил(а) Вам запрос на обмен`,
        authorId: user.id,
        toUser: owner.id,
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
            bg="rgba(22, 9, 156, 0.3)"
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
                    src="https://bit.ly/dan-abramov"
                    alt="userProfilePicture"
                  />
                  <Box textAlign="center" ml={3}>
                    {owner ? (
                      <>
                        <Heading size="sm">{owner.username}</Heading>
                        <Text>Дата регистрации</Text>
                        <Text>
                          {new Date(owner.createdAt).toLocaleString()}
                        </Text>
                        <Text>Рейтинг {owner.rating} ⭐</Text>
                        <Text>Контакты для связи</Text>
                      </>
                    ) : (
                      <Text>Загрузка...</Text>
                    )}
                  </Box>
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
                  <Text as="span" fontSize="xl">
                    Оцените пользователя
                  </Text>
                  <Text
                    onClick={() => setRateOwner(1)}
                    as="span"
                    fontSize="xl"
                    _hover={{ transform: "scale(1.4)", color: "gold" }}
                  >
                    ⭐
                  </Text>
                  <Text
                    onClick={() => setRateOwner(2)}
                    as="span"
                    fontSize="xl"
                    _hover={{ transform: "scale(1.4)", color: "gold" }}
                  >
                    ⭐
                  </Text>
                  <Text
                    onClick={() => setRateOwner(3)}
                    as="span"
                    fontSize="xl"
                    _hover={{ transform: "scale(1.4)", color: "gold" }}
                  >
                    ⭐
                  </Text>
                  <Text
                    onClick={() => setRateOwner(4)}
                    as="span"
                    fontSize="xl"
                    _hover={{ transform: "scale(1.4)", color: "gold" }}
                  >
                    ⭐
                  </Text>
                  <Text
                    onClick={() => setRateOwner(5)}
                    as="span"
                    fontSize="xl"
                    _hover={{ transform: "scale(1.4)", color: "gold" }}
                  >
                    ⭐
                  </Text>
                </>
              )}
            </CardBody>
            <CardFooter display="flex" justifyContent="center">
              <Button
                onClick={() => setRateClick((prev) => !prev)}
                borderRadius="20px"
              >
                Вернуться
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card
            maxW="md"
            bg="rgba(22, 9, 156, 0.3)"
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
                    src="https://bit.ly/dan-abramov"
                    alt="userProfilePicture"
                  />
                  <Box textAlign="center" ml={3}>
                    {owner ? (
                      <>
                        <Heading size="sm">{owner.username}</Heading>
                        <Text>Дата регистрации</Text>
                        <Text>
                          {new Date(owner.createdAt).toLocaleString()}
                        </Text>
                        <Text>Рейтинг {owner.rating} ⭐</Text>
                        <Text>Контакты для связи</Text>
                      </>
                    ) : (
                      <Text>Загрузка...</Text>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Удобная локация для встречи
            </CardBody>
            <CardFooter display="flex" justifyContent="center">
              <Button
                onClick={() => setRateClick((prev) => !prev)}
                borderRadius="20px"
              >
                Поставить оценку
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Карточка 2 */}
        {exchangeOffer ? (
          <Card
            maxW="md"
            bg="whitesmoke"
            border="solid 10px rgba(22, 9, 156, 0.3)"
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
              <Heading size="md" mb={4} textAlign="center">
                Запрос на обмен №{exchangeOffer.id}
              </Heading>
              <Text fontSize="lg" mb={2} textAlign="center" marginTop="30px">
                Ваш запрос успешно создан
              </Text>{" "}
              <Text fontSize="lg" mb={2} textAlign="center" marginTop="30px">
                Пользователю {owner.username} отправлено сообщение о Вашем
                запросе
              </Text>
            </Box>
            <Button
              onClick={() => {
                setExchangeOffer("");
                setBookToTake("");
              }}
              bg="rgba(22, 9, 156, 0.3)"
              borderRadius="20px"
              mt="auto"
            >
              Закрыть
            </Button>
          </Card>
        ) : (
          <Card
            maxW="md"
            bg="whitesmoke"
            border="solid 10px rgba(22, 9, 156, 0.3)"
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
              <Heading size="md" mb={4} textAlign="center">
                Запрос на обмен
              </Heading>
              <Text fontSize="lg" mb={2} textAlign="center" marginTop="30px">
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
              bg="rgba(22, 9, 156, 0.3)"
              borderRadius="20px"
              mt="auto"
            >
              Отправить предложение
            </Button>
          </Card>
        )}
      </SimpleGrid>
    </Box>
  );
}
