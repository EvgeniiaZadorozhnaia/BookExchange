import {
  ModalHeader,
  ModalBody,
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal,
  ModalFooter,
  Button,
  Box,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { ProfileModalProps } from "../../types/propsTypes";
import { CheckIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";

const { VITE_BASE_URL, VITE_API } = import.meta.env;

export default function ProfileModal({
  isOpen,
  onClose,
  exchangeHistoryIncoming,
  exchangeHistoryOutcoming,
}: ProfileModalProps): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [submissionStatus, setSubmissionStatus] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!isOpen) {
      setSubmissionStatus({});
    }
  }, [isOpen]);

  const submitTheExchangeHandler = async (
    exchangeId: number,
    submitType: string
  ) => {
    try {
      if (submitType === "accept") {
        const { data } = await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/exchanges/${exchangeId}`,
          { status: "В процессе" }
        );
        await axiosInstance.post(`${VITE_BASE_URL}${VITE_API}/messages`, {
          text: `Пользователь ${user.username} принял Ваш запрос`,
          authorId: user.id,
          toUser: data.fromUser,
          exchangeId,
        });
        setSubmissionStatus((prevState) => ({
          ...prevState,
          [exchangeId]: "accept",
        }));
      } else if (submitType === "decline") {
        const { data } = await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/exchanges/${exchangeId}`,
          { status: "Обмен отклонён" }
        );
        await axiosInstance.post(`${VITE_BASE_URL}${VITE_API}/messages`, {
          text: `Пользователь ${user.username} отклонил(а) Ваш запрос`,
          authorId: user.id,
          toUser: data.fromUser,
          exchangeId,
        });
        setSubmissionStatus((prevState) => ({
          ...prevState,
          [exchangeId]: "decline",
        }));
      } else if (submitType === "finished") {
        const { data } = await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/exchanges/${exchangeId}`,
          { status: "Завершён" }
        );
        await axiosInstance.post(`${VITE_BASE_URL}${VITE_API}/messages`, {
          text: `Обмен с пользователем ${user.username} завершён`,
          authorId: user.id,
          toUser: data.fromUser,
          exchangeId,
        });
        await axiosInstance.delete(
          `${VITE_BASE_URL}${VITE_API}/books/${data.toBook}`
        );
        if (data.fromBook) {
          await axiosInstance.delete(
            `${VITE_BASE_URL}${VITE_API}/books/${data.fromBook}`
          );
        }

        setSubmissionStatus((prevState) => ({
          ...prevState,
          [exchangeId]: "finished",
        }));
      } else {
        const exchangeStatus = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/exchanges/${exchangeId}`
        );
        setSubmissionStatus((prevState) => ({
          ...prevState,
          [exchangeId]: exchangeStatus.data.status,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" padding="40px">
          Моя история обменов
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Входящие обмены */}
          <Box bg="#a4e8af" borderRadius="7px" p="50px" my="10px" w="400px">
            <Text fontWeight="bold" mb="1rem" textAlign="center">
              Входящие обмены
            </Text>
            <Box>
              <Box as="table" width="100%" display="table">
                <Box as="thead" display="table-header-group">
                  <Box as="tr" display="table-row">
                    <Box as="th" display="table-cell">
                      Книга
                    </Box>
                    <Box as="th" display="table-cell"></Box>
                    <Box as="th" display="table-cell">
                      Действия
                    </Box>
                  </Box>
                </Box>
                <Box as="tbody" display="table-row-group">
                  {exchangeHistoryIncoming &&
                    exchangeHistoryIncoming.map((exchange) =>
                      exchange.status === "Ожидает подтверждения" ? (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={`http://localhost:3000/static/${exchange.BookFromAuthor.pictureUrl}`}
                              alt="Обложка книги"
                              width="80px"
                              height="120px"
                            />
                          </Box>
                          <Box
                            textAlign="center"
                            as="td"
                            m={"50px"}
                            display="table-cell"
                            fontWeight={"bold"}
                          >
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-around">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="7px"
                                >
                                  {submissionStatus[exchange.id] === "accept"
                                    ? "Принято"
                                    : "Отклонено"}
                                </Text>
                              ) : (
                                <>
                                  <Tooltip
                                    label="Принять обмен"
                                    aria-label="Принять обмен"
                                  >
                                    <Button
                                      size="xs"
                                      fontSize="20px"
                                      variant="ghost"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "accept"
                                        )
                                      }
                                      aria-label="Подтвердить"
                                    >
                                      <CheckIcon color="green.500" />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip
                                    label="Отклонить обмен"
                                    aria-label="Отклонить обмен"
                                  >
                                    <Button
                                      size="xs"
                                      fontSize="20px"
                                      variant="ghost"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "decline"
                                        )
                                      }
                                      aria-label="Отклонить"
                                    >
                                      <CloseIcon color="red.500" />
                                    </Button>
                                  </Tooltip>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ) : null
                    )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Отправленные обмены */}
          <Box bg="#b3cde0" borderRadius="7px" p="50px">
            <Text fontWeight="bold" mb="1rem" textAlign="center">
              Отправленные обмены
            </Text>
            <Box>
              <Box as="table" width="100%" display="table">
                <Box as="thead" display="table-header-group">
                  <Box as="tr" display="table-row">
                    <Box as="th" display="table-cell">
                      Книга
                    </Box>
                    <Box as="th" display="table-cell"></Box>
                    <Box as="th" display="table-cell">
                      Действия
                    </Box>
                  </Box>
                </Box>
                <Box as="tbody" display="table-row-group">
                  {exchangeHistoryOutcoming &&
                    exchangeHistoryOutcoming.map((exchange) =>
                      exchange.status === "Ожидает подтверждения" ? (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={`http://localhost:3000/static/${exchange.BookFromAuthor.pictureUrl}`}
                              alt="Обложка книги"
                              width="80px"
                              height="120px"
                            />
                          </Box>
                          <Box
                            textAlign="center"
                            as="td"
                            m={"50px"}
                            display="table-cell"
                            fontWeight={"bold"}
                          >
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-between">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="7px"
                                >
                                  {submissionStatus[exchange.id] === "decline"
                                    ? "Отменено"
                                    : `Статус: ${
                                        submissionStatus[exchange.id]
                                      }`}
                                </Text>
                              ) : (
                                <>
                                  <Tooltip
                                    label={`Статус обмена: Ожидает подтверждения`}
                                    aria-label="Информация о статусе обмена"
                                  >
                                    <Button
                                      size="xs"
                                      fontSize="20px"
                                      variant="ghost"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "status"
                                        )
                                      }
                                      aria-label="Статус"
                                    >
                                      <InfoIcon color="blue.500" />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip
                                    label="Отменить обмен"
                                    aria-label="Отменить обмен"
                                  >
                                    <Button
                                      size="xs"
                                      fontSize="20px"
                                      variant="ghost"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "decline"
                                        )
                                      }
                                      aria-label="Отменить"
                                    >
                                      <CloseIcon color="red.500" />
                                    </Button>
                                  </Tooltip>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ) : null
                    )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Активные обмены */}
          <Box bg="#a4e8af" borderRadius="7px" p="50px" my="10px" w="400px">
            <Text fontWeight="bold" mb="1rem" textAlign="center">
              Активные
            </Text>
            <Box>
              <Box as="table" width="100%" display="table">
                <Box as="thead" display="table-header-group">
                  <Box as="tr" display="table-row">
                    <Box as="th" display="table-cell">
                      Книга
                    </Box>
                    <Box as="th" display="table-cell"></Box>
                    <Box as="th" display="table-cell">
                      Действия
                    </Box>
                  </Box>
                </Box>
                <Box as="tbody" display="table-row-group">
                  {exchangeHistoryIncoming &&
                    exchangeHistoryIncoming.map((exchange) =>
                      exchange.status === "В процессе" ? (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={`http://localhost:3000/static/${exchange.BookFromAuthor.pictureUrl}`}
                              alt="Обложка книги"
                              width="80px"
                              height="120px"
                            />
                          </Box>
                          <Box
                            textAlign="center"
                            as="td"
                            m={"50px"}
                            display="table-cell"
                            fontWeight={"bold"}
                          >
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-between">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="7px"
                                >
                                  {submissionStatus[exchange.id] === "finished"
                                    ? "Завершен"
                                    : null}
                                </Text>
                              ) : (
                                <>
                                  <Tooltip
                                    label={`Статус обмена: В процессе`}
                                    aria-label="Информация о статусе обмена"
                                  >
                                    <Button
                                      size="xs"
                                      fontSize="20px"
                                      variant="ghost"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "finished"
                                        )
                                      }
                                      aria-label="Завершить"
                                    >
                                      <CheckIcon color="green.500" />
                                    </Button>
                                  </Tooltip>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ) : null
                    )}
                  {exchangeHistoryOutcoming &&
                    exchangeHistoryOutcoming.map((exchange) =>
                      exchange.status === "В процессе" ? (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={`http://localhost:3000/static/${exchange.BookFromAuthor.pictureUrl}`}
                              alt="Обложка книги"
                              width="80px"
                              height="120px"
                            />
                          </Box>
                          <Box
                            textAlign="center"
                            as="td"
                            m={"50px"}
                            display="table-cell"
                            fontWeight={"bold"}
                          >
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-between">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="7px"
                                >
                                  {submissionStatus[exchange.id] === "finished"
                                    ? "Завершен"
                                    : null}
                                </Text>
                              ) : (
                                <>
                                  <Tooltip
                                    label={`Статус обмена: В процессе`}
                                    aria-label="Информация о статусе обмена"
                                  >
                                    <Button
                                      size="xs"
                                      fontSize="20px"
                                      variant="ghost"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "finished"
                                        )
                                      }
                                      aria-label="Завершить"
                                    >
                                      <CheckIcon color="green.500" />
                                    </Button>
                                  </Tooltip>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ) : null
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={onClose}>Закрыть</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
