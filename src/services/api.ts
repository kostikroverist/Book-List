import { Book } from "../interfaces/IBook";

const API_URL = "http://localhost:5000/books";

const request = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("API request failed");
  return response.json();
};

export const getBooksFromDb = () => request(API_URL);

export const addBookToDb = (book: Omit<Book, "id" | "createdAt" | "editedAt">) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

export const getBookByIdFromDb = (id: string) => request(`${API_URL}/${id}`);

export const updateBookApi = (id: string, book: Book) =>
  request(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });


export const deleteBookApi = (id: string) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });