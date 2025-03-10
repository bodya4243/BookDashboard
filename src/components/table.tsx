import '../styles/BookTable.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    createdAt: string;
    modifiedAt: string;
    active: boolean;
}

const BookTable = () => {

    const [filter, setFilter] = useState('Show All');
    let navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);

    const handleEdit = (isbn: string, book: Book ) => {
        navigate('/create-book', { state: { initialBook: book }});
        alert(`Editing book with ISBN: ${isbn}`);
    };

    const handleDelete = (isbn: string) => {
        const newBooks = books.filter(book => book.isbn !== isbn);
        setBooks(newBooks);
    };

    const itemsPerPage = 5;
    const [visibleBooks, setVisibleBooks] = useState<Book[]>(books.slice(0, itemsPerPage))
    const [page, setPage] = useState(1);

    const handleLoad = () => {
        setVisibleBooks(books.slice(0, page * itemsPerPage));
        setPage(prevState => prevState + 1);
    }

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    const filteredBooks: Book[] = visibleBooks.filter((book) => {
        if (filter === "Show Active") {
            return book.active;
        }

        if (filter === "Show Deactivated") {
            return !book.active
        }

        if (filter === "Show All") {
            return book
        }
    })

    const handleToggleActive = (id: string) => {
        const newBooks = books.map(book =>
            book.id === id ? { ...book, active: !book.active } : book
        );
        setBooks(newBooks);
        setVisibleBooks(newBooks);
    };

    const handleFetch = () => {
        fetch('http://localhost:3000/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(data)
                console.log('posts fetched:', data);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div>
            <div className={'filterContainer'}>
                <select value={filter} onChange={handleFilter}>
                    <option value="Show All">Show All</option>
                    <option value="Show Active">Show Active</option>
                    <option value="Show Deactivated">Show Deactivated</option>
                </select>

                <div>
                    number of books: {books.length}
                </div>
            </div>
            <table>
                <thead>
                <tr className={'header-row'}>
                    <th>Book title</th>
                    <th>Author name</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Created At</th>
                    <th>Modified/Edited At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((book) => (
                    <tr key={book.isbn}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.isbn}</td>
                        <td>{book.createdAt}</td>
                        <td>{book.modifiedAt}</td>
                        <td>
                            <button onClick={() => handleEdit(book.isbn, book)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(book.isbn)}>Delete</button>
                            <button onClick={() => handleToggleActive(book.id)}>
                                {book.active ? 'Deactivate' : 'Re-Activate'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={handleLoad}>
                load books
            </button>
        </div>
    );
}

export default BookTable;