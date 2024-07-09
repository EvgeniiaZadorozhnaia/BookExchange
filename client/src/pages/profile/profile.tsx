import "./profile.css";
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Input,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
const { VITE_BASE_URL, VITE_API } = import.meta.env;

export default function Profile(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [inputs, setInputs] = useState({
    text: "",
    authorId: 0,
    toUser: 0,
    exchangeId: 0,
  });
  const [messages, setMessages] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [activeExchange, setActiveExchange] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  
  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && activeExchange && activeUser) {
      const newMessage = {
        text: inputs.text,
        authorId: user.id,
        toUser: activeUser,
        exchangeId: activeExchange,
        createdAt: new Date().toISOString(),
        Author: {
          username: user.username,
          avatarUrl: user.avatarUrl,
          createdAt: new Date().toISOString(),
        },
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputs({ text: "", authorId: 0, toUser: 0, exchangeId: 0 });

      await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/messages`,
        newMessage
      );
    }
  };

  const fetchMessagesForExchange = async (exchangeId) => {
    const { data } = await axiosInstance.get(
      `${VITE_BASE_URL}${VITE_API}/messages/${user.id}/exchange/${exchangeId}`
    );
    
    console.log('exchangeId текущего чата', exchangeId);
    
    setMessages(data)
    
  };
  console.log(exchanges);
  useEffect((): void => {
    const fetchInitialData = async () => {
      const { data } = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/exchanges/${user.id}`
      );
      setExchanges(data);
      
      if (data.length > 0) {
        setActiveExchange(data[0].id);
        setActiveUser(data[0].Author.id);
        fetchMessagesForExchange(data[0].id);
      }
    };
    fetchInitialData();
  }, [user.id]);  

  const handleExchangeClick = (exchangeId, authorId) => {
    setActiveExchange(exchangeId);
    setActiveUser(authorId);
    fetchMessagesForExchange(exchangeId);
  };

  return (
    <>
      <div className="profile-top">
        <Text
          style={{
            backgroundColor: "#D8BFD8",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          Мой рейтинг: ⭐ 4.8
        </Text>
        <Image
          borderRadius="full"
          boxSize="80px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </div>
      <Box display="flex" justifyContent="space-around" mt={4}>
        <Button
          style={{
            backgroundColor: "#D8BFD8",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Входящие
        </Button>
        <Button
          style={{
            backgroundColor: "#D8BFD8",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Исходящие
        </Button>
      </Box>
      <Box
        border="solid 1px"
        borderRadius="7px"
        mt={8}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        p={4}
      >
        <Grid h="500px" templateColumns="repeat(5, 1fr)" gap={2}>
          <GridItem colSpan={1} width="150px" margin="10px">
            {exchanges &&
              exchanges.map((exchange) => (
                <Tag
                  key={exchange.id}
                  size="lg"
                  borderRadius="full"
                  margin="10px"
                  cursor="pointer"
                  bg={exchange.id === activeExchange ? "teal.300" : "gray.200"}
                  onClick={() =>
                    handleExchangeClick(exchange.id, exchange.Author.id)
                  }
                >
                  <Avatar src={exchange.Author.avatarUrl} size="xs" mr={4} />
                  <TagLabel>{exchange.Author.username}</TagLabel>
                </Tag>
              ))}
          </GridItem>
          <GridItem
            colSpan={4}
            bg="whitesmoke"
            display="flex"
            flexDirection="column"
            p={4}
            borderRadius="7px"
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                alignSelf={
                  message.authorId === user.id ? "flex-end" : "flex-start"
                }
                bg={message.authorId === user.id ? "#c2e9a8" : "#b3cde0"}
                p={4}
                borderRadius="7px"
                mb={2}
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              >
                <Tag size="lg" borderRadius="full" marginBottom="5px">
                  <Avatar
                    src={
                      message.authorId === user.id
                        ? user.avatarUrl
                        : message.Author.avatarUrl
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
                <Text>{message.text}</Text>
                <span style={{ fontSize: "0.8em", opacity: 0.7 }}>
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </Box>
            ))}
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
      <Button
        style={{
          backgroundColor: "#D8BFD8",
          padding: "20px",
          margin: "20px",
          width: "400px",
          height: "50px",
          borderRadius: "7px",
          justifyContent: "center",
        }}
      >
        История обменов
      </Button>
    </>
  );
}
