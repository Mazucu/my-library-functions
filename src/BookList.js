import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class BookList extends React.Component {
  render() {
    const allBooks = this.props.books;

    const currentlyReading = allBooks.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = allBooks.filter((book) => book.shelf === "wantToRead");
    const read = allBooks.filter((book) => book.shelf === "read");

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
              updateBook={this.props.updateBook}
            />
            <Shelf
              name="Want to Read"
              books={wantToRead}
              updateBook={this.props.updateBook}
            />
            <Shelf
              name="Read"
              books={read}
              updateBook={this.props.updateBook}
            />
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
}

export default BookList;
