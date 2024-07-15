import { Button, Flex, FormControl, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { SearchInputType } from "../../types/propsTypes";

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
    <>
      <form onSubmit={handleSubmit}>
        <Flex align="center">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ключевые слова"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={{
              borderColor: isActive ? "#2f855a" : "initial",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            flexGrow={1}
            mr={2}
          />
          <FormControl>
            <Select
              placeholder="Выберите город"
              onChange={handleCityChange}
              borderWidth="1px"
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
            bg="#2f855a"
            color="white"
            borderRadius="8px"
            border="2px solid #2f855a"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            _hover={{
              bg: "rgba(56, 161, 105, 0.9)",
              boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
            }}
            _active={{
              bg: "#276749",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
            _focus={{ boxShadow: "0 0 0 3px rgba(0, 255, 0, 0.3)" }}
          >
            Искать
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default SearchInput;
