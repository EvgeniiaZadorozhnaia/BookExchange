import { FormControl, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../../redux/hooks";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

function SearchInput({
  input,
  setInput,
  setSelectedCity,
  setOptions,
  handleSubmit,
  options,
}) {
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
      <form onSubmit={handleSubmit} className="chakra-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Введите текст для поиска"
          className="chakra-input"
        />
        <FormControl>
          <Select placeholder="Выберите город" onChange={handleCityChange}>
            {options.length > 0 &&
              options.map((option) => <option key={option}>{option}</option>)}
          </Select>
        </FormControl>
        <button type="submit" className="chakra-button">
          Искать
        </button>
      </form>
    </>
  );
}

export default SearchInput;
