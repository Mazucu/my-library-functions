import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function BookList({ books, updateBook }) {
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");
  
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            name="Currently Reading"
            books={currentlyReading}
            updateBook={updateBook}
          />
          <Shelf
            name="Want to Read"
            books={wantToRead}
            updateBook={updateBook}
          />
          <Shelf name="Read" books={read} updateBook={updateBook} />
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

export default BookList;
