import { Card, CardBody, Image, Stack, Heading } from "@chakra-ui/react";
import { Book } from "../../types/propsTypes";

import styles from './OneCard.module.css'

function OneCard({ book }: Book) {
 
  return (
    <Card className={styles.card} maxW="sm" m='20px' >
      <CardBody>
        <Image h='450px' src={book.pictureUrl} alt="Picture" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading className={styles.title} size="md">{book.title} ⭐{book.rating}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OneCard;


