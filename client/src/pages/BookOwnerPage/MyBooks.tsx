import {
  Card,
  Text,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
} from "@chakra-ui/react";

export default function MyBooks({ book }): JSX.Element {
  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {book.title}
            </Heading>
            <Text pt="2" fontSize="sm">
              {book.author}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
