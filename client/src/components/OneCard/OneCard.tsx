import { Card, CardBody, Image, Stack, Heading } from "@chakra-ui/react";
import { Book } from "../../types/propsTypes";

import styles from './OneCard.module.css'
import { useNavigate } from "react-router-dom";

function OneCard({ book, isForExchange }: Book) {
  
 const navigate = useNavigate()
  return (
    <Card onClick={() => navigate(`/books/oneBook/${book.id}`)} className={styles.card} maxW="sm" m='20px' >
      <CardBody>
        <Image h={isForExchange ? '400px' : '450px'} src={`/${book.pictureUrl}`} alt="Picture" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading className={styles.title} size="md">{book.title} ⭐{book.rating}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OneCard;


