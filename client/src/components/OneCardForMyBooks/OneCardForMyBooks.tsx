import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Badge,
} from "@chakra-ui/react";

function OneCardForMyBooks({ book, onEditClick, onDelete }) {
  const deleteHandler = () => {
    if (book.id) {
      onDelete(book.id);
    }
  };

  return (
    <Card
      backgroundColor="#B5C6B8"
      borderRadius="lg"
      border="1px solid #2f855a"
      maxW="sm"
      m="20px"
    >
      <CardBody>
        <Image
          h="450px"
          src={`http://localhost:3000/static/${book.pictureUrl}`}
          alt="Picture"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{book.title}</Heading>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="5">
              Автор
            </Badge>
            <Box
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
            <Badge borderRadius="full" px="5">
              Cтраницы
            </Badge>
            <Box
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
          <Button
            mr={2}
            mb={2}
            variant="outline"
            colorScheme="green"
            opacity="0.8"
            _hover={{ bg: "green.100" }}
            onClick={() => onEditClick(book)}
          >
            Редактировать
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            opacity="0.8"
            _hover={{ bg: "red.100" }}
            onClick={deleteHandler}
          >
            Удалить
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default OneCardForMyBooks;
