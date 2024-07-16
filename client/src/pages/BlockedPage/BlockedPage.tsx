import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useDisclosure,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/thunkActions";

const BlockedPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose();
    dispatch(logoutUser());
    localStorage.removeItem("user");
  };

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="green.50"
        color="green.800"
        borderRadius="md"
        boxShadow="lg"
        p={6}
      >
        <ModalHeader
          textAlign="center"
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="bold"
          color="green.900"
        >
          Доступ заблокирован
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="center">
            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
              Ваш аккаунт заблокирован. <br /> Пожалуйста, свяжитесь с
              администрацией для получения дополнительной информации. <br />
              Электронная почта: <b>eu.skorobogatowa@gmail.com</b>
            </Text>
            <Button
              colorScheme="green"
              variant="solid"
              onClick={handleClose}
              size="lg"
              color="white"
              bg="green.500"
              _hover={{ bg: "green.600" }}
            >
              Закрыть
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BlockedPage;
