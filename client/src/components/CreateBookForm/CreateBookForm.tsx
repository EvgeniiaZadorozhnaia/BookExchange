import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

function CreateBookForm({ isOpen, onClose, initialRef, finalRef, inputsHandler, submitHandler, inputs, setInputs, img, setImg }) {
  const [dragActive, setDragActive] = useState(false);
  

  const handleChangeFile = (e) => {
    if (e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создай книгу</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Название</FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              value={inputs.title}
              placeholder="Название"
              onChange={inputsHandler}
            />
            <FormLabel>Автор</FormLabel>
            <Input
              type="text"
              id="author"
              name="author"
              value={inputs.author}
              placeholder="Автор книги"
              onChange={inputsHandler}
            />
            <FormLabel>Количество страниц</FormLabel>
            <Input
              type="number"
              id="pages"
              name="pages"
              value={inputs.pages}
              placeholder="Количество страниц"
              onChange={inputsHandler}
            />
            <FormLabel>Обложка</FormLabel>
            <Input
                type="file"
                id="pictureUrl"
                name="frontpage"
                onChange={handleChangeFile}
              />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="teal" variant="outline" onClick={(e) => { submitHandler(e); onClose(); }}>
            Создать книгу
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateBookForm;