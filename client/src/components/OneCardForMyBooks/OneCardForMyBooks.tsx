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
  Button 
} from "@chakra-ui/react";


// Component for displaying individual book card
function OneCardForMyBooks({ book, onEditClick, onDelete }) {

  const deleteHandler = () => {
    if (book.id) {
      onDelete(book.id);
    }
  };

  return (
    <Card maxW="sm" m='20px'>
      <CardBody>
        <Image h='450px' src={book.pictureUrl} alt="Picture" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{book.title}</Heading>
          <Text>Здесь будет аннотация к книге</Text>
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
