import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

function Reviews({ book }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  
  return (
    
    <div>
      {book?.Review?.length > 0 ? (
        book.Review.map((review) => (
          <div key={review.id}>
            <Flex>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">
                  {book.Owner.username}
                  <Badge ml="1" colorScheme="green">
                    {formatDate(review.createdAt)}
                  </Badge>
                </Text>
                <Text fontSize="sm">{review?.content}</Text>
              </Box>
            </Flex>
          </div>
        ))
      ) : (
        <h1>Отзывов на данную книгу пока нет</h1>
      )}
    </div>
  );
}

export default Reviews;
