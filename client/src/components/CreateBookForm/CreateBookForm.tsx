import React, { useState } from 'react';
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


function CreateBookForm({ isOpen, onClose, initialRef, finalRef, inputsHandler, submitHandler, inputs, onOpen, handleDrop}) {
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(true);
  }

  const handleLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  }

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
            <FormLabel className={`form ${dragActive} ? 'drag' : `}>Обложка</FormLabel>
            <Input
              type="file"
              id="pictureUrl"
              name="pictureUrl"
              value={inputs.pictureUrl}
              placeholder="URL обложки"
              onChange={inputsHandler}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleLeave}
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