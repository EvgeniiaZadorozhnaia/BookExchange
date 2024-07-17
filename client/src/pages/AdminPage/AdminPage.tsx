import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { adminPageProps } from "../../types/propsTypes";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IUserWithComments } from "../../types/stateTypes";

function AdminPage({
  usersWithComments,
  setUsersWithComments,
}: adminPageProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<
    IUserWithComments | undefined
  >(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/users`
        );
        setUsersWithComments(data);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [setUsersWithComments]);

  async function handleDeleteReview(reviewId: number) {
    if (!selectedUser) return;

    try {
      await axiosInstance.delete(
        `${VITE_BASE_URL}${VITE_API}/reviews/${reviewId}`
      );

  
      const updatedUser = {
        ...selectedUser,
        reviews: selectedUser.reviews.filter(
          (review) => review.id !== reviewId
        ),
      };

      setSelectedUser(updatedUser);
      setUsersWithComments((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );

      toast({
        title: "Отзыв удален.",
        description: "Отзыв успешно удален.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Ошибка при удалении отзыва", error);
      toast({
        title: "Ошибка.",
        description: "Не удалось удалить отзыв.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      toast({
        title: "Успешно",
        description: "Пользователь успешно заблокирован.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Ошибка при блокировании пользователя", error);
      toast({
        title: "Ошибка",
        description: "Не удалось заблокировать пользователя.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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

  const handleUserClick = (user: IUserWithComments) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <>
      <Flex direction="row" align="center"></Flex>
      <Text
        textShadow="1px 0 2px black"
        fontSize="50px"
        fontWeight="bold"
        color="green.500"
        mb={4}
      >
        Статистика пользователей сайта
      </Text>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={4}
        width="full"
        mx="auto"
        mb={8}
        maxW="1200px"
        justifyContent="center"
        alignItems="start"
      >
        {usersWithComments.map((user) => (
          <Box
            key={user.id}
            borderWidth="1px solid green"
            borderRadius="md"
            p={4}
            boxShadow="md"
            bg="#b5c6b8b8"
          >
            <Flex direction="column" mb={4}>
              <Text fontWeight="bold" textAlign="center">
                Имя пользователя: {user.username}
              </Text>
              <Button
                colorScheme="green"
                variant="outline"
                size="sm"
                onClick={() => handleUserClick(user)}
                mt={2}
              >
                Подробнее
              </Button>
            </Flex>

            <Flex justify="flex-end">
              {user.isBlocked ? (
                <Button colorScheme="red" variant="outline" size="sm">
                  Пользователь заблокирован
                </Button>
              ) : (
                <Button
                  onClick={() => handleBlockUser(user.id)}
                  ml={2}
                  minWidth="120px"
                  height="40px"
                  variant="solid"
                  colorScheme="red"
                >
                  Заблокировать
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      {selectedUser && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Подробная информация</ModalHeader>
            <ModalBody>
              <Text fontWeight="bold">
                Имя пользователя: {selectedUser.username}
              </Text>
              <Text>Электронная почта: {selectedUser.email}</Text>
              {selectedUser.rating ? (
                <Text style={{ display: "flex", alignItems: "center" }}>
                  <span>{`Рейтинг: ${selectedUser.rating}`}</span>
                  <span
                    style={{
                      textShadow: "black 1px 0 10px",
                      marginLeft: "5px",
                    }}
                  >
                    ⭐
                  </span>
                </Text>
              ) : (
                <Text>У этого пользователя пока нет оценок</Text>
              )}
              {selectedUser?.reviews ? (
                <>
                  <Text>
                    Общее количество комментариев:{" "}
                    {selectedUser?.reviews?.length}
                  </Text>
                  <Text>
                    Общее количество лайков:{" "}
                    {selectedUser.reviews.reduce(
                      (acc, el) => acc + el.likes,
                      0
                    )}
                  </Text>
                  <Text>
                    Общее количество дизлайков:{" "}
                    {selectedUser.reviews.reduce(
                      (acc, el) => acc + el.dislikes,
                      0
                    )}
                  </Text>
                </>
              ) : (
                <>
                  <Text>Общее количество комментариев: 0</Text>
                  <Text>Общее количество лайков: 0</Text>
                  <Text>Общее количество дизлайков: 0</Text>
                </>
              )}

              <Text>
                Дата регистрации: {formatDate(selectedUser.createdAt)}
              </Text>

              <Box
                height="135px"
                overflowY="auto"
                mb={4}
                p={2}
                bg="gray.50"
                borderWidth="1px"
                borderRadius="md"
              >
                {selectedUser.reviews.length !== 0 ? (
                  selectedUser.reviews.map((review) => (
                    <Box
                      key={review.id}
                      mb={4}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      bg="white"
                    >
                      <Text fontSize="md">{review.content}</Text>
                      <Flex justify="space-between" mt={2} align="center">
                        <Flex align="center" ml={4}>
                          <Flex align="center" mr={4} color="green.500">
                            <Icon as={FaThumbsUp} mr={1} /> {review.likes}
                          </Flex>
                          <Flex align="center" color="red.500">
                            <Icon as={FaThumbsDown} mr={1} /> {review.dislikes}
                          </Flex>
                        </Flex>
                        <Button
                          colorScheme="red"
                          variant="outline"
                          size="sm"
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" onClick={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default AdminPage;
