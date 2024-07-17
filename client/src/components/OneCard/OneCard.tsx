import { Card, CardBody, Image, Stack, Heading } from "@chakra-ui/react";
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
          <Heading className={styles.title} size="md">
            {book?.title} ⭐{book?.rating}
          </Heading>
          <Heading className={styles.title} size="md">
            Владелец: {book?.Owner?.username}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OneCard;
