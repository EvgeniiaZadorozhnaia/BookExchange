import { 
    Card, 
    CardBody, 
    Image, 
    Stack, 
    Heading, 
    Text, 
    Divider, 
    CardFooter, 
    ButtonGroup, 
    Button, 
    Box,
    HStack
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaStar } from "react-icons/fa"; // для иконки звезды

function OneCardForFavorites({ book, onDelete }): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const { books } = useAppSelector((state) => state.booksSlice);

  const deleteHandler = () => {
    if (book.id) {
      onDelete(book.id);
    }
  };

  const renderStars = (rating) => {
    return (
      <HStack spacing="1px">
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} color="gold" fontSize="1.2rem" />
        ))}
      </HStack>
    );
  };

  return (
    <Card maxW="sm" m="20px">
      <CardBody>
        <Image h="450px" src={book.pictureUrl} alt="Picture" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{book.title}</Heading>
          <Text>Здесь будет аннотация к книге</Text>
        </Stack>
      </CardBody>
      <Divider />
      <Box display="flex" justifyContent="space-between" p="8">
        <Text>
          Книга принадлежит {books[0].Owner?.username}
        </Text>
        Рейтинг владельца
        {books[0].Owner?.rating ? (
          renderStars(books[0].Owner?.rating)
        ) : null}
      </Box>
      <Divider />
      <CardFooter display="flex" justifyContent="center">
        <ButtonGroup>
          <Button variant="outline" colorScheme="red" onClick={deleteHandler}>
            Удалить
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default OneCardForFavorites;