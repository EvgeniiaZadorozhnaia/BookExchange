import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBooks } from "../../redux/thunkActions";
import OneCard from "../../components/OneCard/OneCard";

function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const { books } = useAppSelector((state) => state.booksSlice);

  useEffect(() => {
    dispatch(getBooks());
  });

  console.log(books);
  
  return (
    <div>
      {books.length > 0 &&
        books.map((book) => <OneCard key={book.id} book={book} />)}
    </div>
  );
}

export default HomePage;
