import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { formatDate } from "../utils/DateUtils";
import Button from "../components/Button"; 
import Select from "../components/Select"; 

const Dashboard = () => {
  const { getBooks, books, updateBook, deleteBook, loading } = useBooks(true);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const bookToUpdate = books.find((book) => book.id === id);

      if (bookToUpdate) {
        const updatedBook = {
          ...bookToUpdate,
          isActive: !currentStatus,
        };
        await updateBook(id, updatedBook);
        getBooks();
      }
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  const deleteBookById = async (id: string) => {
    await deleteBook(id);
    getBooks();
  };

  const filteredBooks = books.filter((book) => {
    if (filter === "active") return book.isActive;
    if (filter === "deactivated") return !book.isActive;
    return true;
  });

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2 font-semibold">Filter:</label>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: "all", label: "Show All" },
              { value: "active", label: "Show Active" },
              { value: "deactivated", label: "Show Deactivated" },
            ]}
          />
        </div>
        <p className="text-gray-700">
          Showing {filteredBooks.length} of {books.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Edited At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">Loading...</td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className={`text-center border-t ${book.isActive ? "" : "bg-red-100"}`}>
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">{book.category}</td>
                  <td className="border p-2">{book.isbn}</td>
                  <td className="border p-2">{formatDate(book.createdAt)}</td>
                  <td className="border p-2">
                    {book.editedAt ? formatDate(book.editedAt) : "--"}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`edit/${book.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={book.isActive ? "warning" : "success"}
                      onClick={() => handleToggleActive(book.id, book.isActive)}
                    >
                      {book.isActive ? "Deactivate" : "Re-Activate"}
                    </Button>
                    {!book.isActive && (
                      <Button
                        variant="danger"
                        onClick={() => deleteBookById(book.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;