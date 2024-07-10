import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

function Reviews({ reviews }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <Flex>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">
                  {review.User.username}
                  <Badge ml="1" colorScheme="green">
                    {formatDate(review.createdAt)}
                  </Badge>
                </Text>
                <Text fontSize="sm">UI Engineer</Text>
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
