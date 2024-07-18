import { ChangeEvent, useState, DragEvent } from "react";
import {
  Box,
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
import { CreateBookFormProps } from "../../types/propsTypes";

function CreateBookForm({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  inputsHandler,
  submitHandler,
  inputs,
  setImg,
}: CreateBookFormProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //@ts-ignore
      setImg(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      //@ts-ignore
      setImg(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
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
        <ModalHeader textAlign={'center'}>Создание новой книги</ModalHeader>
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
            <Box
              border="2px"
              borderColor="green.500"
              borderRadius="md"
              textAlign="center"
              py={2}
              cursor="pointer"
              _hover={{ bg: "green.100" }}
              bg={dragOver ? "green.200" : "green.50"}
              color="green.700"
              onClick={() => document.getElementById('pictureUrl')?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              position="relative"
              width="400px"
              height="100px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              {dragOver ? "Отпустите для загрузки" : "Выберите файл"}
              {fileName && (
                <Box mt={2} color="green.900">
                  {fileName}
                </Box>
              )}
            </Box>
            <Input
              type="file"
              id="pictureUrl"
              name="frontpage"
              onChange={handleChangeFile}
              display="none"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            colorScheme="teal"
            variant="outline"
            onClick={(e) => {
              //@ts-ignore
              submitHandler(e);
              onClose();
            }}
          >
            Создать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateBookForm;