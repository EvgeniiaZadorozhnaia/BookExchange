import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { SearchInputType } from "../../types/propsTypes";
import styles from "./SearchInput.module.css";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

function SearchInput({
  input,
  setInput,
  setSelectedCity,
  setOptions,
  handleSubmit,
  options,
}: SearchInputType): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  console.log(options);

  const handleInputFocus = () => setIsActive(true);
  const handleInputBlur = () => setIsActive(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    async function getCities() {
      try {
        const { data }: AxiosResponse = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/users/allCities`
        );
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCities();
  }, []);

  return (
    <Flex direction="column" align="center" mt={"30px"} mb={"70px"}>
      <Flex alignItems={"center"}>
        <img
          src="414cdba238d90ed74731955009d33f42_360.gif"
          alt="Animated GIF"
          style={{
            width: "50px",
            height: "50px",
            marginBottom: "25px",
            marginRight:'20px'
          }}
        />
        <Text
          textShadow="1px 0 2px black"
          fontSize="50px"
          fontWeight="bold"
          color="green.500"
        >
          BookExchange
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <Flex align="center">
          <Input
            className={styles.placeholder}
            type="text"
            color="black"
            value={input}
            onChange={handleInputChange}
            placeholder="Ключевые слова"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={{
              borderColor: isActive ? "#2f855a" : "black",
              border: "1px solid black",
            }}
            flexGrow={1}
            mr={2}
          />
          <FormControl color="black">
            <Select
              placeholder="Выберите город"
              onChange={handleCityChange}
              border="1px solid black"
              borderRadius="md"
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px green.500",
              }}
              _active={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px green.500",
              }}
            >
              {options.length > 0 &&
                options.map((option) => (
                  <option key={option.id} value={option}>
                    {option}
                  </option>
                ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            ml={2}
            minWidth="120px"
            height="40px"
            variant="solid"
            colorScheme="green"
          >
            Искать
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchInput;
