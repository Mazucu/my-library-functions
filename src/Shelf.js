import React from "react";
import Book from "./Book";
// You need to import a CSS file only once

function Shelf({ name, books, updateBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title"> {name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  name={book.title}
                  author={book.authors}
                  url={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
                  id={book.id}
                  shelf={book.shelf}
                  updateBook={updateBook}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Shelf;
