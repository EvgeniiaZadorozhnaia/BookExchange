import { Button, Flex, FormControl, Input, Select } from "@chakra-ui/react";
import { useEffect } from "react";
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
}: SearchInputType) {
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
            flexGrow={1}
            mr={2}
          />
          <FormControl>
            <Select placeholder="Выберите город" onChange={handleCityChange}>
              {options.length > 0 &&
                options.map((option) => <option key={option}>{option}</option>)}
            </Select>
          </FormControl>
          <Button
            type="submit"
            ml={2}
            minWidth="100px"
            variant="outline"
            colorScheme="purple"
            opacity="0.8"
            _hover={{ bg: "purple.100" }}
          >
            Искать
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default SearchInput;
