import { displayedBooks } from "../../types/propsTypes";

import OneCard from "../OneCard/OneCard";
import styles from "./ListOfBooks.module.css";

function ListOfBooks({ books }: displayedBooks): JSX.Element {

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
