import { StarIcon } from "@chakra-ui/icons";
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
import { useNavigate } from "react-router-dom";
import { starProps } from "../../types/propsTypes";


function OneCardForFavorites({ book, onDelete }): JSX.Element {
  const navigate = useNavigate();

  const deleteHandler = () => {
    if (book.id) {
      onDelete(book.id);
    }
  };

  const Star = ({ filled, partial }: starProps) => (
    <Box
      position="relative"
      width="24px"
      height="24px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StarIcon
        color={filled ? "yellow.400" : "gray.300"}
        boxSize="24px"
        position="absolute"
      />
      {partial > 0 && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          overflow="hidden"
          zIndex={1}
        >
          <StarIcon
            color="yellow.400"
            boxSize="24px"
            sx={{
              clipPath: `inset(0 ${100 - partial}% 0 0)`,
            }}
          />
        </Box>
      )}
    </Box>
  );

  return (
    <Card maxW="sm" m="20px">
      <CardBody>
        <Image
          h="450px"
          src={book.pictureUrl}
          alt="Picture"
          borderRadius="lg"
          onClick={() => navigate(`/books/oneBook/${book.id}`)}
        />
        <Stack mt="4" spacing="2">
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
              Владелец
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {book.Owner?.username}
            </Box>
          </Box>
      <Box display="flex" justifyContent="space-between" p="6">
        <Box display="flex" alignItems="center">
          <Badge borderRadius="full" px="5" colorScheme="purple">
            Рейтинг владельца
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box display="flex" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => {
                  const isFull = i < Math.floor(book.Owner?.rating);
                  const isPartial =
                    i === Math.floor(book.Owner?.rating) &&
                    book.Owner?.rating % 1 > 0;
                  const partialPercentage = isPartial
                    ? (book.Owner?.rating % 1) * 100
                    : 0;

                  return (
                    <Star
                      key={i}
                      filled={isFull}
                      partial={isPartial ? partialPercentage : 0}
                    />
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
        </Stack>
      </CardBody>
      
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