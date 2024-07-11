import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, CircularProgress } from "@chakra-ui/react";

function CardInfo({ book, description }) {
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        display="grid"
        gridTemplateColumns="1fr 2fr"
        gap={4}
        m="20px"
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
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
          <p></p>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
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
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {book.title}
          </Box>
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < book.rating ? "yellow.400" : "gray.300"} // Золотой цвет для звездочек
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {book.rating}
            </Box>
          </Box>
        </Box>
        <Box
          p="6"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg="purple.50"
        >
          {description ? (
            <Box
              as="p"
              lineHeight="tight"
              noOfLines={5}
              overflowY="auto"
              maxHeight="100px"
              marginBottom={0}
            >
              {description}
            </Box>
          ) : (
            <CircularProgress isIndeterminate color="purple.400" />
          )}
        </Box>
      </Box>
    </>
  );
}

export default CardInfo;
