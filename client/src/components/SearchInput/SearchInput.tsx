import { FormControl, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../../redux/hooks";

function SearchInput({ displayedBooks, setDisplayedBooks }) {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState([]);
  const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;
  const [city, setCity] = useState<string>("");
  const { books } = useAppSelector((state) => state.booksSlice);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  function filterBooks() {
    const filteredBooks = books.filter(
      (book) => book.User.city === city
    );
    console.log('filteredBooks', filteredBooks);
    setDisplayedBooks(filteredBooks);
  }

  useEffect(() => {
    async function getCities() {
      try {
        const { data }: AxiosResponse = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/users/allCities`
        );
        setOptions(() => data);
      } catch (error) {
        console.log(error);
      }
    }
    getCities();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data }: AxiosResponse = await axiosInstance.get(
        `${VITE_BASE_URL}${VITE_API}/books/filteredBooks`,
        {
          params: {
            input,
            city,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="chakra-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите текст для поиска"
          className="chakra-input"
        />
        <button type="submit" className="chakra-button">
          Искать
        </button>
        <FormControl>
          <Select
            placeholder="Выберите город"
            onChange={(e) => {
              handleCityChange(e), filterBooks();
            }}
          >
            {options.length > 0 &&
              options.map((option) => <option>{option}</option>)}
          </Select>
        </FormControl>
      </form>
    </>
  );
}

export default SearchInput;
