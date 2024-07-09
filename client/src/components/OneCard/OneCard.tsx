import { Card, CardBody, Image, Stack, Heading } from "@chakra-ui/react";
import { Book } from "../../types/propsTypes";
import { deleteBook } from "../../redux/thunkActions";
import { useAppDispatch } from "../../redux/hooks";
import styles from './OneCard.module.css'

function OneCard({ book }: Book) {
  const dispatch = useAppDispatch();


  const deleteHandler = () => {
    if (book.id) dispatch(deleteBook(book.id));
  };

 

  return (
    <Card className={styles.card} maxW="sm" m='20px' >
      <CardBody>
        <Image h='450px' src={book.pictureUrl} alt="Picture" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{book.title}</Heading>
          <Text>
            Здесь будет аннотация к книге
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justifyContent="space-between" mt="auto">
        <ButtonGroup display="flex" justifyContent="space-between" mt="auto">
          <Button variant="solid" colorScheme="blue">
            Редактировать
          </Button>     
          <Button variant="outline" colorScheme="red" onClick={deleteHandler}>
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default OneCard;


