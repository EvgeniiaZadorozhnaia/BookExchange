import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Box, Button, Divider, Flex, VStack, Text } from "@chakra-ui/react";
import { adminPageProps } from "../../types/propsTypes";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

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

  return (
    <div>
      <Flex direction="column" align="center" p={4}>
        <VStack spacing={4} width="full" maxWidth="800px">
          {usersWithComments.map((user) => (
            <Box
              key={user.id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              width="full"
              boxShadow="md"
              bg="white"
            >
              <Text fontSize="xl" fontWeight="bold">
                {user.username}
              </Text>
              <Text color="gray.600">{user.email}</Text>
              {user.rating ? (
                <Text color="gray.600">{user.rating} ⭐</Text>
              ) : (
                <Text color="gray.600">
                  У этого пользователя пока нет оценок
                </Text>
              )}

              <Divider my={4} />
              {user.reviews.map((review) => (
                <Box
                  key={review.id}
                  mb={4}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Text fontSize="md">{review.content}</Text>
                  <Flex justify="space-between" mt={2}>
                    {review.likes > 0 ? (
                      <Text color="green.500">Лайки: {review.likes}</Text>
                    ) : null}
                    {review.dislikes > 0 ? (
                      <Text color="red.500">Дизлайки: {review.dislikes}</Text>
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
              ))}
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
      </Flex>
    </div>
  );
}

export default AdminPage;
