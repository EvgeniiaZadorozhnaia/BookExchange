import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { adminPageProps } from "../../types/propsTypes";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function AdminPage({
  usersWithComments,
  setUsersWithComments,
}: adminPageProps): JSX.Element {
  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/users`
        );
        setUsersWithComments(() => data);
        console.log('data', data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  
  console.log('usersWithComments', usersWithComments);
  

  async function handleDeleteReview(reviewId: number) {
    try {
      await axiosInstance.delete(
        `${VITE_BASE_URL}${VITE_API}/reviews/${reviewId}`
      );
      setUsersWithComments((prev) =>
        prev.map((user) => ({
          ...user,
          reviews: user.reviews.filter(
            (r: { id: number }) => r.id !== reviewId
          ),
        }))
      );
    } catch (error) {
      console.error("Ошибка при удалении отзыва", error);
    }
  }

  async function handleBlockUser(userId: number) {
    try {
      await axiosInstance.put(
        `${VITE_BASE_URL}${VITE_API}/users/${userId}/block`
      );
      setUsersWithComments((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isBlocked: true } : user
        )
      );
      await axiosInstance.delete(
        `${VITE_BASE_URL}${VITE_API}/books/${userId}/allBooks`
      );
    } catch (error) {
      console.error("Ошибка при блокировании пользователя", error);
    }
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div>
      <VStack
        style={{ display: "flex", flexWrap: "wrap" }}
        spacing={4}
        width="full"
      >
        {usersWithComments.map((user) => (
          <Box
            key={user.id}
            borderWidth="1px solid green"
            borderRadius="md"
            p={4}
            width="full"
            maxWidth="700px"
            boxShadow="md"
            mb={4}
            bg={"#b5c6b8b8"}
          >
            <Flex direction="column" mb={4}>
              <Text fontWeight="bold">Имя пользователя: {user.username}</Text>
              <Text>Электронная почта: {user.email}</Text>
              {user.rating ? (
                <Text>Рейтинг: {user.rating} ⭐</Text>
              ) : (
                <Text>У этого пользователя пока нет оценок</Text>
              )}
              <Text>Количество комментариев: {user.reviews.length}</Text>
              <Text>Количество лайков: {user.reviews.reduce((acc, el) => (acc + el.likes), 0)}</Text>
              <Text>Количество дизлайков: {user.reviews.reduce((acc, el) => (acc + el.dislikes), 0)}</Text>
              <Text>Дата регистрации: {formatDate(user.createdAt)}</Text>
            </Flex>

            <Box
              maxHeight="200px"
              overflowY="auto"
              mb={4}
              p={2}
              bg="gray.50"
              borderWidth="1px"
              borderRadius="md"
            >
              {user.reviews.length > 0 ? (
                user.reviews.map((review) => (
                  <Box
                    key={review.id}
                    mb={4}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                  >
                    <Text fontSize="md">{review.content}</Text>
                    <Flex justify="space-between" mt={2}>
                      {review.likes > 0 ? (
                        <Flex align="center" color="green.500">
                          <Icon as={FaThumbsUp} mr={1} /> {review.likes}
                        </Flex>
                      ) : null}
                      {review.dislikes > 0 ? (
                        <Flex align="center" color="red.500">
                          <Icon as={FaThumbsDown} mr={1} /> {review.dislikes}
                        </Flex>
                      ) : null}
                    </Flex>
                    <Flex mt={2} justify="flex-end">
                      <Button
                        colorScheme="teal"
                        variant="outline"
                        size="sm"
                        mr={2}
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Удалить отзыв
                      </Button>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Text color="gray.600">Нет отзывов</Text>
              )}
            </Box>

            <Flex justify="flex-end">
              {user.isBlocked ? (
                <Button colorScheme="red" variant="outline" size="sm">
                  Пользователь заблокирован
                </Button>
              ) : (
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => handleBlockUser(user.id)}
                >
                  Блокировать пользователя
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </VStack>
    </div>
  );
}

export default AdminPage;
