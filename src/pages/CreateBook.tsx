import styles from '../styles/CreateBook.module.css'
import {useState} from "react";
import {useLocation} from "react-router-dom";
import * as React from "react";

interface BookFormProps {
    initialBook?: Book;
}

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    active: boolean;
}

const CreateBook: React.FC<BookFormProps> = ()=> {

    const categories = ["Fiction", "Non-Fiction", "Science", "History"];
    const location = useLocation();
    const initialBook: Book = location.state?.initialBook;
    const [book, setBook] = useState<Book>(
        initialBook || { title: "", author: "", category: "", isbn: "" }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!book.title || !book.author || !book.category || !book.isbn) {
            alert("Please fill in all fields");
            return;
        }

        const newPost = {
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
            isbn: book.isbn,
            createdAt: new Date().toLocaleDateString(),
            ...(initialBook ? { modifiedAt: new Date().toLocaleString() } : {modifiedAt: "--"}),
            active: book.active
        }

        initialBook ? (
            fetch(`http://localhost:3000/posts/${initialBook.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('The post is changed:', data);
                })
                .catch((error) => {
                    console.error('Error editing post:', error);
                })
        ) : (
            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('New post added:', data);
                })
                .catch((error) => {
                    console.error('Error adding post:', error);
                })
        )

        location.state.clear();
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <label className={styles.formLabel}>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        className={styles.formInput}
                        required
                    />
                </label>

                <label className={styles.formLabel}>
                    Author:
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className={styles.formInput}
                        required
                    />
                </label>

                <label className={styles.formLabel}>
                    Category:
                    <select name="category"
                            value={book.category || ''}  // Порожній рядок, якщо значення немає
                            onChange={handleChange}
                            className={styles.formSelect}
                            required>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>

                <label className={styles.formLabel}>
                    ISBN:
                    <input
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        className={styles.formInput}
                        required
                    />
                </label>

                <button type="submit" className={styles.submitButton}>
                    {initialBook ? "Edit a book" : "Add a book"}
                </button>
            </form>
        </div>
    );
}

export default CreateBook;