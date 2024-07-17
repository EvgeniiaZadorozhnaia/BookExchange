import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";
import { BookProps } from "../../types/propsTypes";

import styles from "./OneCard.module.css";
import { useNavigate } from "react-router-dom";

function OneCard({ book, isForExchange }: BookProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <Card className={styles.card} maxW="sm" m="20px">
      <CardBody
        backgroundColor="#B5C6B8"
        borderRadius="lg"
        border="1px solid #2f855a"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Image
          h={isForExchange ? "340px" : "450px"}
          w={"320px"}
          src={`http://localhost:3000/static/${book.pictureUrl}`}
          alt="Picture"
          borderRadius="lg"
          onClick={() => navigate(`/books/oneBook/${book.id}`)}
        />
        <Stack mt="6" spacing="3">
          {book?.rating ? (
            <Text
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight:'bold',
                fontSize:'18px'
              }}
            >
              <span>{book?.title}</span>
              <span
                style={{
                  textShadow: "black 1px 0 10px",
                  marginLeft: "5px",
                }}
              >
                ⭐
              </span>
              <span style={{marginLeft: "5px"}}>{book?.rating}</span>
            </Text>
          ) : (
            <Heading className={styles.title} size="md">
              {book?.title} ⭐0
            </Heading>
          )}
          <Text className={styles.title} fontSize="15px">
            Владелец: {book?.Owner?.username}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OneCard;
