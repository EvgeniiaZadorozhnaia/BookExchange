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
  Badge
} from "@chakra-ui/react";


function OneCardForMyBooks({ book, onEditClick, onDelete }) {

  const deleteHandler = () => {
    if (book.id) {
      onDelete(book.id);
    }
  };

  return (
    <Card maxW="sm" m='20px'>
      <CardBody>
        <Image h='450px' src={`http://localhost:3000/static/${book.pictureUrl}`} alt="Picture" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{book.title}</Heading>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="5" colorScheme="purple">
              Автор
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {book.author}
            </Box>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="5" colorScheme="purple">
              Cтраницы
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {book.pages}
            </Box>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justifyContent="center">
        <ButtonGroup>
          <Button variant="solid" colorScheme="purple" onClick={() => onEditClick(book)}>
            Редактировать
          </Button>
          <Button variant="outline" colorScheme="red" onClick={deleteHandler}>
            Удалить
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default OneCardForMyBooks;
