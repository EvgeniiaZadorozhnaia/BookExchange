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
} from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";

const { VITE_BASE_URL, VITE_API } = import.meta.env;

export default function ProfileModal({
  isOpen,
  onClose,
  exchangeHistoryIncoming,
  exchangeHistoryOutcoming,
}): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [submissionStatus, setSubmissionStatus] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!isOpen) {
      setSubmissionStatus({});
    }
  }, [isOpen]);

  const submitTheExchangeHandler = async (exchangeId, submitType) => {
    try {
      if (submitType === "accept") {
        const { data } = await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/exchanges/${exchangeId}`,
          { status: "processing" }
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
          { status: "declined" }
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
          { status: "finished" }
        );
        await axiosInstance.post(`${VITE_BASE_URL}${VITE_API}/messages`, {
          text: `Обмен с пользователем ${user.username} завершён`,
          authorId: user.id,
          toUser: data.fromUser,
          exchangeId,
        });
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
          <Box bg={"#a4e8af"} borderRadius="7px" padding="50px" margin="10px">
            <Text fontWeight="bold" mb="1rem" textAlign="center">
              Входящие обмены
            </Text>
            {exchangeHistoryIncoming &&
              exchangeHistoryIncoming.map(
                (exchange) =>
                  exchange.status === "pending" && (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      key={exchange.id}
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
                          <Text
                            bg="whitesmoke"
                            padding="10px"
                            borderRadius="20px"
                          >
                            Обмен {exchange.id} с {exchange.Author.username}
                          </Text>
                          <Button
                            onClick={() => {
                              submitTheExchangeHandler(exchange.id, "accept");
                            }}
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Принять
                          </Button>
                          <Button
                            onClick={() => {
                              submitTheExchangeHandler(exchange.id, "decline");
                            }}
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Отклонить
                          </Button>
                        </>
                      )}
                    </Box>
                  )
              )}
          </Box>
          <Box bg={"#b3cde0"} borderRadius="7px" padding="50px" margin="10px">
            <Text fontWeight="bold" mb="1rem" textAlign="center">
              Отправленные обмены
            </Text>
            {exchangeHistoryOutcoming &&
              exchangeHistoryOutcoming.map(
                (exchange) =>
                  exchange.status === "pending" && (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      key={exchange.id}
                    >
                      {submissionStatus[exchange.id] ? (
                        <Text
                          bg="whitesmoke"
                          padding="10px"
                          borderRadius="20px"
                        >
                          {submissionStatus[exchange.id] === "decline"
                            ? "Отменено"
                            : `Статус: ${submissionStatus[exchange.id]}`}
                        </Text>
                      ) : (
                        <>
                          <Text
                            bg="whitesmoke"
                            padding="10px"
                            borderRadius="20px"
                          >
                            Обмен {exchange.id} {exchange.Reciever.username}
                          </Text>
                          <Button
                            onClick={() => {
                              submitTheExchangeHandler(exchange.id, "decline");
                            }}
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Отменить
                          </Button>
                          <Button
                            onClick={() =>
                              submitTheExchangeHandler(exchange.id, "status")
                            }
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Статус
                          </Button>
                        </>
                      )}
                    </Box>
                  )
              )}
          </Box>
          <Box bg={"#a4e8af"} borderRadius="7px" padding="50px" margin="10px">
            <Text fontWeight="bold" mb="1rem" textAlign="center">
              Активные
            </Text>
            {exchangeHistoryIncoming &&
              exchangeHistoryIncoming.map(
                (exchange) =>
                  exchange.status === "processing" && (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      key={exchange.id}
                    >
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
                          <Text
                            bg="whitesmoke"
                            padding="10px"
                            borderRadius="20px"
                          >
                            Обмен {exchange.id} с {exchange.Author.username}
                          </Text>
                          <Button
                            onClick={() => {
                              submitTheExchangeHandler(exchange.id, "finished");
                            }}
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Заврешить
                          </Button>
                        </>
                      )}
                    </Box>
                  )
              )}
            {exchangeHistoryOutcoming &&
              exchangeHistoryOutcoming.map(
                (exchange) =>
                  exchange.status === "processing" && (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      key={exchange.id}
                    >
                      {submissionStatus[exchange.id] ? (
                        <Text
                          bg="whitesmoke"
                          padding="10px"
                          borderRadius="20px"
                        >
                          {submissionStatus[exchange.id] === "decline"
                            ? "Отменено"
                            : `Статус: ${submissionStatus[exchange.id]}`}
                        </Text>
                      ) : (
                        <>
                          <Text
                            bg="whitesmoke"
                            padding="10px"
                            borderRadius="20px"
                          >
                            Обмен {exchange.id} {exchange.Reciever.username}
                          </Text>
                          <Button
                            onClick={() => {
                              submitTheExchangeHandler(exchange.id, "decline");
                            }}
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Отменить
                          </Button>
                          <Button
                            onClick={() =>
                              submitTheExchangeHandler(exchange.id, "status")
                            }
                            size="xs"
                            borderRadius="20px"
                            m={2}
                          >
                            Статус
                          </Button>
                        </>
                      )}
                    </Box>
                  )
              )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
