import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, CircularProgress } from "@chakra-ui/react";
import { cardInfoProps, starProps } from "../../types/propsTypes";

function CardInfo({ book, description }: cardInfoProps): JSX.Element {
  const Star = ({ filled, partial }: starProps) => (
    <Box position="relative" display="inline-block" width="24px" height="24px">
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
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        display="grid"
        gridTemplateColumns="1fr 3fr"
        gap={4}
        m="20px"
      >
        <Box p="6">
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
          <p></p>
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
          <p></p>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h6"
            lineHeight="tight"
            noOfLines={1}
          >
            {book.title}
          </Box>
          <p></p>
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => {
                const isFull = i < Math.floor(book.rating);
                const isPartial =
                  i === Math.floor(book.rating) && book.rating % 1 > 0;
                const partialPercentage = isPartial
                  ? (book.rating % 1) * 100
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
        <Box borderWidth="1px" borderRadius="lg" boxShadow="2xl" bg="purple.50">
          {description ? (
            <Box
              height="100%"
              lineHeight="tight"
              noOfLines={7}
              overflowY="auto"
              pr="20px"
              textAlign="justify"
              bgImage="url('https://media.istockphoto.com/id/1344709514/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%82%D0%B0%D1%80%D1%8B%D0%B9-%D1%81%D0%BC%D1%8F%D1%82%D1%8B%D0%B9-%D0%B1%D1%83%D0%BC%D0%B0%D0%B6%D0%BD%D1%8B%D0%B9-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%83%D1%80%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD.jpg?s=2048x2048&w=is&k=20&c=JdbS-JcDcvnzPf_SuKHu9pfCMY2v6JEHMX0ycBs3GSQ=')"
              bgSize="cover"
              bgRepeat="repeat"
              color="black"
              p="20px"
              borderRadius="8px"
              border="1px solid #ccc"
              boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
            >
              <b>{description}</b>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress isIndeterminate color="purple.400" />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CardInfo;
