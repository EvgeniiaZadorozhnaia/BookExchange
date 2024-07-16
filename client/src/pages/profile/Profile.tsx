import "./profile.css";
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../../axiosInstance";
import ProfileModal from "./profileModal";
import Weather from "../../components/Weather/Weather";
const { VITE_BASE_URL, VITE_API } = import.meta.env;
import Calendar from "./Calendar";
import { Exchange, Message } from "../../types/stateTypes";
import "animate.css";

export default function Profile(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [inputs, setInputs] = useState({
    text: "",
    authorId: 0,
    toUser: 0,
    exchangeId: 0,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [activeExchange, setActiveExchange] = useState<number | null>(null);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [incomeOrOutcome, setIncomeOrOutcome] = useState("outcome");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exchangeHistoryIncoming, setExchangeHistoryIncoming] = useState();
  const [exchangeHistoryOutcoming, setExchangeHistoryOutcoming] = useState();
  const [activeStatusIncomeExchange, setActiveStatusIncomeExchange] =
    useState();
  const [activeStatusOutcomeExchange, setActiveStatusOutcomeExchange] =
    useState();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const fetchExchangeHistory = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/exchanges/history/${user.id}`
      );
      setActiveStatusOutcomeExchange(
        data.exchangesOutcoming.filter(
          (el: Exchange) =>
            el.status === "pending" || el.status === "processing"
        )
      );
      setActiveStatusIncomeExchange(
        data.exchangesIncoming.filter(
          (el: Exchange) =>
            el.status === "pending" || el.status === "processing"
        )
      );
      setExchangeHistoryIncoming(data.exchangesIncoming);
      setExchangeHistoryOutcoming(data.exchangesOutcoming);
    } catch (error) {
      console.error("Ошибка при получении истории обменов:", error);
    }
  };
  useEffect(() => {
    if (isOpen) {
      fetchExchangeHistory();
    }
  }, [isOpen]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleKeyDown = async (e: { key: string }) => {
    if (e.key === "Enter" && activeExchange && activeUser) {
      const newMessage = {
        text: inputs.text,
        authorId: user.id,
        toUser: activeUser,
        exchangeId: activeExchange,
        createdAt: new Date().toISOString(),
        Author: {
          username: user.username,
          avatarUrl: user?.avatarUrl,
          createdAt: new Date().toISOString(),
        },
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputs((prev) => ({ ...prev, text: "" }));

      try {
        await axiosInstance.post(
          `${VITE_BASE_URL}${VITE_API}/messages`,
          newMessage
        );
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    }
  };

  const fetchMessagesForExchange = async (exchangeId: number) => {
    try {
      const { data } = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/messages/${user.id}/exchange/${exchangeId}`
      );
      setMessages(data);
    } catch (error) {
      console.error("Ошибка при загрузке сообщений:", error);
    }
  };

  const fetchExchanges = useCallback(async () => {
    try {
      const { data: incomingExchanges } = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/exchanges/incoming/${user.id}`
      );
      const { data: outgoingExchanges } = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/exchanges/outcoming/${user.id}`
      );

      if (incomeOrOutcome === "income") {
        setExchanges(incomingExchanges);
        if (incomingExchanges.length > 0) {
          setActiveExchange(incomingExchanges[0].id);
          setActiveUser(incomingExchanges[0].Author.id);
          fetchMessagesForExchange(incomingExchanges[0].id);
        }
      } else {
        setExchanges(outgoingExchanges);

        if (outgoingExchanges.length > 0) {
          setActiveExchange(outgoingExchanges[0].id);
          setActiveUser(outgoingExchanges[0].Reciever.id);
          fetchMessagesForExchange(outgoingExchanges[0].id);
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке обменов сообщениями:", error);
    }
  }, [incomeOrOutcome, user.id]);

  useEffect(() => {
    fetchExchanges();
  }, [fetchExchanges]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleExchangeClick = (exchangeId: number, userId: number) => {
    setActiveExchange(exchangeId);
    setActiveUser(userId);
    fetchMessagesForExchange(exchangeId);
  };

  return (
    <>
      <Grid templateColumns="1fr 1fr" gap={4}>
        {/* Левая колонка с чатом */}
        <GridItem>
          <Box display="flex" justifyContent="space-around" mt={10} ml="10">
            <Button
              onClick={() => setIncomeOrOutcome("income")}
              style={{
                backgroundColor:
                  incomeOrOutcome === "income" ? "#B5C6B8" : "initial",
                padding: "10px",
                width: "200px",
                borderRadius: "20px",
                border: "solid 1px grey",
              }}
            >
              Отдать
            </Button>
            <Button
              onClick={() => setIncomeOrOutcome("outcome")}
              style={{
                backgroundColor:
                  incomeOrOutcome === "outcome" ? "#B5C6B8" : "initial",
                padding: "10px",
                width: "200px",
                borderRadius: "20px",
                border: "solid 1px grey",
              }}
            >
              Забрать
            </Button>
          </Box>

          <Box
            border="solid 1px"
            borderRadius="7px"
            mt="67px"
            mr="12"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            p={1}
          >
            <Grid h="500px" templateColumns="repeat(5, 1fr)" gap={2}>
              <GridItem colSpan={1} width="150px" margin="5px">
                {exchanges &&
                  exchanges.map((exchange) => (
                    <Tag
                      key={exchange.id}
                      width="150px"
                      borderRadius="full"
                      margin="5px"
                      cursor="pointer"
                      bg={
                        exchange.id === activeExchange ? "teal.300" : "gray.200"
                      }
                      onClick={() => {
                        const userId =
                          incomeOrOutcome === "income"
                            ? exchange.Author.id
                            : exchange.Reciever.id;
                        handleExchangeClick(exchange.id, userId);
                      }}
                    >
                      <TagLabel>
                        {incomeOrOutcome === "income"
                          ? exchange.Author.username
                          : exchange.Reciever.username}{" "}
                        Обмен №{exchange.id}
                      </TagLabel>
                    </Tag>
                  ))}
              </GridItem>
              <GridItem
                colSpan={4}
                bg="#f2f3f4"
                display="flex"
                flexDirection="column"
                p={4}
                borderRadius="7px"
                className="message-container"
                ref={messageContainerRef}
              >
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <Box
                      className="animate__animated animate__fadeInRight"
                      key={message.id}
                      alignSelf={
                        message.authorId === user.id ? "flex-end" : "flex-start"
                      }
                      bg={message.authorId === user.id ? "#a4e8af" : "#b3cde0"}
                      p={4}
                      borderRadius="7px"
                      mb={2}
                      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                    >
                      <Tag size="lg" borderRadius="full" marginBottom="5px">
                        <Avatar
                          src={
                            message.authorId === user.id
                              ? `http://localhost:3000/static/${user.avatarUrl}`
                              : `http://localhost:3000/static/${message.Author.avatarUrl}`
                          }
                          size="xs"
                          mr={2}
                        />
                        <TagLabel>
                          {message.authorId === user.id
                            ? user.username
                            : message.Author.username}
                        </TagLabel>
                      </Tag>
                      <Text margin="5px">{message.text}</Text>
                      <span style={{ fontSize: "0.8em", opacity: 0.7 }}>
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </Box>
                  ))
                ) : (
                  <Text>Начните обмениваться сообщениями!</Text>
                )}
              </GridItem>
            </Grid>
            <Box mt={4}>
              <Input
                size="lg"
                placeholder="Введите сообщение"
                name="text"
                value={inputs.text}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
              />
            </Box>
          </Box>
        </GridItem>

        {/* Правая колонка с погодой */}
        <GridItem>
          <Box>
            {" "}
            <Text
              display={"flex"}
              justifyContent={"center"}
              fontWeight={"bold"}
              borderRadius={"20px"}
              mt="20px"
            >
              Прогноз погоды
            </Text>
            <Weather />
            <Calendar />
          </Box>
        </GridItem>
      </Grid>
      <Button
        onClick={onOpen}
        backgroundColor="#B5C6B8"
        mt="50px"
        width="400px"
        height="50px"
        borderRadius="7px"
        justifyContent="center"
        colorScheme="green"
        bg="#2f855a"
        color="white"
        border="2px solid #2f855a"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        _hover={{
          bg: "rgba(56, 161, 105, 0.9)",
          boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
        }}
        _active={{
          bg: "#276749",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
        _focus={{ boxShadow: "0 0 0 3px rgba(0, 255, 0, 0.3)" }}
      >
        Моя история обменов
      </Button>
      <ProfileModal
        isOpen={isOpen}
        onClose={onClose}
        exchangeHistoryIncoming={exchangeHistoryIncoming}
        exchangeHistoryOutcoming={exchangeHistoryOutcoming}
        activeStatusIncomeExchange={activeStatusIncomeExchange}
        activeStatusOutcomeExchange={activeStatusOutcomeExchange}
      />
    </>
  );
}
