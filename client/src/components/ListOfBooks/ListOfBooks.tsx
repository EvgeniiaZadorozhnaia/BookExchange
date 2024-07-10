import { useAppSelector } from "../../redux/hooks";

import OneCard from "../OneCard/OneCard";
import styles from "./ListOfBooks.module.css";
import { displayedBooks } from "../../types/propsTypes";


function ListOfBooks({ books }) {

  return (
    <>
      <div className={styles.list}>
        {books.length > 0 &&
          books.map((book) => <OneCard key={book.id} book={book} />)}
      </div>
    </>
  );
}

export default ListOfBooks;
