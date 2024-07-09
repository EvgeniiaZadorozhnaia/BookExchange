import { useAppSelector } from "../../redux/hooks";

import OneCard from "../OneCard/OneCard";
import styles from "./ListOfBooks.module.css";
import { displayedBooks } from "../../types/propsTypes";


function ListOfBooks({ displayedBooks }: displayedBooks) {

  return (
    <>
      <div className={styles.list}>
        {displayedBooks.length > 0 &&
          displayedBooks.map((book) => <OneCard key={book.id} book={book} />)}
      </div>
    </>
  );
}

export default ListOfBooks;
