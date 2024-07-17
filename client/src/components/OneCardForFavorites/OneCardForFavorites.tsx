import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Box,
  Badge,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { bookOnDeleteProps, starProps } from "../../types/propsTypes";
import { AiOutlineDelete } from "react-icons/ai";
import "animate.css";

function OneCardForFavorites({ book, onDelete }: bookOnDeleteProps): JSX.Element {
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
        color={filled ? "yellow.500" : "gray.300"}
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
    <Card
      className="animate__animated animate__flipInY"
      backgroundColor="#B5C6B8"
      borderRadius="lg"
      border="1px solid #2f855a"
      maxW="sm"
      m="20px"
      _hover={{ transform: "scale(1.02)" }}
    >
      <CardBody>
        <IconButton
          mt="2"
          ml={270}
          position="absolute"
          aria-label="Удалить"
          icon={<Icon as={AiOutlineDelete} />}
          onClick={deleteHandler}
          colorScheme="red"
        />
        <Image
          h={"450px"}
          w={"320px"}
          src={`http://localhost:3000/static/${book.pictureUrl}`}
          alt="Picture"
          borderRadius="lg"
          onClick={() => navigate(`/books/oneBook/${book.id}`)}
          _hover={{ cursor: "pointer" }}
        />

        <Stack mt="4" spacing="2">
          <Text textAlign="center" fontWeight='bold' fontSize={'18px'}>
            {book.title}
          </Text>
          <hr style={{ marginTop: "0px" }}></hr>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="5px" px="5" border={'1px solid green'}>
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
            <Badge borderRadius="5px" px="5" border={'1px solid green'}>
              Владелец
            </Badge>
            <Box
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {book.Owner?.username}
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Badge borderRadius="5px" px="5" border={'1px solid green'}>
              Рейтинг владельца
            </Badge>
            <Box
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
              display="flex"
              alignItems="center"
            >
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
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OneCardForFavorites;
