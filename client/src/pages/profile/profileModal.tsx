// ProfileModal.tsx

import {
  ModalHeader,
  ModalBody,
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal,
  ModalFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useAppSelector } from "../../redux/hooks";
const { VITE_BASE_URL, VITE_API } = import.meta.env;

export default function ProfileModal({
  isOpen,
  onClose,
  exchangeHistoryIncoming,
  exchangeHistoryOutcoming,
  activeStatusIncomeExchange,
  activeStatusOutcomeExchange,
}): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display='flex' justifyContent="center" padding='40px'>Моя история обменов</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box bg={"#a4e8af"} borderRadius='7px' padding='50px' margin='10px'>
            <Text fontWeight="bold" mb="1rem" textAlign='center'>
              Входящие обмены
            </Text>
            {exchangeHistoryIncoming && (
              <Text>Всего: {exchangeHistoryIncoming.length}</Text>
            )}
            {activeStatusIncomeExchange && (
              <Text>Активные: {activeStatusIncomeExchange.length}</Text>
            )}
            {activeStatusOutcomeExchange && (
              <Text>
                Завершенные:{" "}
                {exchangeHistoryIncoming.length -
                  activeStatusIncomeExchange.length}
              </Text>
            )}
          </Box>
          <Box bg={"#b3cde0"} borderRadius='7px' padding='50px' margin='10px'>
          <Text fontWeight="bold" mb="1rem">
            Исходящие обмены
          </Text>
          {exchangeHistoryOutcoming && (
            <Text>Всего: {exchangeHistoryOutcoming.length}</Text>
          )}{" "}
          {activeStatusOutcomeExchange && (
            <Text>Активные: {activeStatusOutcomeExchange.length}</Text>
          )}
          {activeStatusOutcomeExchange && (
            <Text>
              Завершенные:{" "}
              {exchangeHistoryOutcoming.length -
                activeStatusOutcomeExchange.length}
            </Text>
          )}
           </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
