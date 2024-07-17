import { Button, Flex, FormControl, Input, Select } from "@chakra-ui/react";
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
    <>
      <form style={{margin:'30px 0px 85px 0px'}} onSubmit={handleSubmit}>
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
    </>
  );
}

export default SearchInput;
