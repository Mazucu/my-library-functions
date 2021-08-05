import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class BookSearch extends React.Component {
  state = {
    inputText: "",
  };
  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
    this.props.search(e.target.value);
  };

  isBookInMyLib = (book) => {
    const checkBookName = (obj) => {
      return obj.id === book.id;
    };
    if (this.props.savedBooks.some(checkBookName)) {
      return true;
    }
    return false;
  };
  getShelf = (book) => {
    const bookShelf = this.props.savedBooks.find(
      (savedBook) => savedBook.id === book.id
    ).shelf;
    return bookShelf;
  };

  render() {
    let noResult = false;
    this.props.searchBooks.length === 0
      ? (noResult = true)
      : (noResult = false);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        {this.state.inputText !== "" && (
          <div className="search-books-results">
            <Shelf
              name="Search results"
              books={this.props.searchBooks.map((book) => {
                if (this.isBookInMyLib(book)) {
                  book.shelf = this.getShelf(book);
                } else {
                  book.shelf = "none";
                }
                return book;
              })}
              updateBook={this.props.updateBook}
            />

            {noResult && <h3>No results for this search</h3>}
          </div>
        )}
      </div>
    );
  }
}

export default BookSearch;
