import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { Book } from "../interfaces/IBook";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import InputMask from "../components/InputMask";

const AddBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, book, addBook, updateBook } = useBooks();

  const [formData, setFormData] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    category: "",
    isbn: "",
    createdAt: new Date().toISOString(),
    editedAt: null,
    isActive: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      getBookById(id);
    }
  }, [id]);
  console.log('ss')
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        isbn: book.isbn,
        createdAt: book.createdAt,
        editedAt: new Date().toISOString(),
        isActive: book.isActive,
      });
    }
  }, [book]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    } else if (!/^\d{3}-\d{1}-\d{2}-\d{6}-\d{1}$/.test(formData.isbn)) {
      newErrors.isbn =
        "ISBN is not valid. It should follow the pattern 999-9-99-999999-9";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (id) {
      await updateBook(id, formData as Book);
    } else {
      await addBook(formData);
    }
    navigate(-1);
  };

  const handleIsbnChange = (value: string) => {
    setFormData({ ...formData, isbn: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Book" : "Add a Book"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow-md rounded-lg max-w-[450px] mx-auto"
      >
        <Input
          label="Title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="Enter title"
        />
        <Input
          label="Author"
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          error={errors.author}
          placeholder="Enter author"
        />
        <Select
          label="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          options={[
            { value: "", label: "Select Category" },
            { value: "Classic", label: "Classic" },
            { value: "Sci-Fi", label: "Sci-Fi" },
            { value: "Fantasy", label: "Fantasy" },
          ]}
          error={errors.category}
        />
        <div>
          <label className="block font-semibold mb-1">ISBN</label>
          <div className={errors.isbn ? "border-red-500" : ""}>
            <InputMask
              value={formData.isbn}
              onChange={(e) => handleIsbnChange(e.target.value)}
              error={errors.isbn} 
            />
          </div>
        </div>
        <Button type="submit" variant="primary">
          {id ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBook;
