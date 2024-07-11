import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFavoriteBooks } from "../../redux/thunkActions";


function FavoritesPage() {
    const { books } = useAppSelector((state) => state.booksSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getFavoriteBooks());
      }, []);

    return (
        <div>
            
        </div>
    );
}

export default FavoritesPage;