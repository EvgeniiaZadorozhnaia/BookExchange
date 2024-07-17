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
} from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { ProfileModalProps } from "../../types/propsTypes";

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
                    exchangeHistoryIncoming.map(
                      (exchange) =>
                        exchange.status === "Ожидает подтверждения" && (
                          <Box as="tr" display="table-row" key={exchange.id}>
                            <Box as="td" display="table-cell">
                              <Image
                                src={exchange.BookFromAuthor.pictureUrl}
                                alt="Обложка книги"
                                borderRadius="lg"
                                width="100px"
                              />
                            </Box>
                            <Box as="td" display="table-cell">
                              {exchange.BookFromAuthor.title}
                            </Box>
                            <Box as="td" display="table-cell">
                              <Box
                                display="flex"
                                justifyContent="space-around+"
                              >
                                {submissionStatus[exchange.id] ? (
                                  <Text
                                    bg="whitesmoke"
                                    padding="10px"
                                    borderRadius="20px"
                                  >
                                    {submissionStatus[exchange.id] === "accept"
                                      ? "Принято"
                                      : "Отклонено"}
                                  </Text>
                                ) : (
                                  <>
                                    <Button
                                      size="xs"
                                      fontSize="10px"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "accept"
                                        )
                                      }
                                    >
                                      Подтвердить
                                    </Button>
                                    <Button
                                      size="xs"
                                      fontSize="10px"
                                      onClick={() =>
                                        submitTheExchangeHandler(
                                          exchange.id,
                                          "decline"
                                        )
                                      }
                                    >
                                      Отклонить
                                    </Button>
                                  </>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        )
                    )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box bg="#b3cde0" borderRadius="7px" p="50px" my="10px" w="400px">
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
                <Box as="tbody" display="table-row-group"></Box>
                {exchangeHistoryOutcoming &&
                  exchangeHistoryOutcoming.map(
                    (exchange) =>
                      exchange.status === "Ожидает подтверждения" && (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={exchange.BookFromAuthor.pictureUrl}
                              alt="Обложка книги"
                              borderRadius="lg"
                              width="100px"
                            />
                          </Box>
                          <Box as="td" display="table-cell">
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-between">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="20px"
                                >
                                  {submissionStatus[exchange.id] === "decline"
                                    ? "Отменено"
                                    : `Статус: ${
                                        submissionStatus[exchange.id]
                                      }`}
                                </Text>
                              ) : (
                                <>
                                  <Button
                                    size="xs"
                                    fontSize="10px"
                                    onClick={() =>
                                      submitTheExchangeHandler(
                                        exchange.id,
                                        "status"
                                      )
                                    }
                                  >
                                    Статус
                                  </Button>
                                  <Button
                                    size="xs"
                                    fontSize="10px"
                                    onClick={() =>
                                      submitTheExchangeHandler(
                                        exchange.id,
                                        "decline"
                                      )
                                    }
                                  >
                                    Отменить
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      )
                  )}
              </Box>
            </Box>
          </Box>

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
                {exchangeHistoryIncoming &&
                  exchangeHistoryIncoming.map(
                    (exchange) =>
                      exchange.status === "В процессе" && (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={exchange.BookFromAuthor.pictureUrl}
                              alt="Обложка книги"
                              borderRadius="lg"
                              width="100px"
                            />
                          </Box>
                          <Box as="td" display="table-cell">
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-between">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="20px"
                                >
                                  {submissionStatus[exchange.id] === "accept"
                                    ? "Принято"
                                    : "Обмен завершён"}
                                </Text>
                              ) : (
                                <>
                                  <Button
                                    size="xs"
                                    fontSize="10px"
                                    onClick={() =>
                                      submitTheExchangeHandler(
                                        exchange.id,
                                        "finished"
                                      )
                                    }
                                  >
                                    Завершить
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      )
                  )}
                {exchangeHistoryOutcoming &&
                  exchangeHistoryOutcoming.map(
                    (exchange) =>
                      exchange.status === "В процессе" && (
                        <Box as="tr" display="table-row" key={exchange.id}>
                          <Box as="td" display="table-cell">
                            <Image
                              src={exchange.BookFromAuthor.pictureUrl}
                              alt="Обложка книги"
                              borderRadius="lg"
                              width="100px"
                            />
                          </Box>
                          <Box as="td" display="table-cell">
                            {exchange.BookFromAuthor.title}
                          </Box>
                          <Box as="td" display="table-cell">
                            <Box display="flex" justifyContent="space-between">
                              {submissionStatus[exchange.id] ? (
                                <Text
                                  bg="whitesmoke"
                                  padding="10px"
                                  borderRadius="20px"
                                >
                                  {submissionStatus[exchange.id] === "finished"
                                    ? "Завершен"
                                    : null}
                                </Text>
                              ) : (
                                <>
                                  <Button
                                    size="xs"
                                    fontSize="10px"
                                    onClick={() =>
                                      submitTheExchangeHandler(
                                        exchange.id,
                                        "finished"
                                      )
                                    }
                                  >
                                    Завершить
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      )
                  )}
              </Box>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Закрыть</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
