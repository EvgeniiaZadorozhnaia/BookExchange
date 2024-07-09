import { FormControl, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../../redux/hooks";

const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

function SearchInput({ displayedBooks, setDisplayedBooks }) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState<string>("");
  const { books } = useAppSelector((state) => state.booksSlice);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  function filterBooks() {
    let filteredBooks = books;
    if (input) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(input.toLowerCase()) ||
          book.author.toLowerCase().includes(input.toLowerCase())
      );
    }
    if (city) {
      filteredBooks = filteredBooks.filter((book) => book.User.city === city);
    }
    if (city === "") {
      setDisplayedBooks(books);
    }
    setDisplayedBooks(filteredBooks);
  }

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterBooks();
    setCity("");
  };

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
              options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
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
