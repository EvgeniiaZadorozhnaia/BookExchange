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
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function OneCardForFavorites({ book, onDelete }): JSX.Element {
const dispatch = useAppDispatch();
const { user } = useAppSelector((state) => state.authSlice);
const { books } = useAppSelector((state) => state.booksSlice);

const deleteHandler = () => {
  if (book.id) {
    onDelete(book.id);
  }
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5; 

  return (
    <HStack spacing="1px">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={i} color="gold" fontSize="1.2rem" />
      ))}
      {hasHalfStar && <FaStarHalfAlt color="gold" fontSize="1.2rem" />}
      {Array.from({ length: totalStars - fullStars - (hasHalfStar ? 1 : 0) }, (_, i) => (
        <FaRegStar key={fullStars + i + (hasHalfStar ? 1 : 0)} fontSize="1.2rem" />
      ))}
    </HStack>
  );
};

return (
  <Card maxW="sm" m="20px">
    <CardBody>
      <Image h="450px" src={book.pictureUrl} alt="Picture" borderRadius="lg" />
      <Stack mt="4" spacing="2">
        <Heading size="md">{book.title}</Heading>
        <Text>{book.author}</Text>
      </Stack>
    </CardBody>
    <Divider />
    <Box display="flex" justifyContent="space-between" p="6">
      <Text>
        Книга принадлежит {book.Owner?.username}
      </Text>
      Рейтинг владельца
      {book.Owner?.rating ? (
        renderStars(book.Owner?.rating)
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