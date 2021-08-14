import React, { useState } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function BookSearch({ searchBooks, savedBooks, search, updateBook }) {
  const [inputText, setInputText] = useState("");
  // if you want to assign a var according to a condition you can do this:
  // const x = (condition === 'something') ? 'a' : 'b'

  const handleChange = (event) => {
    setInputText(event.target.value);
    search(event.target.value);
  };

  const isBookInMyLib = (book) => {
    return savedBooks.some((_book) => _book.id === book.id)
  };

  const getShelf = (book) => {
    const bookShelf = savedBooks.find(
      (savedBook) => savedBook.id === book.id
    ).shelf;
    return bookShelf;
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" />

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleChange}
          />
        </div>
      </div>
      {inputText !== "" && (
        <div className="search-books-results">
          <Shelf
            name="Search results"
            books={searchBooks.map((book) => {
              if (isBookInMyLib(book)) {
                book.shelf = getShelf(book);
              } else {
                book.shelf = "none";
              }
              return book;
            })}
            updateBook={updateBook}
          />

          {!searchBooks.length && <h3>No results for this search</h3>}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
