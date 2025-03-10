import { useCallback, useEffect, useState } from "react";
import { Book } from "../interfaces/IBook";
import {
  addBookToDb,
  deleteBookApi,
  getBookByIdFromDb,
  getBooksFromDb,
  updateBookApi,
} from "../services/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const useBooks = (onLoad = false) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(true);
  const notify = (message: string, type: "success" | "error" = "success") => {
    toast[type](message);
  };

  const getBooks = useCallback(async () => {
    try {
      setLoading(true);
      await getBooksFromDb()
        .then(setBooks)
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }, []);
  const addBook = async (book: Omit<Book, "id">) => {
    try {
      await addBookToDb(book);
      notify("Book added successfully!");
    } catch (error) {
      notify("Error adding book", "error");
      console.log(error);
    }
  };

  const getBookById = async (id: string) => {
    try {
      const data = await getBookByIdFromDb(id);
      setBook(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateBook = async (id: string, book: Book) => {
    try {
      await updateBookApi(id, book);
      notify("The book has been successfully updated!");
    } catch (error) {
      console.log(error);
      notify("Error updating book", "error");
    }
  };

  const deleteBook = async (id: string) => {
    try {
      notify("Book successfully deleted!");
      await deleteBookApi(id);
    } catch (error) {
      notify("Error deleting book", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    if (onLoad) {
      getBooks();
    }
  }, [getBooks, onLoad]);

  return {
    getBooks,
    books,
    addBook,
    getBookById,
    book,
    updateBook,
    loading,
    deleteBook,
  };
};

export default useBooks;
